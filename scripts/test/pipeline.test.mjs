import assert from 'node:assert/strict';
import { mkdtemp, mkdir, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { describe, test } from 'node:test';

import { generateDart } from '../lib/generate-dart.mjs';
import { generateCss, generateTypeScript } from '../lib/generate-web.mjs';
import { figmaColorToHex, loadCollections, normalizeToken } from '../lib/load-tokens.mjs';
import { camelCase, cssVariableName } from '../lib/naming.mjs';
import { resolveCollections } from '../lib/resolve-tokens.mjs';

const pathsByCollection = new Map([
  ['primitives', new Set(['color.brand.500'])],
  ['color', new Set(['semantic.action', 'component.button'])],
  ['borderRadius', new Set(['component.button'])],
]);

describe('normalizeToken', () => {
  test('alias entre coleções via com.figma.aliasData vira referência com prefixo', () => {
    // Arrange
    const token = {
      $type: 'color',
      $value: { colorSpace: 'srgb', components: [0.5451, 0.3529, 0.1686], alpha: 1, hex: '#8B5A2B' },
      $extensions: { 'com.figma.aliasData': { targetVariableSetName: 'primitives', targetVariableName: 'color/brand/500' } },
    };

    // Act
    const normalized = normalizeToken(token, { collection: 'color', pathsByCollection });

    // Assert
    assert.equal(normalized.$value, '{primitives.color.brand.500}');
  });

  test('alias {a.b} da mesma coleção ganha o prefixo da própria coleção', () => {
    // Act
    const normalized = normalizeToken(
      { $type: 'color', $value: '{semantic.action}' },
      { collection: 'color', pathsByCollection },
    );

    // Assert
    assert.equal(normalized.$value, '{color.semantic.action}');
  });

  test('alias {a.b} sem coleção é procurado nas outras quando não existe na própria', () => {
    // Act
    const normalized = normalizeToken(
      { $type: 'color', $value: '{color.brand.500}' },
      { collection: 'color', pathsByCollection },
    );

    // Assert
    assert.equal(normalized.$value, '{primitives.color.brand.500}');
  });

  test('alias ambíguo entre coleções falha com mensagem clara', () => {
    // Act / Assert
    assert.throws(
      () => normalizeToken({ $type: 'number', $value: '{component.button}' }, { collection: 'dimension', pathsByCollection }),
      /ambíguo: existe em color, borderRadius/,
    );
  });

  test('alias para token inexistente falha', () => {
    // Act / Assert
    assert.throws(
      () => normalizeToken({ $type: 'color', $value: '{nao.existe}' }, { collection: 'color', pathsByCollection }),
      /não aponta para nenhum token/,
    );
  });
});

describe('figmaColorToHex', () => {
  test('usa o hex quando a cor é opaca', () => {
    assert.equal(figmaColorToHex({ components: [1, 1, 1], alpha: 1, hex: '#ffffff' }), '#FFFFFF');
  });

  test('anexa o alfa no fim (#RRGGBBAA) quando há transparência', () => {
    assert.equal(figmaColorToHex({ components: [0, 0, 0], alpha: 0.5 }), '#00000080');
  });
});

describe('nomes', () => {
  test('camelCase e variável CSS', () => {
    assert.equal(camelCase(['component', 'productCard', 'tag', 'background']), 'componentProductCardTagBackground');
    assert.equal(camelCase(['base', 'spacing', '1x']), 'baseSpacing1x');
    assert.equal(cssVariableName('borderRadius', ['component', 'productCard']), '--border-radius-component-product-card');
  });
});

describe('pipeline de ponta a ponta', () => {
  async function fixture() {
    const root = await mkdtemp(path.join(tmpdir(), 'tokens-'));
    const write = async (relativePath, content) => {
      const file = path.join(root, relativePath);
      await mkdir(path.dirname(file), { recursive: true });
      await writeFile(file, JSON.stringify(content));
    };
    await write('figma/primitives/value.json', {
      neutral: { 0: { $type: 'color', $value: '#FFFFFF' }, 900: { $type: 'color', $value: '#1C1D22' } },
    });
    const surface = (target) => ({
      surface: {
        $type: 'color',
        $value: '#000000',
        $extensions: { 'com.figma.aliasData': { targetVariableSetName: 'primitives', targetVariableName: target } },
      },
      card: { $type: 'color', $value: '{surface}' },
    });
    await write('figma/color/light.json', surface('neutral/0'));
    await write('figma/color/dark.json', surface('neutral/900'));
    return root;
  }

  test('resolve cada mode e gera CSS, TS e Dart coerentes', async () => {
    // Arrange
    const root = await fixture();
    const collections = await loadCollections({
      figmaDirectory: path.join(root, 'figma'),
      manualDirectory: path.join(root, 'manual'),
      defaultModes: { color: 'light' },
    });

    // Act
    const resolved = await resolveCollections(collections, { hiddenCollections: ['primitives'] });
    const css = generateCss(resolved);
    const typescript = generateTypeScript(resolved);
    const dart = generateDart(resolved);

    // Assert
    assert.deepEqual([...resolved.keys()], ['color']);
    assert.match(css, /:root \{\n {2}--color-surface: #FFFFFF;\n {2}--color-card: #FFFFFF;/);
    assert.match(css, /\[data-color="dark"\] \{\n {2}--color-surface: #1C1D22;/);
    assert.match(typescript, /"card": "var\(--color-card\)"/);
    assert.match(dart, /static const dark = AppColorTokens\(\n {4}surface: Color\(0xFF1C1D22\),\n {4}card: Color\(0xFF1C1D22\),/);
  });

  test('coleção com vários modes sem padrão configurado falha explicando o que fazer', async () => {
    // Arrange
    const root = await fixture();

    // Act / Assert
    await assert.rejects(
      loadCollections({ figmaDirectory: path.join(root, 'figma'), manualDirectory: path.join(root, 'manual') }),
      /tokens\.config\.json → defaultModes/,
    );
  });
});
