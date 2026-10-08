import type { CSSProperties } from 'react';

import { tokens } from './tokens/tokens';

const { color, borderRadius, dimension, typography } = tokens;

/** Props do card de produto. */
interface ProductCardProps {
  name: string;
  price: string;
  icon: string;
  oldPrice?: string;
  tag?: string;
}

/**
 * Card de produto lendo só nomes tipados gerados a partir do Figma.
 *
 * `color.component.productCard.surface` autocompleta no editor e quebra o
 * build se o token sumir do Figma. O valor é `var(--...)`: dark mode e tema
 * remoto mudam só o CSS, sem nenhum re-render do React.
 */
export function ProductCard({ name, price, icon, oldPrice, tag }: ProductCardProps) {
  return (
    <article style={styles.card}>
      <div style={styles.image}>
        <span aria-hidden style={styles.icon}>
          {icon}
        </span>
        {tag && <span style={styles.tag}>{tag}</span>}
      </div>
      <h3 style={styles.title}>{name}</h3>
      <div>
        {oldPrice && <s style={styles.oldPrice}>{oldPrice}</s>}
        <p style={styles.price}>{price}</p>
      </div>
      <button type="button" style={styles.button}>
        Adicionar
      </button>
    </article>
  );
}

const resetText: CSSProperties = { margin: 0 };

const styles = {
  card: {
    display: 'flex',
    flexDirection: 'column',
    gap: dimension.component.productCard.gap,
    padding: dimension.component.productCard.padding,
    background: color.component.productCard.surface,
    border: `1px solid ${color.component.productCard.border}`,
    borderRadius: borderRadius.component.productCard.surface,
  },
  image: {
    position: 'relative',
    display: 'grid',
    placeItems: 'center',
    height: dimension.component.productCard.imageHeight,
    background: color.semantic.surface.background,
    borderRadius: borderRadius.component.productCard.surface,
  },
  icon: { fontSize: 40 },
  tag: {
    ...typography.caption.strong,
    position: 'absolute',
    top: 0,
    left: 0,
    padding: `${dimension.base.spacing['1x']} ${dimension.base.spacing['2x']}`,
    background: color.component.productCard.tag.background,
    color: color.component.productCard.tag.content,
    borderRadius: borderRadius.component.productCard.tag,
  },
  title: { ...resetText, ...typography.body.strong, color: color.component.productCard.title },
  oldPrice: { ...typography.price.old, display: 'block', color: color.component.productCard.oldPrice },
  price: { ...resetText, ...typography.price.large, color: color.component.productCard.price },
  button: {
    ...typography.button.label,
    height: dimension.component.button.height,
    border: 'none',
    cursor: 'pointer',
    background: color.component.button.primary.background,
    color: color.component.button.primary.content,
    borderRadius: borderRadius.component.button.primary,
  },
} satisfies Record<string, CSSProperties>;
