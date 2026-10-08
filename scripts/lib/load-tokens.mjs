// Lê o export nativo do Figma (DTCG, um arquivo por mode) e devolve as
// coleções num formato que o Style Dictionary consegue resolver.
//
// O export do Figma tem duas particularidades que impedem jogar os arquivos
// direto no Style Dictionary:
//   1. Cada coleção usa nomes "soltos" (`semantic.surface.default`), e duas
//      coleções podem ter o mesmo nome — `component/productCard/surface` existe
//      em `color` e em `borderRadius`. Aqui todo token ganha o nome da coleção
//      como prefixo (`color.semantic.surface.default`).
//   2. Alias entre coleções vem na extensão `com.figma.aliasData`, não na
//      sintaxe `{grupo.token}`. Aqui ele vira uma referência DTCG comum.

import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';

const ALIAS_PATTERN = /^\{([^}]+)\}$/;

/** Um nó DTCG é token quando tem `$value`; o resto é grupo. */
export function isToken(node) {
  return node !== null && typeof node === 'object' && '$value' in node;
}

/** Visita cada token da árvore, entregando o caminho (`['semantic','surface']`). */
export function forEachToken(tree, visit, currentPath = []) {
  for (const [key, child] of Object.entries(tree)) {
    if (key.startsWith('$')) continue;
    if (isToken(child)) {
      visit(child, [...currentPath, key]);
    } else if (child && typeof child === 'object') {
      forEachToken(child, visit, [...currentPath, key]);
    }
  }
}

/**
 * Converte a cor do Figma (`{colorSpace, components, alpha, hex}`) em hex.
 *
 * Com alfa diferente de 1, sai `#RRGGBBAA` — mesmo padrão do Figma e do CSS.
 */
export function figmaColorToHex(value) {
  if (typeof value === 'string') return value.toUpperCase();
  if (!value || typeof value !== 'object') {
    throw new Error(`Cor em formato desconhecido: ${JSON.stringify(value)}`);
  }

  const toHexByte = (channel) => Math.round(channel * 255).toString(16).padStart(2, '0');
  const rgb = value.hex
    ? value.hex.replace('#', '').slice(0, 6)
    : value.components.map(toHexByte).join('');
  const alpha = value.alpha ?? 1;
  const alphaSuffix = alpha < 1 ? toHexByte(alpha) : '';

  return `#${rgb}${alphaSuffix}`.toUpperCase();
}

/**
 * Reescreve um valor de token para o espaço de nomes com prefixo de coleção.
 *
 * [pathsByCollection] diz quais caminhos existem em cada coleção, para achar o
 * destino de um alias `{a.b}` que o Figma exporta sem dizer a coleção.
 */
export function normalizeToken(token, { collection, pathsByCollection }) {
  const aliasData = token.$extensions?.['com.figma.aliasData'];
  const normalized = { $type: token.$type };
  if (token.$description) normalized.$description = token.$description;

  if (aliasData?.targetVariableName && aliasData?.targetVariableSetName) {
    const targetPath = aliasData.targetVariableName.split('/').join('.');
    normalized.$value = `{${aliasData.targetVariableSetName}.${targetPath}}`;
    return normalized;
  }

  const aliasMatch = typeof token.$value === 'string' ? token.$value.match(ALIAS_PATTERN) : null;
  if (aliasMatch) {
    normalized.$value = `{${resolveAliasCollection(aliasMatch[1], collection, pathsByCollection)}.${aliasMatch[1]}}`;
    return normalized;
  }

  normalized.$value = token.$type === 'color' ? figmaColorToHex(token.$value) : token.$value;
  return normalized;
}

/** Descobre em que coleção mora o destino de um alias sem coleção explícita. */
function resolveAliasCollection(targetPath, ownCollection, pathsByCollection) {
  if (pathsByCollection.get(ownCollection)?.has(targetPath)) return ownCollection;

  const candidates = [...pathsByCollection.entries()]
    .filter(([, paths]) => paths.has(targetPath))
    .map(([name]) => name);

  if (candidates.length === 1) return candidates[0];
  if (candidates.length === 0) {
    throw new Error(`Alias {${targetPath}} em "${ownCollection}" não aponta para nenhum token.`);
  }
  throw new Error(`Alias {${targetPath}} em "${ownCollection}" é ambíguo: existe em ${candidates.join(', ')}.`);
}

/** Mapeia a árvore inteira, normalizando cada token. */
function normalizeTree(tree, context) {
  const result = {};
  forEachToken(tree, (token, tokenPath) => {
    let node = result;
    for (const segment of tokenPath.slice(0, -1)) node = node[segment] ??= {};
    node[tokenPath.at(-1)] = normalizeToken(token, context);
  });
  return result;
}

/**
 * Carrega todas as coleções.
 *
 * - `tokens/figma/<coleção>/<mode>.json`: export do Figma, um arquivo por mode.
 * - `tokens/manual/<coleção>.json`: tokens escritos à mão (ex.: tipografia),
 *   coleção de um mode só, com referências já qualificadas pela coleção.
 *
 * Devolve `Map<coleção, { modes: Map<mode, árvore>, defaultMode }>`.
 */
export async function loadCollections({ figmaDirectory, manualDirectory, defaultModes = {} }) {
  const rawCollections = new Map();

  for (const collection of await listDirectories(figmaDirectory)) {
    const modes = new Map();
    for (const file of await listJsonFiles(path.join(figmaDirectory, collection))) {
      modes.set(path.basename(file, '.json'), await readJson(file));
    }
    rawCollections.set(collection, modes);
  }

  const pathsByCollection = new Map(
    [...rawCollections].map(([name, modes]) => [name, collectTokenPaths(modes)]),
  );

  const collections = new Map();
  for (const [name, modes] of rawCollections) {
    const normalizedModes = new Map(
      [...modes].map(([mode, tree]) => [mode, normalizeTree(tree, { collection: name, pathsByCollection })]),
    );
    collections.set(name, { modes: normalizedModes, defaultMode: pickDefaultMode(name, normalizedModes, defaultModes) });
  }

  for (const file of await listJsonFiles(manualDirectory)) {
    const name = path.basename(file, '.json');
    if (collections.has(name)) throw new Error(`Coleção "${name}" existe no Figma e em tokens/manual.`);
    const { $description, ...tree } = await readJson(file);
    collections.set(name, { modes: new Map([['default', tree]]), defaultMode: 'default' });
  }

  return collections;
}

function collectTokenPaths(modes) {
  const paths = new Set();
  for (const tree of modes.values()) forEachToken(tree, (_, tokenPath) => paths.add(tokenPath.join('.')));
  return paths;
}

function pickDefaultMode(collection, modes, defaultModes) {
  if (modes.size === 1) return [...modes.keys()][0];

  const configured = defaultModes[collection];
  if (!configured) {
    throw new Error(
      `A coleção "${collection}" tem os modes ${[...modes.keys()].join(', ')}. ` +
        'Diga qual é o padrão em tokens.config.json → defaultModes.',
    );
  }
  if (!modes.has(configured)) {
    throw new Error(`Mode padrão "${configured}" não existe na coleção "${collection}".`);
  }
  return configured;
}

async function listDirectories(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  return entries.filter((entry) => entry.isDirectory()).map((entry) => entry.name).sort();
}

async function listJsonFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true }).catch(() => []);
  return entries
    .filter((entry) => entry.isFile() && entry.name.endsWith('.json'))
    .map((entry) => path.join(directory, entry.name))
    .sort();
}

async function readJson(file) {
  return JSON.parse(await readFile(file, 'utf8'));
}
