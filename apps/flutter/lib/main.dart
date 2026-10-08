import 'package:flutter/material.dart';

import 'showcase_page.dart';
import 'tokens/app_tokens.g.dart';

void main() => runApp(const TokensApp());

/// Modes ativos de cada coleção — o equivalente ao `data-<coleção>` da web.
class TokenModes {
  /// Cria a seleção de modes.
  const TokenModes({this.color = 'light', this.borderRadius = 'rounded', this.dimension = 'comfortable'});

  /// Mode da coleção `color`.
  final String color;

  /// Mode da coleção `borderRadius`.
  final String borderRadius;

  /// Mode da coleção `dimension`.
  final String dimension;

  /// Copia trocando os modes informados.
  TokenModes copyWith({String? color, String? borderRadius, String? dimension}) {
    return TokenModes(
      color: color ?? this.color,
      borderRadius: borderRadius ?? this.borderRadius,
      dimension: dimension ?? this.dimension,
    );
  }
}

/// App de validação: os tokens chegam por `ThemeData.extensions`.
class TokensApp extends StatefulWidget {
  /// Cria o app.
  const TokensApp({super.key});

  @override
  State<TokensApp> createState() => _TokensAppState();
}

class _TokensAppState extends State<TokensApp> {
  TokenModes _modes = const TokenModes();

  /// Sobrescrita vinda de um "tema remoto"; nula usa os valores compilados.
  AppColorTokens? _remoteColors;

  ThemeData _buildTheme() {
    final colors = _remoteColors ?? AppColorTokens.modes[_modes.color] ?? AppColorTokens.light;
    final isDark = _modes.color == 'dark';

    return ThemeData(
      brightness: isDark ? Brightness.dark : Brightness.light,
      colorSchemeSeed: colors.semanticActionPrimary,
      scaffoldBackgroundColor: colors.semanticSurfaceBackground,
      fontFamily: AppTypographyTokens.defaultMode.bodyRegular.fontFamily,
      extensions: appTokenExtensions(
        color: colors,
        borderRadius: AppBorderRadiusTokens.modes[_modes.borderRadius] ?? AppBorderRadiusTokens.rounded,
        dimension: AppDimensionTokens.modes[_modes.dimension] ?? AppDimensionTokens.comfortable,
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Tokens App',
      debugShowCheckedModeBanner: false,
      theme: _buildTheme(),
      home: ShowcasePage(
        modes: _modes,
        isRemoteThemeActive: _remoteColors != null,
        onModesChanged: (modes) => setState(() {
          _modes = modes;
          _remoteColors = null;
        }),
        onRemoteColorsLoaded: (colors) => setState(() => _remoteColors = colors),
      ),
    );
  }
}
