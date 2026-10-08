// Usa o Style Dictionary para resolver os aliases de cada mode.
//
// Cada mode é resolvido num dicionário próprio: a coleção alvo no mode pedido
// e todas as outras no mode padrão. Assim `color.dark` resolve
// `{primitives.color.neutral.900}` sem misturar com os valores do light.

import StyleDictionary from 'style-dictionary';

/**
 * Resolve todos os modes de todas as coleções visíveis.
 *
 * Devolve `Map<coleção, { defaultMode, modes: Map<mode, Token[]> }>`, onde
 * cada Token é `{ name, path, type, value }` — `name` é o nome do Figma
 * (`semantic/surface/default`) e `value` já vem sem nenhum alias.
 */
export async function resolveCollections(collections, { hiddenCollections = [] } = {}) {
  const resolved = new Map();

  for (const [collection, { modes, defaultMode }] of collections) {
    if (hiddenCollections.includes(collection)) continue;

    const resolvedModes = new Map();
    for (const mode of modes.keys()) {
      resolvedModes.set(mode, await resolveMode(collections, collection, mode));
    }
    assertSameTokensInEveryMode(collection, resolvedModes);
    resolved.set(collection, { defaultMode, modes: resolvedModes });
  }

  return resolved;
}

async function resolveMode(collections, targetCollection, targetMode) {
  const tokens = {};
  for (const [collection, { modes, defaultMode }] of collections) {
    tokens[collection] = modes.get(collection === targetCollection ? targetMode : defaultMode);
  }

  const dictionary = new StyleDictionary({
    tokens,
    usesDtcg: true,
    platforms: { resolved: { transforms: [] } },
    log: { verbosity: 'silent', warnings: 'disabled' },
  });
  const { allTokens } = await dictionary.getPlatformTokens('resolved');

  return allTokens
    .filter((token) => token.path[0] === targetCollection)
    .map((token) => ({
      name: token.path.slice(1).join('/'),
      path: token.path.slice(1),
      type: token.$type,
      value: token.$value,
    }));
}

function assertSameTokensInEveryMode(collection, modes) {
  const [firstMode, ...otherModes] = [...modes.keys()];
  const expected = modes.get(firstMode).map((token) => token.name).sort().join('\n');

  for (const mode of otherModes) {
    const actual = modes.get(mode).map((token) => token.name).sort().join('\n');
    if (actual !== expected) {
      throw new Error(`Os modes "${firstMode}" e "${mode}" da coleção "${collection}" têm tokens diferentes.`);
    }
  }
}
