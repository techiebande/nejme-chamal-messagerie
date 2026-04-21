/**
 * Semantic Color Tokens for NCM Dashboard
 * All colors are semantic (primary, success, warning, etc.) not literal
 * This allows theme changes to affect the entire app from one place
 */

export const colors = {
  // Primary - NCM brand blue for primary actions
  primary: {
    50: '#EBF2FF',
    100: '#D6E4FF',
    200: '#ADC8FF',
    300: '#84ADFF',
    400: '#5B91FF',
    500: '#3275FF', // Primary action blue
    600: '#2659D9',
    700: '#1A3DB3',
    800: '#0E218C',
    900: '#020566',
  },

  // Success - Green for positive states
  success: {
    50: '#ECFDF5',
    100: '#D1FAE5',
    200: '#A7F3D0',
    300: '#6EE7B7',
    400: '#34D399',
    500: '#10B981', // Success state
    600: '#059669',
    700: '#047857',
    800: '#065F46',
    900: '#064E3B',
  },

  // Warning - Amber for caution states
  warning: {
    50: '#FFFBEB',
    100: '#FEF3C7',
    200: '#FDE68A',
    300: '#FCD34D',
    400: '#FBBF24',
    500: '#F59E0B', // Warning state
    600: '#D97706',
    700: '#B45309',
    800: '#92400E',
    900: '#78350F',
  },

  // Danger - Red for negative states
  danger: {
    50: '#FEF2F2',
    100: '#FEE2E2',
    200: '#FECACA',
    300: '#FCA5A5',
    400: '#F87171',
    500: '#EF4444', // Danger state
    600: '#DC2626',
    700: '#B91C1C',
    800: '#991B1B',
    900: '#7F1D1D',
  },

  // Neutral - Grays for backgrounds, borders, text
  neutral: {
    0: '#FFFFFF',
    50: '#F9FAFB',
    100: '#F3F4F6',
    200: '#E5E7EB',
    300: '#D1D5DB',
    400: '#9CA3AF',
    500: '#6B7280',
    600: '#4B5563',
    700: '#374151',
    800: '#1F2937',
    900: '#111827',
    950: '#030712',
  },

  // Semantic aliases
  background: '#FFFFFF',
  surface: '#F9FAFB',
  surfaceAlt: '#F3F4F6',
  border: '#E5E7EB',
  borderAlt: '#D1D5DB',
  textPrimary: '#111827',
  textSecondary: '#4B5563',
  textTertiary: '#9CA3AF',
  textOnPrimary: '#FFFFFF',
  textOnSuccess: '#FFFFFF',
  textOnWarning: '#FFFFFF',
  textOnDanger: '#FFFFFF',
} as const;

export type ColorToken = keyof typeof colors;
