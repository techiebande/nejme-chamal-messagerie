'use client';

import React from 'react';
import { colors, radius, spacing, typography } from '@/app/config/design-tokens';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, icon, className = '', ...props }, ref) => {
    const inputStyle: React.CSSProperties = {
      width: '100%',
      padding: `${spacing[2]} ${spacing[3]}`,
      fontSize: typography.fontSize.body.size,
      lineHeight: typography.fontSize.body.lineHeight,
      border: `1px solid ${error ? colors.danger[500] : colors.border}`,
      borderRadius: radius.md,
      backgroundColor: colors.background,
      color: colors.textPrimary,
      transition: 'border-color 200ms ease-in-out',
      boxSizing: 'border-box',
    };

    const containerStyle: React.CSSProperties = {
      display: 'flex',
      flexDirection: 'column',
      gap: spacing[1],
    };

    const labelStyle: React.CSSProperties = {
      fontSize: typography.fontSize.small.size,
      fontWeight: 500,
      color: colors.textPrimary,
    };

    const wrapperStyle: React.CSSProperties = {
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
    };

    const iconStyle: React.CSSProperties = {
      position: 'absolute',
      right: spacing[3],
      display: 'flex',
      alignItems: 'center',
      pointerEvents: 'none',
      color: colors.textSecondary,
    };

    const errorStyle: React.CSSProperties = {
      fontSize: typography.fontSize.caption.size,
      color: colors.danger[500],
    };

    return (
      <div style={containerStyle}>
        {label && <label style={labelStyle}>{label}</label>}
        <div style={wrapperStyle}>
          <input
            ref={ref}
            style={{
              ...inputStyle,
              paddingRight: icon ? spacing[10] : spacing[3],
            }}
            className={className}
            {...props}
          />
          {icon && <div style={iconStyle}>{icon}</div>}
        </div>
        {error && <div style={errorStyle}>{error}</div>}
      </div>
    );
  }
);

Input.displayName = 'Input';
