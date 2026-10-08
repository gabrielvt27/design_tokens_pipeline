// Convenções de nome compartilhadas pelos geradores.

/** Quebra um segmento em palavras: `productCard` → `['product', 'card']`. */
function words(segment) {
  return segment
    .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
    .split(/[^a-zA-Z0-9]+/)
    .filter(Boolean)
    .map((word) => word.toLowerCase());
}

/** `['semantic', 'surface', 'default']` → `semantic-surface-default`. */
export function kebabCase(segments) {
  return segments.flatMap(words).join('-');
}

/** `['component', 'productCard', 'tag']` → `componentProductCardTag`. */
export function camelCase(segments) {
  const [first, ...rest] = segments.flatMap(words);
  const camel = first + rest.map((word) => word[0].toUpperCase() + word.slice(1)).join('');
  return /^[0-9]/.test(camel) ? `value${camel[0].toUpperCase()}${camel.slice(1)}` : camel;
}

/** `borderRadius` → `BorderRadius`. */
export function pascalCase(segments) {
  const camel = camelCase(segments);
  return camel[0].toUpperCase() + camel.slice(1);
}

/** Nome da variável CSS de um token: `--color-semantic-surface-default`. */
export function cssVariableName(collection, tokenPath) {
  return `--${kebabCase([collection, ...tokenPath])}`;
}
