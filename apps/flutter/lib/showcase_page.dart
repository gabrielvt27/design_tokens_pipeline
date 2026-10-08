import 'package:flutter/material.dart';

import 'main.dart';
import 'product_card.dart';
import 'tokens/app_tokens.g.dart';

/// Payload que um backend poderia devolver no futuro — só as cores que mudam.
///
/// O formato é o mesmo de `build/remote/color.<mode>.json`, gerado pelo pipeline.
const _remoteColorPayload = <String, Object?>{
  'semantic/action/primary': '#6C4CF5',
  'component/productCard/price': '#6C4CF5',
  'component/button/primary/background': '#6C4CF5',
  'component/productCard/tag/background': '#ECE7FE',
  'component/productCard/tag/content': '#6C4CF5',
};

/// Vitrine: card de produto, troca de modes e simulação de tema remoto.
class ShowcasePage extends StatelessWidget {
  /// Cria a vitrine.
  const ShowcasePage({
    super.key,
    required this.modes,
    required this.isRemoteThemeActive,
    required this.onModesChanged,
    required this.onRemoteColorsLoaded,
  });

  /// Modes ativos.
  final TokenModes modes;

  /// Indica se as cores vieram do "tema remoto".
  final bool isRemoteThemeActive;

  /// Chamado ao trocar algum mode.
  final ValueChanged<TokenModes> onModesChanged;

  /// Chamado com as cores lidas do payload remoto.
  final ValueChanged<AppColorTokens> onRemoteColorsLoaded;

  @override
  Widget build(BuildContext context) {
    final dimension = context.dimensionTokens;
    final colors = context.colorTokens;
    const typography = AppTypographyTokens.defaultMode;

    return Scaffold(
      body: SafeArea(
        child: ListView(
          padding: EdgeInsets.all(dimension.baseSpacing4x),
          children: [
            Text('Vitrine', style: typography.headingMedium.copyWith(color: colors.semanticContentPrimary)),
            SizedBox(height: dimension.baseSpacing3x),
            Row(
              crossAxisAlignment: CrossAxisAlignment.start,
              spacing: dimension.componentProductCardGap,
              children: const [
                Expanded(
                  child: ProductCard(
                    name: 'Café especial 250 g',
                    price: r'R$ 39,90',
                    oldPrice: r'R$ 49,90',
                    tag: '-20%',
                    icon: Icons.coffee,
                  ),
                ),
                Expanded(child: ProductCard(name: 'Cesta de orgânicos', price: r'R$ 89,00', icon: Icons.eco)),
              ],
            ),
            SizedBox(height: dimension.baseSpacing6x),
            _ModeSelector(
              label: 'Cor',
              modes: AppColorTokens.modes.keys,
              selected: modes.color,
              onSelected: (mode) => onModesChanged(modes.copyWith(color: mode)),
            ),
            _ModeSelector(
              label: 'Raio',
              modes: AppBorderRadiusTokens.modes.keys,
              selected: modes.borderRadius,
              onSelected: (mode) => onModesChanged(modes.copyWith(borderRadius: mode)),
            ),
            _ModeSelector(
              label: 'Densidade',
              modes: AppDimensionTokens.modes.keys,
              selected: modes.dimension,
              onSelected: (mode) => onModesChanged(modes.copyWith(dimension: mode)),
            ),
            SizedBox(height: dimension.baseSpacing3x),
            Text(
              'Futuro: tema remoto',
              style: typography.bodyStrong.copyWith(color: colors.semanticContentPrimary),
            ),
            SizedBox(height: dimension.baseSpacing2x),
            Align(
              alignment: Alignment.centerLeft,
              child: OutlinedButton(
                key: const Key('remote-theme'),
                onPressed: () {
                  final current = AppColorTokens.modes[modes.color] ?? AppColorTokens.light;
                  onRemoteColorsLoaded(AppColorTokens.fromJson(_remoteColorPayload, fallback: current));
                },
                child: Text(isRemoteThemeActive ? 'Tema remoto aplicado' : 'Aplicar JSON remoto'),
              ),
            ),
          ],
        ),
      ),
    );
  }
}

class _ModeSelector extends StatelessWidget {
  const _ModeSelector({required this.label, required this.modes, required this.selected, required this.onSelected});

  final String label;
  final Iterable<String> modes;
  final String selected;
  final ValueChanged<String> onSelected;

  @override
  Widget build(BuildContext context) {
    final dimension = context.dimensionTokens;

    return Padding(
      padding: EdgeInsets.only(bottom: dimension.baseSpacing3x),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        spacing: dimension.baseSpacing1x,
        children: [
          Text(
            label,
            style: AppTypographyTokens.defaultMode.captionStrong.copyWith(
              color: context.colorTokens.semanticContentSecondary,
            ),
          ),
          SegmentedButton<String>(
            showSelectedIcon: false,
            segments: [for (final mode in modes) ButtonSegment(value: mode, label: Text(mode))],
            selected: {selected},
            onSelectionChanged: (selection) => onSelected(selection.first),
          ),
        ],
      ),
    );
  }
}
