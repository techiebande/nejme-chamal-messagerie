/**
 * Spacing Tokens for NCM Dashboard
 * Base unit: 4px
 * Used for padding, margins, gaps, widths, heights
 */

export const spacing = {
  0: '0',
  1: '4px',
  2: '8px',
  3: '12px',
  4: '16px',
  5: '20px',
  6: '24px',
  8: '32px',
  10: '40px',
  12: '48px',
  16: '64px',
  20: '80px',
  24: '96px',
  28: '112px',
  32: '128px',
} as const;

export type SpacingToken = keyof typeof spacing;
