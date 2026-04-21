'use client';

import React from 'react';
import { colors, radius, spacing, typography } from '@/app/config/design-tokens';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  children: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      loading = false,
      disabled = false,
      className = '',
      children,
      ...props
    },
    ref
  ) => {
    // Base styles
    const baseStyles = {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontWeight: 500,
      border: 'none',
      cursor: disabled || loading ? 'not-allowed' : 'pointer',
      opacity: disabled || loading ? 0.6 : 1,
      transition: 'all 200ms ease-in-out',
      borderRadius: radius.md,
      fontSize: size === 'lg' ? '16px' : '14px',
      gap: spacing[2],
    } as React.CSSProperties;

    // Variant styles
    const variantStyles = {
      primary: {
        backgroundColor: colors.primary[500],
        color: colors.textOnPrimary,
        ...baseStyles,
      },
      secondary: {
        backgroundColor: colors.neutral[100],
        color: colors.textPrimary,
        border: `1px solid ${colors.border}`,
        ...baseStyles,
      },
      danger: {
        backgroundColor: colors.danger[500],
        color: colors.textOnDanger,
        ...baseStyles,
      },
    } as const;

    // Size styles
    const sizeStyles = {
      sm: {
        padding: `${spacing[1]} ${spacing[3]}`,
      },
      md: {
        padding: `${spacing[2]} ${spacing[4]}`,
      },
      lg: {
        padding: `${spacing[3]} ${spacing[5]}`,
      },
    } as const;

    const buttonStyle = {
      ...variantStyles[variant],
      ...sizeStyles[size],
    };

    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        style={buttonStyle}
        className={className}
        {...props}
      >
        {loading ? (
          <>
            <span
              style={{
                display: 'inline-block',
                width: '14px',
                height: '14px',
                border: '2px solid currentColor',
                borderTopColor: 'transparent',
                borderRadius: '50%',
                animation: 'spin 600ms linear infinite',
              }}
            />
            Loading...
          </>
        ) : (
          children
        )}
        <style>{`
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}</style>
      </button>
    );
  }
);

Button.displayName = 'Button';
