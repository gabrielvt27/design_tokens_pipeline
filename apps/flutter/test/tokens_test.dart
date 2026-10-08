import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:tokens_app/main.dart';
import 'package:tokens_app/tokens/app_tokens.g.dart';

void main() {
  group('AppColorTokens gerado', () {
    test('modes light e dark vêm do Figma com os aliases resolvidos', () {
      // Assert
      expect(AppColorTokens.light.semanticSurfaceBackground, const Color(0xFFF7F7F8));
      expect(AppColorTokens.dark.semanticSurfaceBackground, const Color(0xFF111214));
      expect(AppColorTokens.modes.keys, ['light', 'dark']);
    });

    test('fromJson parcial troca só o que veio e mantém o resto do fallback', () {
      // Act
      final colors = AppColorTokens.fromJson({'semantic/action/primary': '#6C4CF5'});

      // Assert
      expect(colors.semanticActionPrimary, const Color(0xFF6C4CF5));
      expect(colors.semanticSurfaceDefault, AppColorTokens.light.semanticSurfaceDefault);
    });

    test('fromJson ignora valor inválido em vez de quebrar', () {
      // Act
      final colors = AppColorTokens.fromJson({'semantic/action/primary': 'azul'}, fallback: AppColorTokens.dark);

      // Assert
      expect(colors.semanticActionPrimary, AppColorTokens.dark.semanticActionPrimary);
    });

    test('lerp interpola as cores para a transição animada do tema', () {
      // Act
      final halfway = AppColorTokens.light.lerp(AppColorTokens.dark, 0.5);

      // Assert
      expect(
        halfway.semanticSurfaceBackground,
        Color.lerp(const Color(0xFFF7F7F8), const Color(0xFF111214), 0.5),
      );
    });
  });

  test('tipografia converte line height em pixels para proporção', () {
    // Arrange
    const style = AppTypographyTokens.defaultMode;

    // Assert
    expect(style.bodyStrong.fontWeight, FontWeight.w600);
    expect(style.bodyStrong.height, 20 / 14);
    expect(style.bodyStrong.fontFamily, 'Inter');
  });

  group('app', () {
    setUp(() {
      final binding = TestWidgetsFlutterBinding.ensureInitialized();
      binding.platformDispatcher.views.first.physicalSize = const Size(1080, 2400);
    });

    testWidgets('trocar para dark muda o fundo via ThemeExtension', (tester) async {
      // Arrange
      await tester.pumpWidget(const TokensApp());
      Color background() => Theme.of(tester.element(find.byType(Scaffold))).scaffoldBackgroundColor;
      expect(background(), AppColorTokens.light.semanticSurfaceBackground);

      // Act
      await tester.tap(find.text('dark'));
      await tester.pumpAndSettle();

      // Assert
      expect(background(), AppColorTokens.dark.semanticSurfaceBackground);
    });

    testWidgets('JSON remoto troca a cor do botão sem recompilar', (tester) async {
      // Arrange
      await tester.pumpWidget(const TokensApp());
      BuildContext cardContext() => tester.element(find.text('Adicionar').first);
      expect(cardContext().colorTokens.componentButtonPrimaryBackground, const Color(0xFF8B5A2B));

      // Act
      await tester.ensureVisible(find.byKey(const Key('remote-theme')));
      await tester.tap(find.byKey(const Key('remote-theme')));
      await tester.pumpAndSettle();

      // Assert
      expect(cardContext().colorTokens.componentButtonPrimaryBackground, const Color(0xFF6C4CF5));
      expect(find.text('Tema remoto aplicado'), findsOneWidget);
    });
  });
}
