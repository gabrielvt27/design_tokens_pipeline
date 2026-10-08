// GERADO por scripts/build-tokens.mjs a partir de tokens/. Não edite à mão.

/** Tokens do design system; cada valor é uma referência `var(--...)` para o CSS. */
export const tokens = {
  "borderRadius": {
    "semantic": {
      "card": "var(--border-radius-semantic-card)",
      "action": "var(--border-radius-semantic-action)",
      "tag": "var(--border-radius-semantic-tag)"
    },
    "component": {
      "productCard": {
        "surface": "var(--border-radius-component-product-card-surface)",
        "tag": "var(--border-radius-component-product-card-tag)"
      },
      "button": {
        "primary": "var(--border-radius-component-button-primary)"
      }
    }
  },
  "color": {
    "semantic": {
      "surface": {
        "background": "var(--color-semantic-surface-background)",
        "default": "var(--color-semantic-surface-default)"
      },
      "content": {
        "primary": "var(--color-semantic-content-primary)",
        "secondary": "var(--color-semantic-content-secondary)"
      },
      "border": {
        "subtle": "var(--color-semantic-border-subtle)"
      },
      "action": {
        "primary": "var(--color-semantic-action-primary)",
        "onPrimary": "var(--color-semantic-action-on-primary)"
      },
      "highlight": {
        "background": "var(--color-semantic-highlight-background)",
        "content": "var(--color-semantic-highlight-content)"
      }
    },
    "component": {
      "productCard": {
        "surface": "var(--color-component-product-card-surface)",
        "border": "var(--color-component-product-card-border)",
        "title": "var(--color-component-product-card-title)",
        "price": "var(--color-component-product-card-price)",
        "oldPrice": "var(--color-component-product-card-old-price)",
        "tag": {
          "background": "var(--color-component-product-card-tag-background)",
          "content": "var(--color-component-product-card-tag-content)"
        }
      },
      "button": {
        "primary": {
          "background": "var(--color-component-button-primary-background)",
          "content": "var(--color-component-button-primary-content)"
        }
      }
    }
  },
  "dimension": {
    "base": {
      "spacing": {
        "1x": "var(--dimension-base-spacing-1x)",
        "2x": "var(--dimension-base-spacing-2x)",
        "3x": "var(--dimension-base-spacing-3x)",
        "4x": "var(--dimension-base-spacing-4x)",
        "6x": "var(--dimension-base-spacing-6x)"
      }
    },
    "semantic": {
      "spacing": {
        "inset": "var(--dimension-semantic-spacing-inset)",
        "gap": "var(--dimension-semantic-spacing-gap)"
      }
    },
    "component": {
      "productCard": {
        "padding": "var(--dimension-component-product-card-padding)",
        "gap": "var(--dimension-component-product-card-gap)",
        "imageHeight": "var(--dimension-component-product-card-image-height)"
      },
      "button": {
        "height": "var(--dimension-component-button-height)"
      }
    }
  },
  "typography": {
    "heading": {
      "medium": {
        "fontFamily": "var(--typography-heading-medium-font-family)",
        "fontSize": "var(--typography-heading-medium-font-size)",
        "fontWeight": "var(--typography-heading-medium-font-weight)",
        "lineHeight": "var(--typography-heading-medium-line-height)",
        "letterSpacing": "var(--typography-heading-medium-letter-spacing)"
      }
    },
    "body": {
      "regular": {
        "fontFamily": "var(--typography-body-regular-font-family)",
        "fontSize": "var(--typography-body-regular-font-size)",
        "fontWeight": "var(--typography-body-regular-font-weight)",
        "lineHeight": "var(--typography-body-regular-line-height)",
        "letterSpacing": "var(--typography-body-regular-letter-spacing)"
      },
      "strong": {
        "fontFamily": "var(--typography-body-strong-font-family)",
        "fontSize": "var(--typography-body-strong-font-size)",
        "fontWeight": "var(--typography-body-strong-font-weight)",
        "lineHeight": "var(--typography-body-strong-line-height)",
        "letterSpacing": "var(--typography-body-strong-letter-spacing)"
      }
    },
    "price": {
      "large": {
        "fontFamily": "var(--typography-price-large-font-family)",
        "fontSize": "var(--typography-price-large-font-size)",
        "fontWeight": "var(--typography-price-large-font-weight)",
        "lineHeight": "var(--typography-price-large-line-height)",
        "letterSpacing": "var(--typography-price-large-letter-spacing)"
      },
      "old": {
        "fontFamily": "var(--typography-price-old-font-family)",
        "fontSize": "var(--typography-price-old-font-size)",
        "fontWeight": "var(--typography-price-old-font-weight)",
        "lineHeight": "var(--typography-price-old-line-height)",
        "letterSpacing": "var(--typography-price-old-letter-spacing)"
      }
    },
    "caption": {
      "strong": {
        "fontFamily": "var(--typography-caption-strong-font-family)",
        "fontSize": "var(--typography-caption-strong-font-size)",
        "fontWeight": "var(--typography-caption-strong-font-weight)",
        "lineHeight": "var(--typography-caption-strong-line-height)",
        "letterSpacing": "var(--typography-caption-strong-letter-spacing)"
      }
    },
    "button": {
      "label": {
        "fontFamily": "var(--typography-button-label-font-family)",
        "fontSize": "var(--typography-button-label-font-size)",
        "fontWeight": "var(--typography-button-label-font-weight)",
        "lineHeight": "var(--typography-button-label-line-height)",
        "letterSpacing": "var(--typography-button-label-letter-spacing)"
      }
    }
  }
} as const;

/** Modes disponíveis por coleção que tem mais de um; o primeiro é o padrão. */
export const tokenModes = {
  "borderRadius": [
    "rounded",
    "pill",
    "sharp"
  ],
  "color": [
    "light",
    "dark"
  ],
  "dimension": [
    "comfortable",
    "compact"
  ]
} as const;

/** Coleção que tem modes. */
export type TokenCollection = keyof typeof tokenModes;

/** Modes válidos de uma coleção. */
export type TokenMode<C extends TokenCollection> = (typeof tokenModes)[C][number];

/**
 * Ativa um mode trocando `data-<coleção>` no elemento (o <html>, por padrão).
 *
 * Só o CSS muda: nenhum componente precisa ser redesenhado pelo React.
 */
export function applyTokenMode<C extends TokenCollection>(
  collection: C,
  mode: TokenMode<C>,
  element: HTMLElement = document.documentElement,
): void {
  element.dataset[collection] = mode;
}

/** Nome do Figma → [variável CSS, unidade], para aplicar um tema remoto. */
const remoteVariables: Record<string, Record<string, readonly [string, string]>> = {
  "borderRadius": {
    "semantic/card": [
      "--border-radius-semantic-card",
      "px"
    ],
    "semantic/action": [
      "--border-radius-semantic-action",
      "px"
    ],
    "semantic/tag": [
      "--border-radius-semantic-tag",
      "px"
    ],
    "component/productCard/surface": [
      "--border-radius-component-product-card-surface",
      "px"
    ],
    "component/productCard/tag": [
      "--border-radius-component-product-card-tag",
      "px"
    ],
    "component/button/primary": [
      "--border-radius-component-button-primary",
      "px"
    ]
  },
  "color": {
    "semantic/surface/background": [
      "--color-semantic-surface-background",
      "px"
    ],
    "semantic/surface/default": [
      "--color-semantic-surface-default",
      "px"
    ],
    "semantic/content/primary": [
      "--color-semantic-content-primary",
      "px"
    ],
    "semantic/content/secondary": [
      "--color-semantic-content-secondary",
      "px"
    ],
    "semantic/border/subtle": [
      "--color-semantic-border-subtle",
      "px"
    ],
    "semantic/action/primary": [
      "--color-semantic-action-primary",
      "px"
    ],
    "semantic/action/onPrimary": [
      "--color-semantic-action-on-primary",
      "px"
    ],
    "semantic/highlight/background": [
      "--color-semantic-highlight-background",
      "px"
    ],
    "semantic/highlight/content": [
      "--color-semantic-highlight-content",
      "px"
    ],
    "component/productCard/surface": [
      "--color-component-product-card-surface",
      "px"
    ],
    "component/productCard/border": [
      "--color-component-product-card-border",
      "px"
    ],
    "component/productCard/title": [
      "--color-component-product-card-title",
      "px"
    ],
    "component/productCard/price": [
      "--color-component-product-card-price",
      "px"
    ],
    "component/productCard/oldPrice": [
      "--color-component-product-card-old-price",
      "px"
    ],
    "component/productCard/tag/background": [
      "--color-component-product-card-tag-background",
      "px"
    ],
    "component/productCard/tag/content": [
      "--color-component-product-card-tag-content",
      "px"
    ],
    "component/button/primary/background": [
      "--color-component-button-primary-background",
      "px"
    ],
    "component/button/primary/content": [
      "--color-component-button-primary-content",
      "px"
    ]
  },
  "dimension": {
    "base/spacing/1x": [
      "--dimension-base-spacing-1x",
      "px"
    ],
    "base/spacing/2x": [
      "--dimension-base-spacing-2x",
      "px"
    ],
    "base/spacing/3x": [
      "--dimension-base-spacing-3x",
      "px"
    ],
    "base/spacing/4x": [
      "--dimension-base-spacing-4x",
      "px"
    ],
    "base/spacing/6x": [
      "--dimension-base-spacing-6x",
      "px"
    ],
    "semantic/spacing/inset": [
      "--dimension-semantic-spacing-inset",
      "px"
    ],
    "semantic/spacing/gap": [
      "--dimension-semantic-spacing-gap",
      "px"
    ],
    "component/productCard/padding": [
      "--dimension-component-product-card-padding",
      "px"
    ],
    "component/productCard/gap": [
      "--dimension-component-product-card-gap",
      "px"
    ],
    "component/productCard/imageHeight": [
      "--dimension-component-product-card-image-height",
      "px"
    ],
    "component/button/height": [
      "--dimension-component-button-height",
      "px"
    ]
  },
  "typography": {}
};

/**
 * Aplica um JSON remoto (formato de `build/remote/<coleção>.<mode>.json`).
 *
 * Sobrescreve só as variáveis que vieram no payload; nomes desconhecidos são
 * ignorados. Devolve quantos tokens foram aplicados.
 */
export function applyRemoteTokens(
  collection: keyof typeof tokens,
  payload: Record<string, unknown>,
  element: HTMLElement = document.documentElement,
): number {
  let applied = 0;
  for (const [name, value] of Object.entries(payload)) {
    const target = remoteVariables[collection]?.[name];
    if (!target || (typeof value !== 'string' && typeof value !== 'number')) continue;
    const [variable, unit] = target;
    element.style.setProperty(variable, typeof value === 'number' ? String(value) + unit : value);
    applied++;
  }
  return applied;
}

/** Remove as sobrescritas remotas e volta para os valores do CSS gerado. */
export function clearRemoteTokens(element: HTMLElement = document.documentElement): void {
  for (const variables of Object.values(remoteVariables)) {
    for (const [variable] of Object.values(variables)) element.style.removeProperty(variable);
  }
}
