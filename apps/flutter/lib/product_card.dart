import 'package:flutter/material.dart';

import 'tokens/app_tokens.g.dart';

/// Card de produto lendo só campos tipados gerados a partir do Figma.
///
/// Compare com o MVP em runtime: lá era `color('component/productCard/surface')`
/// (string, erro só ao rodar); aqui é `colors.componentProductCardSurface`
/// (autocomplete e erro de compilação se o token sumir do Figma).
class ProductCard extends StatelessWidget {
  /// Cria o card.
  const ProductCard({
    super.key,
    required this.name,
    required this.price,
    required this.icon,
    this.oldPrice,
    this.tag,
  });

  /// Nome do produto.
  final String name;

  /// Preço atual formatado.
  final String price;

  /// Preço anterior, riscado.
  final String? oldPrice;

  /// Selo promocional.
  final String? tag;

  /// Ícone no lugar da foto.
  final IconData icon;

  @override
  Widget build(BuildContext context) {
    final colors = context.colorTokens;
    final radius = context.borderRadiusTokens;
    final dimension = context.dimensionTokens;
    const typography = AppTypographyTokens.defaultMode;
    final oldPrice = this.oldPrice;
    final tag = this.tag;

    return Container(
      padding: EdgeInsets.all(dimension.componentProductCardPadding),
      decoration: BoxDecoration(
        color: colors.componentProductCardSurface,
        border: Border.all(color: colors.componentProductCardBorder),
        borderRadius: BorderRadius.circular(radius.componentProductCardSurface),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        spacing: dimension.componentProductCardGap,
        children: [
          SizedBox(
            height: dimension.componentProductCardImageHeight,
            width: double.infinity,
            child: Stack(
              children: [
                Positioned.fill(
                  child: DecoratedBox(
                    decoration: BoxDecoration(
                      color: colors.semanticSurfaceBackground,
                      borderRadius: BorderRadius.circular(radius.componentProductCardSurface),
                    ),
                    child: Icon(icon, size: 40, color: colors.semanticContentSecondary),
                  ),
                ),
                if (tag != null) Positioned(top: 0, left: 0, child: _Tag(label: tag)),
              ],
            ),
          ),
          Text(name, style: typography.bodyStrong.copyWith(color: colors.componentProductCardTitle)),
          Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              if (oldPrice != null)
                Text(
                  oldPrice,
                  style: typography.priceOld.copyWith(
                    color: colors.componentProductCardOldPrice,
                    decoration: TextDecoration.lineThrough,
                  ),
                ),
              Text(price, style: typography.priceLarge.copyWith(color: colors.componentProductCardPrice)),
            ],
          ),
          const _PrimaryButton(label: 'Adicionar'),
        ],
      ),
    );
  }
}

class _Tag extends StatelessWidget {
  const _Tag({required this.label});

  final String label;

  @override
  Widget build(BuildContext context) {
    final colors = context.colorTokens;
    final dimension = context.dimensionTokens;

    return Container(
      padding: EdgeInsets.symmetric(horizontal: dimension.baseSpacing2x, vertical: dimension.baseSpacing1x),
      decoration: BoxDecoration(
        color: colors.componentProductCardTagBackground,
        borderRadius: BorderRadius.circular(context.borderRadiusTokens.componentProductCardTag),
      ),
      child: Text(
        label,
        style: AppTypographyTokens.defaultMode.captionStrong.copyWith(color: colors.componentProductCardTagContent),
      ),
    );
  }
}

class _PrimaryButton extends StatelessWidget {
  const _PrimaryButton({required this.label});

  final String label;

  @override
  Widget build(BuildContext context) {
    final colors = context.colorTokens;
    final borderRadius = BorderRadius.circular(context.borderRadiusTokens.componentButtonPrimary);

    return SizedBox(
      width: double.infinity,
      height: context.dimensionTokens.componentButtonHeight,
      child: Material(
        color: colors.componentButtonPrimaryBackground,
        borderRadius: borderRadius,
        child: InkWell(
          borderRadius: borderRadius,
          onTap: () {},
          child: Center(
            child: Text(
              label,
              style: AppTypographyTokens.defaultMode.buttonLabel.copyWith(color: colors.componentButtonPrimaryContent),
            ),
          ),
        ),
      ),
    );
  }
}
