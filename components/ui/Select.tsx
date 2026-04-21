'use client';

import React from 'react';
import { colors, radius, spacing, typography } from '@/app/config/design-tokens';

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: SelectOption[];
  error?: string;
  placeholder?: string;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, options, error, placeholder, className = '', ...props }, ref) => {
    const selectStyle: React.CSSProperties = {
      width: '100%',
      padding: `${spacing[2]} ${spacing[3]}`,
      fontSize: typography.fontSize.body.size,
      lineHeight: typography.fontSize.body.lineHeight,
      border: `1px solid ${error ? colors.danger[500] : colors.border}`,
      borderRadius: radius.md,
      backgroundColor: colors.background,
      color: colors.textPrimary,
      transition: 'border-color 200ms ease-in-out',
      cursor: 'pointer',
      boxSizing: 'border-box',
      appearance: 'none',
      backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3e%3cpath fill='none' stroke='${encodeURIComponent(colors.textSecondary)}' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M2 5l6 6 6-6'/%3e%3c/svg%3e")`,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: `right ${spacing[2]} center`,
      backgroundSize: '16px',
      paddingRight: spacing[10],
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

    const errorStyle: React.CSSProperties = {
      fontSize: typography.fontSize.caption.size,
      color: colors.danger[500],
    };

    return (
      <div style={containerStyle}>
        {label && <label style={labelStyle}>{label}</label>}
        <select
          ref={ref}
          style={selectStyle}
          className={className}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {error && <div style={errorStyle}>{error}</div>}
      </div>
    );
  }
);

Select.displayName = 'Select';
