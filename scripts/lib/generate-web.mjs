// Gera o CSS (valores por mode) e o TypeScript (nomes tipados) da web.
//
// A web não precisa de nenhum carregador em runtime: as variáveis CSS já
// trocam de valor ao mudar o atributo `data-<coleção>` do <html>.

import { camelCase, cssVariableName, kebabCase } from './naming.mjs';

const HEADER = 'GERADO por scripts/build-tokens.mjs a partir de tokens/. Não edite à mão.';
const TYPOGRAPHY_PROPERTIES = ['fontFamily', 'fontSize', 'fontWeight', 'lineHeight', 'letterSpacing'];

/** Valor CSS de um token simples: número vira px, salvo os que casam com [unitlessPatterns]. */
function cssValue(token, unitlessPatterns, fontFamilyFallback = '') {
  if (token.type === 'number' || typeof token.value === 'number') {
    const isUnitless = unitlessPatterns.some((pattern) => token.name.includes(pattern));
    return isUnitless || token.value === 0 ? `${token.value}` : `${token.value}px`;
  }
  if (token.type === 'fontFamily') return fontFamilyStack(token.value, fontFamilyFallback);
  return `${token.value}`;
}

/** Família com alternativas: se a fonte não carregar, cai numa sem serifa do sistema. */
function fontFamilyStack(family, fallback) {
  return fallback ? `'${family}', ${fallback}` : `'${family}'`;
}

function typographyDeclarations(collection, token, fontFamilyFallback) {
  const { fontFamily, fontSize, fontWeight, lineHeight, letterSpacing } = token.value;
  const base = cssVariableName(collection, token.path);
  return [
    [`${base}-font-family`, fontFamilyStack(fontFamily, fontFamilyFallback)],
    [`${base}-font-size`, `${fontSize}px`],
    [`${base}-font-weight`, `${fontWeight}`],
    [`${base}-line-height`, `${lineHeight}px`],
    [`${base}-letter-spacing`, `${letterSpacing}px`],
  ];
}

function declarationsOf(collection, tokens, { unitlessPatterns, fontFamilyFallback }) {
  return tokens.flatMap((token) =>
    token.type === 'typography'
      ? typographyDeclarations(collection, token, fontFamilyFallback)
      : [[cssVariableName(collection, token.path), cssValue(token, unitlessPatterns, fontFamilyFallback)]],
  );
}

function cssBlock(selector, declarations) {
  const lines = declarations.map(([name, value]) => `  ${name}: ${value};`);
  return `${selector} {\n${lines.join('\n')}\n}`;
}

/**
 * CSS com o mode padrão de cada coleção em `:root` e os outros modes em
 * `[data-<coleção>="<mode>"]` — ex.: `<html data-color="dark">`.
 */
export function generateCss(resolved, { unitlessPatterns = [], fontFamilyFallback = '' } = {}) {
  const options = { unitlessPatterns, fontFamilyFallback };
  const rootDeclarations = [];
  const modeBlocks = [];

  for (const [collection, { defaultMode, modes }] of resolved) {
    rootDeclarations.push(...declarationsOf(collection, modes.get(defaultMode), options));
    for (const [mode, tokens] of modes) {
      if (mode === defaultMode) continue;
      const selector = `[data-${kebabCase([collection])}="${mode}"]`;
      modeBlocks.push(cssBlock(selector, declarationsOf(collection, tokens, options)));
    }
  }

  return [`/* ${HEADER} */`, cssBlock(':root', rootDeclarations), ...modeBlocks].join('\n\n') + '\n';
}

function setNested(target, segments, value) {
  let node = target;
  for (const segment of segments.slice(0, -1)) node = node[segment] ??= {};
  node[segments.at(-1)] = value;
}

/**
 * TypeScript com o nome de cada token apontando para a variável CSS.
 *
 * `tokens.color.component.productCard.surface` vale
 * `'var(--color-component-product-card-surface)'`: o editor autocompleta, um
 * nome errado não compila, e o valor real continua vindo do CSS do mode ativo.
 */
export function generateTypeScript(resolved, { unitlessPatterns = [] } = {}) {
  const tree = {};
  const modesByCollection = {};
  const remoteVariables = {};

  for (const [collection, { defaultMode, modes }] of resolved) {
    const collectionKey = camelCase([collection]);
    if (modes.size > 1) {
      modesByCollection[collectionKey] = [defaultMode, ...[...modes.keys()].filter((mode) => mode !== defaultMode)];
    }

    remoteVariables[collectionKey] = {};
    for (const token of modes.get(defaultMode)) {
      const variable = cssVariableName(collection, token.path);
      if (token.type !== 'typography') {
        const unit = cssValue({ ...token, value: 1 }, unitlessPatterns).replace('1', '');
        remoteVariables[collectionKey][token.name] = [variable, unit];
      }
      const value =
        token.type === 'typography'
          ? Object.fromEntries(
              TYPOGRAPHY_PROPERTIES.map((property) => [property, `var(${variable}-${kebabCase([property])})`]),
            )
          : `var(${variable})`;
      setNested(tree, [collectionKey, ...token.path], value);
    }
  }

  return `// ${HEADER}

/** Tokens do design system; cada valor é uma referência \`var(--...)\` para o CSS. */
export const tokens = ${JSON.stringify(tree, null, 2)} as const;

/** Modes disponíveis por coleção que tem mais de um; o primeiro é o padrão. */
export const tokenModes = ${JSON.stringify(modesByCollection, null, 2)} as const;

/** Coleção que tem modes. */
export type TokenCollection = keyof typeof tokenModes;

/** Modes válidos de uma coleção. */
export type TokenMode<C extends TokenCollection> = (typeof tokenModes)[C][number];

/**
 * Ativa um mode trocando \`data-<coleção>\` no elemento (o <html>, por padrão).
 *
 * Só o CSS muda: nenhum componente precisa ser redesenhado pelo React.
 */
export function applyTokenMode<C extends TokenCollection>(
  collection: C,
  mode: TokenMode<C>,
  element: HTMLElement = document.documentElement,
): void {
  element.dataset[collection] = mode;
}

/** Nome do Figma → [variável CSS, unidade], para aplicar um tema remoto. */
const remoteVariables: Record<string, Record<string, readonly [string, string]>> = ${JSON.stringify(remoteVariables, null, 2)};

/**
 * Aplica um JSON remoto (formato de \`build/remote/<coleção>.<mode>.json\`).
 *
 * Sobrescreve só as variáveis que vieram no payload; nomes desconhecidos são
 * ignorados. Devolve quantos tokens foram aplicados.
 */
export function applyRemoteTokens(
  collection: keyof typeof tokens,
  payload: Record<string, unknown>,
  element: HTMLElement = document.documentElement,
): number {
  let applied = 0;
  for (const [name, value] of Object.entries(payload)) {
    const target = remoteVariables[collection]?.[name];
    if (!target || (typeof value !== 'string' && typeof value !== 'number')) continue;
    const [variable, unit] = target;
    element.style.setProperty(variable, typeof value === 'number' ? String(value) + unit : value);
    applied++;
  }
  return applied;
}

/** Remove as sobrescritas remotas e volta para os valores do CSS gerado. */
export function clearRemoteTokens(element: HTMLElement = document.documentElement): void {
  for (const variables of Object.values(remoteVariables)) {
    for (const [variable] of Object.values(variables)) element.style.removeProperty(variable);
  }
}
`;
}
