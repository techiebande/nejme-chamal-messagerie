/**
 * Typography Tokens for NCM Dashboard
 * Scales: Heading, Body, Caption
 * Weights: Regular (400), Medium (500), Semibold (600), Bold (700)
 */

export const typography = {
  fontFamily: {
    sans: 'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    mono: 'ui-monospace, SFMono-Regular, Menlo, Courier, monospace',
  },

  fontSize: {
    // Headings
    h1: { size: '32px', lineHeight: '40px', weight: 700 }, // 2xl
    h2: { size: '28px', lineHeight: '36px', weight: 700 }, // xl
    h3: { size: '24px', lineHeight: '32px', weight: 600 }, // lg
    h4: { size: '20px', lineHeight: '28px', weight: 600 }, // md
    h5: { size: '18px', lineHeight: '28px', weight: 600 }, // sm

    // Body
    body: { size: '16px', lineHeight: '24px', weight: 400 }, // base
    bodyMedium: { size: '16px', lineHeight: '24px', weight: 500 },
    bodySemibold: { size: '16px', lineHeight: '24px', weight: 600 },

    // Small text
    small: { size: '14px', lineHeight: '20px', weight: 400 },
    smallMedium: { size: '14px', lineHeight: '20px', weight: 500 },

    // Caption
    caption: { size: '12px', lineHeight: '16px', weight: 400 },
    captionMedium: { size: '12px', lineHeight: '16px', weight: 500 },

    // Button text
    button: { size: '14px', lineHeight: '20px', weight: 500 },
    buttonLarge: { size: '16px', lineHeight: '24px', weight: 500 },
  },

  lineHeight: {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.6,
  },

  letterSpacing: {
    tight: '-0.02em',
    normal: '0em',
    wide: '0.02em',
  },
} as const;

export type FontSize = keyof typeof typography.fontSize;
