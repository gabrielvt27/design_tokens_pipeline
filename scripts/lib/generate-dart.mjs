// Gera um ThemeExtension do Flutter por coleção.
//
// Hoje os valores são `const`, compilados no app. Cada classe também ganha
// um `fromJson`: se um dia o visual precisar mudar sem publicar na loja, basta
// baixar o JSON de `build/remote/` e colocar o resultado em `ThemeData.extensions`
// — as telas não mudam, porque continuam lendo os mesmos campos tipados.

import { camelCase, pascalCase } from './naming.mjs';

const DART_RESERVED_WORDS = new Set(['default', 'new', 'class', 'const', 'final', 'is', 'in', 'switch', 'case', 'null']);

const DART_TYPES = {
  color: {
    type: 'Color',
    literal: (value) => `Color(0x${argbHex(value)})`,
    reader: '_readColor',
    lerp: (field) => `Color.lerp(${field}, other.${field}, t) ?? ${field}`,
  },
  number: {
    type: 'double',
    literal: (value) => formatDouble(value),
    reader: '_readDouble',
    lerp: (field) => `lerpDouble(${field}, other.${field}, t) ?? ${field}`,
  },
  fontFamily: {
    type: 'String',
    literal: (value) => `'${value}'`,
    reader: '_readString',
    lerp: (field) => `t < 0.5 ? ${field} : other.${field}`,
  },
  typography: {
    type: 'TextStyle',
    literal: textStyleLiteral,
    reader: '_readTextStyle',
    lerp: (field) => `TextStyle.lerp(${field}, other.${field}, t) ?? ${field}`,
  },
};

/** `#RRGGBB` ou `#RRGGBBAA` → `AARRGGBB`, a ordem que o `Color` do Flutter espera. */
function argbHex(hex) {
  const digits = hex.replace('#', '').toUpperCase();
  return digits.length === 8 ? digits.slice(6) + digits.slice(0, 6) : `FF${digits}`;
}

function formatDouble(value) {
  return Number.isInteger(value) ? `${value}.0` : `${value}`;
}

function textStyleLiteral({ fontFamily, fontSize, fontWeight, lineHeight, letterSpacing }) {
  const weight = Math.min(900, Math.max(100, Math.round(fontWeight / 100) * 100));
  return [
    'TextStyle(',
    `fontFamily: '${fontFamily}', `,
    `fontSize: ${formatDouble(fontSize)}, `,
    `fontWeight: FontWeight.w${weight}, `,
    // Line height do Figma é em pixels; o Flutter espera a proporção.
    `height: ${lineHeight} / ${fontSize}, `,
    `letterSpacing: ${formatDouble(letterSpacing)}`,
    ')',
  ].join('');
}

function dartTypeOf(token, collection) {
  const dartType = DART_TYPES[token.type];
  if (!dartType) throw new Error(`Tipo "${token.type}" do token ${collection}/${token.name} não tem conversão para Dart.`);
  return dartType;
}

function modeIdentifier(mode) {
  const identifier = camelCase([mode]);
  return DART_RESERVED_WORDS.has(identifier) ? `${identifier}Mode` : identifier;
}

function generateCollectionClass(collection, { defaultMode, modes }) {
  const className = `App${pascalCase([collection])}Tokens`;
  const defaultTokens = modes.get(defaultMode);
  const orderedModes = [defaultMode, ...[...modes.keys()].filter((mode) => mode !== defaultMode)];
  const fields = defaultTokens.map((token) => ({
    token,
    name: camelCase(token.path),
    dart: dartTypeOf(token, collection),
  }));

  const instance = (mode) => {
    const tokensByName = new Map(modes.get(mode).map((token) => [token.name, token]));
    const argumentsList = fields.map(
      ({ token, name, dart }) => `    ${name}: ${dart.literal(tokensByName.get(token.name).value)},`,
    );
    return `  /// Valores do mode \`${mode}\`${mode === defaultMode ? ' (padrão)' : ''}.
  static const ${modeIdentifier(mode)} = ${className}(\n${argumentsList.join('\n')}\n  );`;
  };

  return `/// Tokens da coleção \`${collection}\` do Figma.
@immutable
class ${className} extends ThemeExtension<${className}> {
  /// Cria os tokens com valores explícitos; prefira as instâncias de cada mode.
  const ${className}({
${fields.map(({ name }) => `    required this.${name},`).join('\n')}
  });

  /// Lê um tema remoto; o que faltar no [json] vem de [fallback].
  ///
  /// As chaves são os nomes do Figma, ex.: \`${fields[0].token.name}\`.
  factory ${className}.fromJson(Map<String, Object?> json, {${className} fallback = ${modeIdentifier(defaultMode)}}) {
    return ${className}(
${fields.map(({ token, name, dart }) => `      ${name}: ${dart.reader}(json['${token.name}']) ?? fallback.${name},`).join('\n')}
    );
  }

${orderedModes.map(instance).join('\n\n')}

  /// Instâncias por nome de mode, na ordem do Figma com o padrão primeiro.
  static const modes = <String, ${className}>{
${orderedModes.map((mode) => `    '${mode}': ${modeIdentifier(mode)},`).join('\n')}
  };

${fields.map(({ token, name, dart }) => `  /// \`${token.name}\`.\n  final ${dart.type} ${name};`).join('\n\n')}

  @override
  ${className} copyWith({
${fields.map(({ name, dart }) => `    ${dart.type}? ${name},`).join('\n')}
  }) {
    return ${className}(
${fields.map(({ name }) => `      ${name}: ${name} ?? this.${name},`).join('\n')}
    );
  }

  @override
  ${className} lerp(covariant ${className}? other, double t) {
    if (other == null) return this;
    return ${className}(
${fields.map(({ name, dart }) => `      ${name}: ${dart.lerp(name)},`).join('\n')}
    );
  }
}`;
}

const JSON_READERS = `Color? _readColor(Object? value) {
  if (value is! String) return null;
  final digits = value.replaceAll('#', '');
  final parsed = int.tryParse(digits, radix: 16);
  if (parsed == null) return null;
  return switch (digits.length) {
    6 => Color(0xFF000000 | parsed),
    8 => Color(((parsed & 0xFF) << 24) | (parsed >> 8)),
    _ => null,
  };
}

double? _readDouble(Object? value) => value is num ? value.toDouble() : null;

String? _readString(Object? value) => value is String ? value : null;

TextStyle? _readTextStyle(Object? value) {
  if (value is! Map) return null;
  final fontSize = _readDouble(value['fontSize']);
  final lineHeight = _readDouble(value['lineHeight']);
  final fontWeight = _readDouble(value['fontWeight']);
  return TextStyle(
    fontFamily: _readString(value['fontFamily']),
    fontSize: fontSize,
    fontWeight: fontWeight == null ? null : FontWeight.values[((fontWeight / 100).round() - 1).clamp(0, 8)],
    height: (fontSize != null && lineHeight != null) ? lineHeight / fontSize : null,
    letterSpacing: _readDouble(value['letterSpacing']),
  );
}`;

/** Arquivo Dart único com todas as coleções visíveis. */
export function generateDart(resolved) {
  const collections = [...resolved];
  const classNames = collections.map(([collection]) => `App${pascalCase([collection])}Tokens`);
  const getterNames = collections.map(([collection]) => `${camelCase([collection])}Tokens`);

  const contextGetters = collections.map(([collection, { defaultMode }], index) => {
    const className = classNames[index];
    return `  /// Tokens de \`${collection}\` do tema ativo.
  ${className} get ${getterNames[index]} => Theme.of(this).extension<${className}>() ?? ${className}.${modeIdentifier(defaultMode)};`;
  });

  const extensionParameters = collections.map(
    ([, { defaultMode }], index) =>
      `  ${classNames[index]} ${camelCase([collections[index][0]])} = ${classNames[index]}.${modeIdentifier(defaultMode)},`,
  );

  return `// GERADO por scripts/build-tokens.mjs a partir de tokens/. Não edite à mão.
// ignore_for_file: public_member_api_docs, lines_longer_than_80_chars
// dart format off

import 'dart:ui' show lerpDouble;

import 'package:flutter/material.dart';

${collections.map(([collection, data]) => generateCollectionClass(collection, data)).join('\n\n')}

/// Monta a lista para \`ThemeData(extensions: ...)\` com o mode de cada coleção.
List<ThemeExtension<dynamic>> appTokenExtensions({
${extensionParameters.join('\n')}
}) {
  return [${collections.map(([collection]) => camelCase([collection])).join(', ')}];
}

/// Acesso aos tokens a partir do \`BuildContext\`: \`context.colorTokens\`.
extension AppTokensContext on BuildContext {
${contextGetters.join('\n\n')}
}

${JSON_READERS}
`;
}

/** JSON plano por coleção/mode — o formato que \`fromJson\` lê no tema remoto. */
export function generateRemoteJson(resolved) {
  const files = new Map();
  for (const [collection, { modes }] of resolved) {
    for (const [mode, tokens] of modes) {
      const payload = Object.fromEntries(tokens.map((token) => [token.name, token.value]));
      files.set(`${collection}.${mode}.json`, `${JSON.stringify(payload, null, 2)}\n`);
    }
  }
  return files;
}
