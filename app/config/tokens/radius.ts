/**
 * Border Radius Tokens for NCM Dashboard
 * Used for rounding corners on buttons, cards, inputs
 */

export const radius = {
  none: '0',
  sm: '4px',
  base: '6px',
  md: '8px',
  lg: '12px',
  xl: '16px',
  full: '9999px',
} as const;

export type RadiusToken = keyof typeof radius;
