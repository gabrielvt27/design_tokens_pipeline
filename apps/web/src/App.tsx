import { useState } from 'react';

import { ProductCard } from './ProductCard';
import {
  applyRemoteTokens,
  applyTokenMode,
  clearRemoteTokens,
  tokenModes,
  tokens,
  type TokenCollection,
  type TokenMode,
} from './tokens/tokens';

/** Payload que um backend poderia devolver no futuro — mesmo do app Flutter. */
const remoteColorPayload = {
  'semantic/action/primary': '#6C4CF5',
  'component/productCard/price': '#6C4CF5',
  'component/button/primary/background': '#6C4CF5',
  'component/productCard/tag/background': '#ECE7FE',
  'component/productCard/tag/content': '#6C4CF5',
};

const collectionLabels: Record<TokenCollection, string> = {
  color: 'Cor',
  borderRadius: 'Raio',
  dimension: 'Densidade',
};

/** Vitrine: card de produto, troca de modes e simulação de tema remoto. */
export default function App() {
  const [isRemoteThemeActive, setRemoteThemeActive] = useState(false);

  function handleModeChange<C extends TokenCollection>(collection: C, mode: TokenMode<C>) {
    clearRemoteTokens();
    setRemoteThemeActive(false);
    applyTokenMode(collection, mode);
  }

  function handleRemoteTheme() {
    applyRemoteTokens('color', remoteColorPayload);
    setRemoteThemeActive(true);
  }

  return (
    <main style={{ maxWidth: 720, margin: '0 auto', padding: tokens.dimension.base.spacing['4x'] }}>
      <h1 style={{ ...tokens.typography.heading.medium, margin: 0 }}>Vitrine</h1>

      <section
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          alignItems: 'start',
          gap: tokens.dimension.component.productCard.gap,
          marginBlock: tokens.dimension.base.spacing['3x'],
        }}
      >
        <ProductCard name="Café especial 250 g" price="R$ 39,90" oldPrice="R$ 49,90" tag="-20%" icon="☕" />
        <ProductCard name="Cesta de orgânicos" price="R$ 89,00" icon="🌿" />
      </section>

      {(Object.keys(tokenModes) as TokenCollection[]).map((collection) => (
        <ModeSelector
          key={collection}
          collection={collection}
          onChange={(mode) => handleModeChange(collection, mode)}
        />
      ))}

      <h2 style={{ ...tokens.typography.body.strong, marginTop: tokens.dimension.base.spacing['6x'] }}>
        Futuro: tema remoto
      </h2>
      <button
        type="button"
        onClick={handleRemoteTheme}
        style={{
          ...tokens.typography.body.regular,
          padding: `${tokens.dimension.base.spacing['2x']} ${tokens.dimension.base.spacing['4x']}`,
          border: `1px solid ${tokens.color.semantic.action.primary}`,
          borderRadius: tokens.borderRadius.semantic.action,
          background: 'transparent',
          color: tokens.color.semantic.action.primary,
          cursor: 'pointer',
        }}
      >
        {isRemoteThemeActive ? 'Tema remoto aplicado' : 'Aplicar JSON remoto'}
      </button>
    </main>
  );
}

function ModeSelector<C extends TokenCollection>({
  collection,
  onChange,
}: {
  collection: C;
  onChange: (mode: TokenMode<C>) => void;
}) {
  const modes = tokenModes[collection] as readonly TokenMode<C>[];
  const [selected, setSelected] = useState<TokenMode<C>>(
    () => (document.documentElement.dataset[collection] as TokenMode<C> | undefined) ?? modes[0],
  );

  return (
    <fieldset style={{ border: 'none', padding: 0, marginBottom: tokens.dimension.base.spacing['3x'] }}>
      <legend style={{ ...tokens.typography.caption.strong, color: tokens.color.semantic.content.secondary }}>
        {collectionLabels[collection]}
      </legend>
      <div style={{ display: 'flex', gap: tokens.dimension.base.spacing['1x'], marginTop: tokens.dimension.base.spacing['1x'] }}>
        {modes.map((mode) => (
          <button
            key={mode}
            type="button"
            aria-pressed={mode === selected}
            onClick={() => {
              setSelected(mode);
              onChange(mode);
            }}
            style={{
              ...tokens.typography.body.regular,
              padding: `${tokens.dimension.base.spacing['1x']} ${tokens.dimension.base.spacing['3x']}`,
              border: `1px solid ${tokens.color.semantic.border.subtle}`,
              borderRadius: tokens.borderRadius.semantic.action,
              cursor: 'pointer',
              background: mode === selected ? tokens.color.semantic.action.primary : tokens.color.semantic.surface.default,
              color: mode === selected ? tokens.color.semantic.action.onPrimary : tokens.color.semantic.content.primary,
            }}
          >
            {mode}
          </button>
        ))}
      </div>
    </fieldset>
  );
}
