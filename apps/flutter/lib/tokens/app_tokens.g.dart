// GERADO por scripts/build-tokens.mjs a partir de tokens/. Não edite à mão.
// ignore_for_file: public_member_api_docs, lines_longer_than_80_chars
// dart format off

import 'dart:ui' show lerpDouble;

import 'package:flutter/material.dart';

/// Tokens da coleção `borderRadius` do Figma.
@immutable
class AppBorderRadiusTokens extends ThemeExtension<AppBorderRadiusTokens> {
  /// Cria os tokens com valores explícitos; prefira as instâncias de cada mode.
  const AppBorderRadiusTokens({
    required this.semanticCard,
    required this.semanticAction,
    required this.semanticTag,
    required this.componentProductCardSurface,
    required this.componentProductCardTag,
    required this.componentButtonPrimary,
  });

  /// Lê um tema remoto; o que faltar no [json] vem de [fallback].
  ///
  /// As chaves são os nomes do Figma, ex.: `semantic/card`.
  factory AppBorderRadiusTokens.fromJson(Map<String, Object?> json, {AppBorderRadiusTokens fallback = rounded}) {
    return AppBorderRadiusTokens(
      semanticCard: _readDouble(json['semantic/card']) ?? fallback.semanticCard,
      semanticAction: _readDouble(json['semantic/action']) ?? fallback.semanticAction,
      semanticTag: _readDouble(json['semantic/tag']) ?? fallback.semanticTag,
      componentProductCardSurface: _readDouble(json['component/productCard/surface']) ?? fallback.componentProductCardSurface,
      componentProductCardTag: _readDouble(json['component/productCard/tag']) ?? fallback.componentProductCardTag,
      componentButtonPrimary: _readDouble(json['component/button/primary']) ?? fallback.componentButtonPrimary,
    );
  }

  /// Valores do mode `rounded` (padrão).
  static const rounded = AppBorderRadiusTokens(
    semanticCard: 16.0,
    semanticAction: 8.0,
    semanticTag: 4.0,
    componentProductCardSurface: 16.0,
    componentProductCardTag: 4.0,
    componentButtonPrimary: 8.0,
  );

  /// Valores do mode `pill`.
  static const pill = AppBorderRadiusTokens(
    semanticCard: 16.0,
    semanticAction: 999.0,
    semanticTag: 999.0,
    componentProductCardSurface: 16.0,
    componentProductCardTag: 999.0,
    componentButtonPrimary: 999.0,
  );

  /// Valores do mode `sharp`.
  static const sharp = AppBorderRadiusTokens(
    semanticCard: 0.0,
    semanticAction: 0.0,
    semanticTag: 0.0,
    componentProductCardSurface: 0.0,
    componentProductCardTag: 0.0,
    componentButtonPrimary: 0.0,
  );

  /// Instâncias por nome de mode, na ordem do Figma com o padrão primeiro.
  static const modes = <String, AppBorderRadiusTokens>{
    'rounded': rounded,
    'pill': pill,
    'sharp': sharp,
  };

  /// `semantic/card`.
  final double semanticCard;

  /// `semantic/action`.
  final double semanticAction;

  /// `semantic/tag`.
  final double semanticTag;

  /// `component/productCard/surface`.
  final double componentProductCardSurface;

  /// `component/productCard/tag`.
  final double componentProductCardTag;

  /// `component/button/primary`.
  final double componentButtonPrimary;

  @override
  AppBorderRadiusTokens copyWith({
    double? semanticCard,
    double? semanticAction,
    double? semanticTag,
    double? componentProductCardSurface,
    double? componentProductCardTag,
    double? componentButtonPrimary,
  }) {
    return AppBorderRadiusTokens(
      semanticCard: semanticCard ?? this.semanticCard,
      semanticAction: semanticAction ?? this.semanticAction,
      semanticTag: semanticTag ?? this.semanticTag,
      componentProductCardSurface: componentProductCardSurface ?? this.componentProductCardSurface,
      componentProductCardTag: componentProductCardTag ?? this.componentProductCardTag,
      componentButtonPrimary: componentButtonPrimary ?? this.componentButtonPrimary,
    );
  }

  @override
  AppBorderRadiusTokens lerp(covariant AppBorderRadiusTokens? other, double t) {
    if (other == null) return this;
    return AppBorderRadiusTokens(
      semanticCard: lerpDouble(semanticCard, other.semanticCard, t) ?? semanticCard,
      semanticAction: lerpDouble(semanticAction, other.semanticAction, t) ?? semanticAction,
      semanticTag: lerpDouble(semanticTag, other.semanticTag, t) ?? semanticTag,
      componentProductCardSurface: lerpDouble(componentProductCardSurface, other.componentProductCardSurface, t) ?? componentProductCardSurface,
      componentProductCardTag: lerpDouble(componentProductCardTag, other.componentProductCardTag, t) ?? componentProductCardTag,
      componentButtonPrimary: lerpDouble(componentButtonPrimary, other.componentButtonPrimary, t) ?? componentButtonPrimary,
    );
  }
}

/// Tokens da coleção `color` do Figma.
@immutable
class AppColorTokens extends ThemeExtension<AppColorTokens> {
  /// Cria os tokens com valores explícitos; prefira as instâncias de cada mode.
  const AppColorTokens({
    required this.semanticSurfaceBackground,
    required this.semanticSurfaceDefault,
    required this.semanticContentPrimary,
    required this.semanticContentSecondary,
    required this.semanticBorderSubtle,
    required this.semanticActionPrimary,
    required this.semanticActionOnPrimary,
    required this.semanticHighlightBackground,
    required this.semanticHighlightContent,
    required this.componentProductCardSurface,
    required this.componentProductCardBorder,
    required this.componentProductCardTitle,
    required this.componentProductCardPrice,
    required this.componentProductCardOldPrice,
    required this.componentProductCardTagBackground,
    required this.componentProductCardTagContent,
    required this.componentButtonPrimaryBackground,
    required this.componentButtonPrimaryContent,
  });

  /// Lê um tema remoto; o que faltar no [json] vem de [fallback].
  ///
  /// As chaves são os nomes do Figma, ex.: `semantic/surface/background`.
  factory AppColorTokens.fromJson(Map<String, Object?> json, {AppColorTokens fallback = light}) {
    return AppColorTokens(
      semanticSurfaceBackground: _readColor(json['semantic/surface/background']) ?? fallback.semanticSurfaceBackground,
      semanticSurfaceDefault: _readColor(json['semantic/surface/default']) ?? fallback.semanticSurfaceDefault,
      semanticContentPrimary: _readColor(json['semantic/content/primary']) ?? fallback.semanticContentPrimary,
      semanticContentSecondary: _readColor(json['semantic/content/secondary']) ?? fallback.semanticContentSecondary,
      semanticBorderSubtle: _readColor(json['semantic/border/subtle']) ?? fallback.semanticBorderSubtle,
      semanticActionPrimary: _readColor(json['semantic/action/primary']) ?? fallback.semanticActionPrimary,
      semanticActionOnPrimary: _readColor(json['semantic/action/onPrimary']) ?? fallback.semanticActionOnPrimary,
      semanticHighlightBackground: _readColor(json['semantic/highlight/background']) ?? fallback.semanticHighlightBackground,
      semanticHighlightContent: _readColor(json['semantic/highlight/content']) ?? fallback.semanticHighlightContent,
      componentProductCardSurface: _readColor(json['component/productCard/surface']) ?? fallback.componentProductCardSurface,
      componentProductCardBorder: _readColor(json['component/productCard/border']) ?? fallback.componentProductCardBorder,
      componentProductCardTitle: _readColor(json['component/productCard/title']) ?? fallback.componentProductCardTitle,
      componentProductCardPrice: _readColor(json['component/productCard/price']) ?? fallback.componentProductCardPrice,
      componentProductCardOldPrice: _readColor(json['component/productCard/oldPrice']) ?? fallback.componentProductCardOldPrice,
      componentProductCardTagBackground: _readColor(json['component/productCard/tag/background']) ?? fallback.componentProductCardTagBackground,
      componentProductCardTagContent: _readColor(json['component/productCard/tag/content']) ?? fallback.componentProductCardTagContent,
      componentButtonPrimaryBackground: _readColor(json['component/button/primary/background']) ?? fallback.componentButtonPrimaryBackground,
      componentButtonPrimaryContent: _readColor(json['component/button/primary/content']) ?? fallback.componentButtonPrimaryContent,
    );
  }

  /// Valores do mode `light` (padrão).
  static const light = AppColorTokens(
    semanticSurfaceBackground: Color(0xFFF7F7F8),
    semanticSurfaceDefault: Color(0xFFFFFFFF),
    semanticContentPrimary: Color(0xFF1C1D22),
    semanticContentSecondary: Color(0xFF7C7E88),
    semanticBorderSubtle: Color(0xFFEDEDF0),
    semanticActionPrimary: Color(0xFF8B5A2B),
    semanticActionOnPrimary: Color(0xFFFFFFFF),
    semanticHighlightBackground: Color(0xFFFDE7DD),
    semanticHighlightContent: Color(0xFFD9481C),
    componentProductCardSurface: Color(0xFFFFFFFF),
    componentProductCardBorder: Color(0xFFEDEDF0),
    componentProductCardTitle: Color(0xFF1C1D22),
    componentProductCardPrice: Color(0xFF8B5A2B),
    componentProductCardOldPrice: Color(0xFF7C7E88),
    componentProductCardTagBackground: Color(0xFFFDE7DD),
    componentProductCardTagContent: Color(0xFFD9481C),
    componentButtonPrimaryBackground: Color(0xFF8B5A2B),
    componentButtonPrimaryContent: Color(0xFFFFFFFF),
  );

  /// Valores do mode `dark`.
  static const dark = AppColorTokens(
    semanticSurfaceBackground: Color(0xFF111214),
    semanticSurfaceDefault: Color(0xFF1C1D22),
    semanticContentPrimary: Color(0xFFFFFFFF),
    semanticContentSecondary: Color(0xFFC5C6CC),
    semanticBorderSubtle: Color(0xFF3F414A),
    semanticActionPrimary: Color(0xFFD2A679),
    semanticActionOnPrimary: Color(0xFF111214),
    semanticHighlightBackground: Color(0xFFD9481C),
    semanticHighlightContent: Color(0xFFFFFFFF),
    componentProductCardSurface: Color(0xFF1C1D22),
    componentProductCardBorder: Color(0xFF3F414A),
    componentProductCardTitle: Color(0xFFFFFFFF),
    componentProductCardPrice: Color(0xFFD2A679),
    componentProductCardOldPrice: Color(0xFFC5C6CC),
    componentProductCardTagBackground: Color(0xFFD9481C),
    componentProductCardTagContent: Color(0xFFFFFFFF),
    componentButtonPrimaryBackground: Color(0xFFD2A679),
    componentButtonPrimaryContent: Color(0xFF111214),
  );

  /// Instâncias por nome de mode, na ordem do Figma com o padrão primeiro.
  static const modes = <String, AppColorTokens>{
    'light': light,
    'dark': dark,
  };

  /// `semantic/surface/background`.
  final Color semanticSurfaceBackground;

  /// `semantic/surface/default`.
  final Color semanticSurfaceDefault;

  /// `semantic/content/primary`.
  final Color semanticContentPrimary;

  /// `semantic/content/secondary`.
  final Color semanticContentSecondary;

  /// `semantic/border/subtle`.
  final Color semanticBorderSubtle;

  /// `semantic/action/primary`.
  final Color semanticActionPrimary;

  /// `semantic/action/onPrimary`.
  final Color semanticActionOnPrimary;

  /// `semantic/highlight/background`.
  final Color semanticHighlightBackground;

  /// `semantic/highlight/content`.
  final Color semanticHighlightContent;

  /// `component/productCard/surface`.
  final Color componentProductCardSurface;

  /// `component/productCard/border`.
  final Color componentProductCardBorder;

  /// `component/productCard/title`.
  final Color componentProductCardTitle;

  /// `component/productCard/price`.
  final Color componentProductCardPrice;

  /// `component/productCard/oldPrice`.
  final Color componentProductCardOldPrice;

  /// `component/productCard/tag/background`.
  final Color componentProductCardTagBackground;

  /// `component/productCard/tag/content`.
  final Color componentProductCardTagContent;

  /// `component/button/primary/background`.
  final Color componentButtonPrimaryBackground;

  /// `component/button/primary/content`.
  final Color componentButtonPrimaryContent;

  @override
  AppColorTokens copyWith({
    Color? semanticSurfaceBackground,
    Color? semanticSurfaceDefault,
    Color? semanticContentPrimary,
    Color? semanticContentSecondary,
    Color? semanticBorderSubtle,
    Color? semanticActionPrimary,
    Color? semanticActionOnPrimary,
    Color? semanticHighlightBackground,
    Color? semanticHighlightContent,
    Color? componentProductCardSurface,
    Color? componentProductCardBorder,
    Color? componentProductCardTitle,
    Color? componentProductCardPrice,
    Color? componentProductCardOldPrice,
    Color? componentProductCardTagBackground,
    Color? componentProductCardTagContent,
    Color? componentButtonPrimaryBackground,
    Color? componentButtonPrimaryContent,
  }) {
    return AppColorTokens(
      semanticSurfaceBackground: semanticSurfaceBackground ?? this.semanticSurfaceBackground,
      semanticSurfaceDefault: semanticSurfaceDefault ?? this.semanticSurfaceDefault,
      semanticContentPrimary: semanticContentPrimary ?? this.semanticContentPrimary,
      semanticContentSecondary: semanticContentSecondary ?? this.semanticContentSecondary,
      semanticBorderSubtle: semanticBorderSubtle ?? this.semanticBorderSubtle,
      semanticActionPrimary: semanticActionPrimary ?? this.semanticActionPrimary,
      semanticActionOnPrimary: semanticActionOnPrimary ?? this.semanticActionOnPrimary,
      semanticHighlightBackground: semanticHighlightBackground ?? this.semanticHighlightBackground,
      semanticHighlightContent: semanticHighlightContent ?? this.semanticHighlightContent,
      componentProductCardSurface: componentProductCardSurface ?? this.componentProductCardSurface,
      componentProductCardBorder: componentProductCardBorder ?? this.componentProductCardBorder,
      componentProductCardTitle: componentProductCardTitle ?? this.componentProductCardTitle,
      componentProductCardPrice: componentProductCardPrice ?? this.componentProductCardPrice,
      componentProductCardOldPrice: componentProductCardOldPrice ?? this.componentProductCardOldPrice,
      componentProductCardTagBackground: componentProductCardTagBackground ?? this.componentProductCardTagBackground,
      componentProductCardTagContent: componentProductCardTagContent ?? this.componentProductCardTagContent,
      componentButtonPrimaryBackground: componentButtonPrimaryBackground ?? this.componentButtonPrimaryBackground,
      componentButtonPrimaryContent: componentButtonPrimaryContent ?? this.componentButtonPrimaryContent,
    );
  }

  @override
  AppColorTokens lerp(covariant AppColorTokens? other, double t) {
    if (other == null) return this;
    return AppColorTokens(
      semanticSurfaceBackground: Color.lerp(semanticSurfaceBackground, other.semanticSurfaceBackground, t) ?? semanticSurfaceBackground,
      semanticSurfaceDefault: Color.lerp(semanticSurfaceDefault, other.semanticSurfaceDefault, t) ?? semanticSurfaceDefault,
      semanticContentPrimary: Color.lerp(semanticContentPrimary, other.semanticContentPrimary, t) ?? semanticContentPrimary,
      semanticContentSecondary: Color.lerp(semanticContentSecondary, other.semanticContentSecondary, t) ?? semanticContentSecondary,
      semanticBorderSubtle: Color.lerp(semanticBorderSubtle, other.semanticBorderSubtle, t) ?? semanticBorderSubtle,
      semanticActionPrimary: Color.lerp(semanticActionPrimary, other.semanticActionPrimary, t) ?? semanticActionPrimary,
      semanticActionOnPrimary: Color.lerp(semanticActionOnPrimary, other.semanticActionOnPrimary, t) ?? semanticActionOnPrimary,
      semanticHighlightBackground: Color.lerp(semanticHighlightBackground, other.semanticHighlightBackground, t) ?? semanticHighlightBackground,
      semanticHighlightContent: Color.lerp(semanticHighlightContent, other.semanticHighlightContent, t) ?? semanticHighlightContent,
      componentProductCardSurface: Color.lerp(componentProductCardSurface, other.componentProductCardSurface, t) ?? componentProductCardSurface,
      componentProductCardBorder: Color.lerp(componentProductCardBorder, other.componentProductCardBorder, t) ?? componentProductCardBorder,
      componentProductCardTitle: Color.lerp(componentProductCardTitle, other.componentProductCardTitle, t) ?? componentProductCardTitle,
      componentProductCardPrice: Color.lerp(componentProductCardPrice, other.componentProductCardPrice, t) ?? componentProductCardPrice,
      componentProductCardOldPrice: Color.lerp(componentProductCardOldPrice, other.componentProductCardOldPrice, t) ?? componentProductCardOldPrice,
      componentProductCardTagBackground: Color.lerp(componentProductCardTagBackground, other.componentProductCardTagBackground, t) ?? componentProductCardTagBackground,
      componentProductCardTagContent: Color.lerp(componentProductCardTagContent, other.componentProductCardTagContent, t) ?? componentProductCardTagContent,
      componentButtonPrimaryBackground: Color.lerp(componentButtonPrimaryBackground, other.componentButtonPrimaryBackground, t) ?? componentButtonPrimaryBackground,
      componentButtonPrimaryContent: Color.lerp(componentButtonPrimaryContent, other.componentButtonPrimaryContent, t) ?? componentButtonPrimaryContent,
    );
  }
}

/// Tokens da coleção `dimension` do Figma.
@immutable
class AppDimensionTokens extends ThemeExtension<AppDimensionTokens> {
  /// Cria os tokens com valores explícitos; prefira as instâncias de cada mode.
  const AppDimensionTokens({
    required this.baseSpacing1x,
    required this.baseSpacing2x,
    required this.baseSpacing3x,
    required this.baseSpacing4x,
    required this.baseSpacing6x,
    required this.semanticSpacingInset,
    required this.semanticSpacingGap,
    required this.componentProductCardPadding,
    required this.componentProductCardGap,
    required this.componentProductCardImageHeight,
    required this.componentButtonHeight,
  });

  /// Lê um tema remoto; o que faltar no [json] vem de [fallback].
  ///
  /// As chaves são os nomes do Figma, ex.: `base/spacing/1x`.
  factory AppDimensionTokens.fromJson(Map<String, Object?> json, {AppDimensionTokens fallback = comfortable}) {
    return AppDimensionTokens(
      baseSpacing1x: _readDouble(json['base/spacing/1x']) ?? fallback.baseSpacing1x,
      baseSpacing2x: _readDouble(json['base/spacing/2x']) ?? fallback.baseSpacing2x,
      baseSpacing3x: _readDouble(json['base/spacing/3x']) ?? fallback.baseSpacing3x,
      baseSpacing4x: _readDouble(json['base/spacing/4x']) ?? fallback.baseSpacing4x,
      baseSpacing6x: _readDouble(json['base/spacing/6x']) ?? fallback.baseSpacing6x,
      semanticSpacingInset: _readDouble(json['semantic/spacing/inset']) ?? fallback.semanticSpacingInset,
      semanticSpacingGap: _readDouble(json['semantic/spacing/gap']) ?? fallback.semanticSpacingGap,
      componentProductCardPadding: _readDouble(json['component/productCard/padding']) ?? fallback.componentProductCardPadding,
      componentProductCardGap: _readDouble(json['component/productCard/gap']) ?? fallback.componentProductCardGap,
      componentProductCardImageHeight: _readDouble(json['component/productCard/imageHeight']) ?? fallback.componentProductCardImageHeight,
      componentButtonHeight: _readDouble(json['component/button/height']) ?? fallback.componentButtonHeight,
    );
  }

  /// Valores do mode `comfortable` (padrão).
  static const comfortable = AppDimensionTokens(
    baseSpacing1x: 4.0,
    baseSpacing2x: 8.0,
    baseSpacing3x: 12.0,
    baseSpacing4x: 16.0,
    baseSpacing6x: 24.0,
    semanticSpacingInset: 16.0,
    semanticSpacingGap: 12.0,
    componentProductCardPadding: 16.0,
    componentProductCardGap: 12.0,
    componentProductCardImageHeight: 140.0,
    componentButtonHeight: 52.0,
  );

  /// Valores do mode `compact`.
  static const compact = AppDimensionTokens(
    baseSpacing1x: 4.0,
    baseSpacing2x: 8.0,
    baseSpacing3x: 12.0,
    baseSpacing4x: 16.0,
    baseSpacing6x: 24.0,
    semanticSpacingInset: 8.0,
    semanticSpacingGap: 4.0,
    componentProductCardPadding: 8.0,
    componentProductCardGap: 4.0,
    componentProductCardImageHeight: 96.0,
    componentButtonHeight: 40.0,
  );

  /// Instâncias por nome de mode, na ordem do Figma com o padrão primeiro.
  static const modes = <String, AppDimensionTokens>{
    'comfortable': comfortable,
    'compact': compact,
  };

  /// `base/spacing/1x`.
  final double baseSpacing1x;

  /// `base/spacing/2x`.
  final double baseSpacing2x;

  /// `base/spacing/3x`.
  final double baseSpacing3x;

  /// `base/spacing/4x`.
  final double baseSpacing4x;

  /// `base/spacing/6x`.
  final double baseSpacing6x;

  /// `semantic/spacing/inset`.
  final double semanticSpacingInset;

  /// `semantic/spacing/gap`.
  final double semanticSpacingGap;

  /// `component/productCard/padding`.
  final double componentProductCardPadding;

  /// `component/productCard/gap`.
  final double componentProductCardGap;

  /// `component/productCard/imageHeight`.
  final double componentProductCardImageHeight;

  /// `component/button/height`.
  final double componentButtonHeight;

  @override
  AppDimensionTokens copyWith({
    double? baseSpacing1x,
    double? baseSpacing2x,
    double? baseSpacing3x,
    double? baseSpacing4x,
    double? baseSpacing6x,
    double? semanticSpacingInset,
    double? semanticSpacingGap,
    double? componentProductCardPadding,
    double? componentProductCardGap,
    double? componentProductCardImageHeight,
    double? componentButtonHeight,
  }) {
    return AppDimensionTokens(
      baseSpacing1x: baseSpacing1x ?? this.baseSpacing1x,
      baseSpacing2x: baseSpacing2x ?? this.baseSpacing2x,
      baseSpacing3x: baseSpacing3x ?? this.baseSpacing3x,
      baseSpacing4x: baseSpacing4x ?? this.baseSpacing4x,
      baseSpacing6x: baseSpacing6x ?? this.baseSpacing6x,
      semanticSpacingInset: semanticSpacingInset ?? this.semanticSpacingInset,
      semanticSpacingGap: semanticSpacingGap ?? this.semanticSpacingGap,
      componentProductCardPadding: componentProductCardPadding ?? this.componentProductCardPadding,
      componentProductCardGap: componentProductCardGap ?? this.componentProductCardGap,
      componentProductCardImageHeight: componentProductCardImageHeight ?? this.componentProductCardImageHeight,
      componentButtonHeight: componentButtonHeight ?? this.componentButtonHeight,
    );
  }

  @override
  AppDimensionTokens lerp(covariant AppDimensionTokens? other, double t) {
    if (other == null) return this;
    return AppDimensionTokens(
      baseSpacing1x: lerpDouble(baseSpacing1x, other.baseSpacing1x, t) ?? baseSpacing1x,
      baseSpacing2x: lerpDouble(baseSpacing2x, other.baseSpacing2x, t) ?? baseSpacing2x,
      baseSpacing3x: lerpDouble(baseSpacing3x, other.baseSpacing3x, t) ?? baseSpacing3x,
      baseSpacing4x: lerpDouble(baseSpacing4x, other.baseSpacing4x, t) ?? baseSpacing4x,
      baseSpacing6x: lerpDouble(baseSpacing6x, other.baseSpacing6x, t) ?? baseSpacing6x,
      semanticSpacingInset: lerpDouble(semanticSpacingInset, other.semanticSpacingInset, t) ?? semanticSpacingInset,
      semanticSpacingGap: lerpDouble(semanticSpacingGap, other.semanticSpacingGap, t) ?? semanticSpacingGap,
      componentProductCardPadding: lerpDouble(componentProductCardPadding, other.componentProductCardPadding, t) ?? componentProductCardPadding,
      componentProductCardGap: lerpDouble(componentProductCardGap, other.componentProductCardGap, t) ?? componentProductCardGap,
      componentProductCardImageHeight: lerpDouble(componentProductCardImageHeight, other.componentProductCardImageHeight, t) ?? componentProductCardImageHeight,
      componentButtonHeight: lerpDouble(componentButtonHeight, other.componentButtonHeight, t) ?? componentButtonHeight,
    );
  }
}

/// Tokens da coleção `typography` do Figma.
@immutable
class AppTypographyTokens extends ThemeExtension<AppTypographyTokens> {
  /// Cria os tokens com valores explícitos; prefira as instâncias de cada mode.
  const AppTypographyTokens({
    required this.headingMedium,
    required this.bodyRegular,
    required this.bodyStrong,
    required this.priceLarge,
    required this.priceOld,
    required this.captionStrong,
    required this.buttonLabel,
  });

  /// Lê um tema remoto; o que faltar no [json] vem de [fallback].
  ///
  /// As chaves são os nomes do Figma, ex.: `heading/medium`.
  factory AppTypographyTokens.fromJson(Map<String, Object?> json, {AppTypographyTokens fallback = defaultMode}) {
    return AppTypographyTokens(
      headingMedium: _readTextStyle(json['heading/medium']) ?? fallback.headingMedium,
      bodyRegular: _readTextStyle(json['body/regular']) ?? fallback.bodyRegular,
      bodyStrong: _readTextStyle(json['body/strong']) ?? fallback.bodyStrong,
      priceLarge: _readTextStyle(json['price/large']) ?? fallback.priceLarge,
      priceOld: _readTextStyle(json['price/old']) ?? fallback.priceOld,
      captionStrong: _readTextStyle(json['caption/strong']) ?? fallback.captionStrong,
      buttonLabel: _readTextStyle(json['button/label']) ?? fallback.buttonLabel,
    );
  }

  /// Valores do mode `default` (padrão).
  static const defaultMode = AppTypographyTokens(
    headingMedium: TextStyle(fontFamily: 'Inter', fontSize: 20.0, fontWeight: FontWeight.w700, height: 26 / 20, letterSpacing: 0.0),
    bodyRegular: TextStyle(fontFamily: 'Inter', fontSize: 14.0, fontWeight: FontWeight.w400, height: 20 / 14, letterSpacing: 0.0),
    bodyStrong: TextStyle(fontFamily: 'Inter', fontSize: 14.0, fontWeight: FontWeight.w600, height: 20 / 14, letterSpacing: 0.0),
    priceLarge: TextStyle(fontFamily: 'Inter', fontSize: 18.0, fontWeight: FontWeight.w700, height: 22 / 18, letterSpacing: 0.0),
    priceOld: TextStyle(fontFamily: 'Inter', fontSize: 12.0, fontWeight: FontWeight.w400, height: 16 / 12, letterSpacing: 0.0),
    captionStrong: TextStyle(fontFamily: 'Inter', fontSize: 11.0, fontWeight: FontWeight.w600, height: 14 / 11, letterSpacing: 0.4),
    buttonLabel: TextStyle(fontFamily: 'Inter', fontSize: 15.0, fontWeight: FontWeight.w600, height: 20 / 15, letterSpacing: 0.2),
  );

  /// Instâncias por nome de mode, na ordem do Figma com o padrão primeiro.
  static const modes = <String, AppTypographyTokens>{
    'default': defaultMode,
  };

  /// `heading/medium`.
  final TextStyle headingMedium;

  /// `body/regular`.
  final TextStyle bodyRegular;

  /// `body/strong`.
  final TextStyle bodyStrong;

  /// `price/large`.
  final TextStyle priceLarge;

  /// `price/old`.
  final TextStyle priceOld;

  /// `caption/strong`.
  final TextStyle captionStrong;

  /// `button/label`.
  final TextStyle buttonLabel;

  @override
  AppTypographyTokens copyWith({
    TextStyle? headingMedium,
    TextStyle? bodyRegular,
    TextStyle? bodyStrong,
    TextStyle? priceLarge,
    TextStyle? priceOld,
    TextStyle? captionStrong,
    TextStyle? buttonLabel,
  }) {
    return AppTypographyTokens(
      headingMedium: headingMedium ?? this.headingMedium,
      bodyRegular: bodyRegular ?? this.bodyRegular,
      bodyStrong: bodyStrong ?? this.bodyStrong,
      priceLarge: priceLarge ?? this.priceLarge,
      priceOld: priceOld ?? this.priceOld,
      captionStrong: captionStrong ?? this.captionStrong,
      buttonLabel: buttonLabel ?? this.buttonLabel,
    );
  }

  @override
  AppTypographyTokens lerp(covariant AppTypographyTokens? other, double t) {
    if (other == null) return this;
    return AppTypographyTokens(
      headingMedium: TextStyle.lerp(headingMedium, other.headingMedium, t) ?? headingMedium,
      bodyRegular: TextStyle.lerp(bodyRegular, other.bodyRegular, t) ?? bodyRegular,
      bodyStrong: TextStyle.lerp(bodyStrong, other.bodyStrong, t) ?? bodyStrong,
      priceLarge: TextStyle.lerp(priceLarge, other.priceLarge, t) ?? priceLarge,
      priceOld: TextStyle.lerp(priceOld, other.priceOld, t) ?? priceOld,
      captionStrong: TextStyle.lerp(captionStrong, other.captionStrong, t) ?? captionStrong,
      buttonLabel: TextStyle.lerp(buttonLabel, other.buttonLabel, t) ?? buttonLabel,
    );
  }
}

/// Monta a lista para `ThemeData(extensions: ...)` com o mode de cada coleção.
List<ThemeExtension<dynamic>> appTokenExtensions({
  AppBorderRadiusTokens borderRadius = AppBorderRadiusTokens.rounded,
  AppColorTokens color = AppColorTokens.light,
  AppDimensionTokens dimension = AppDimensionTokens.comfortable,
  AppTypographyTokens typography = AppTypographyTokens.defaultMode,
}) {
  return [borderRadius, color, dimension, typography];
}

/// Acesso aos tokens a partir do `BuildContext`: `context.colorTokens`.
extension AppTokensContext on BuildContext {
  /// Tokens de `borderRadius` do tema ativo.
  AppBorderRadiusTokens get borderRadiusTokens => Theme.of(this).extension<AppBorderRadiusTokens>() ?? AppBorderRadiusTokens.rounded;

  /// Tokens de `color` do tema ativo.
  AppColorTokens get colorTokens => Theme.of(this).extension<AppColorTokens>() ?? AppColorTokens.light;

  /// Tokens de `dimension` do tema ativo.
  AppDimensionTokens get dimensionTokens => Theme.of(this).extension<AppDimensionTokens>() ?? AppDimensionTokens.comfortable;

  /// Tokens de `typography` do tema ativo.
  AppTypographyTokens get typographyTokens => Theme.of(this).extension<AppTypographyTokens>() ?? AppTypographyTokens.defaultMode;
}

Color? _readColor(Object? value) {
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
}
