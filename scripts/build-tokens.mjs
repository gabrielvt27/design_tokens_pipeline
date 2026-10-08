// Pipeline de tokens: export do Figma (DTCG) → CSS + TypeScript + Dart.
//
// node scripts/build-tokens.mjs           gera os arquivos
// node scripts/build-tokens.mjs --check   falha se os arquivos gerados estiverem desatualizados (CI)

import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { generateDart, generateRemoteJson } from './lib/generate-dart.mjs';
import { generateCss, generateTypeScript } from './lib/generate-web.mjs';
import { loadCollections } from './lib/load-tokens.mjs';
import { resolveCollections } from './lib/resolve-tokens.mjs';

const rootDirectory = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const isCheck = process.argv.includes('--check');

const config = JSON.parse(await readFile(path.join(rootDirectory, 'tokens/tokens.config.json'), 'utf8'));

const collections = await loadCollections({
  figmaDirectory: path.join(rootDirectory, 'tokens/figma'),
  manualDirectory: path.join(rootDirectory, 'tokens/manual'),
  defaultModes: config.defaultModes,
});
const resolved = await resolveCollections(collections, { hiddenCollections: config.hiddenCollections });

const outputs = new Map([
  [
    config.outputs.css,
    generateCss(resolved, {
      unitlessPatterns: config.unitlessTokenPatterns,
      fontFamilyFallback: config.fontFamilyFallback,
    }),
  ],
  [config.outputs.typescript, generateTypeScript(resolved, { unitlessPatterns: config.unitlessTokenPatterns })],
  [config.outputs.dart, generateDart(resolved)],
]);
for (const [fileName, content] of generateRemoteJson(resolved)) {
  outputs.set(path.join(config.outputs.remoteJsonDirectory, fileName), content);
}

const outdated = [];
for (const [relativePath, content] of outputs) {
  const absolutePath = path.join(rootDirectory, relativePath);
  if (isCheck) {
    const current = await readFile(absolutePath, 'utf8').catch(() => null);
    if (current !== content) outdated.push(relativePath);
    continue;
  }
  await mkdir(path.dirname(absolutePath), { recursive: true });
  await writeFile(absolutePath, content);
  console.log(`✓ ${relativePath}`);
}

if (isCheck && outdated.length > 0) {
  // O remoto fica em build/ (fora do git); só os arquivos versionados contam no CI.
  const versioned = outdated.filter((file) => !file.startsWith(config.outputs.remoteJsonDirectory));
  if (versioned.length > 0) {
    console.error(`✗ Tokens desatualizados — rode "npm run tokens":\n  ${versioned.join('\n  ')}`);
    process.exit(1);
  }
}
if (isCheck) console.log('✓ Arquivos gerados estão em dia com tokens/.');
