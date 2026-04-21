'use client';

import React from 'react';
import { colors, radius, spacing, typography } from '@/app/config/design-tokens';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'primary' | 'success' | 'warning' | 'danger' | 'neutral';
  size?: 'sm' | 'md';
  children: React.ReactNode;
}

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ variant = 'primary', size = 'sm', className = '', children, ...props }, ref) => {
    const variantConfig = {
      primary: {
        backgroundColor: colors.primary[100],
        color: colors.primary[700],
      },
      success: {
        backgroundColor: colors.success[100],
        color: colors.success[700],
      },
      warning: {
        backgroundColor: colors.warning[100],
        color: colors.warning[700],
      },
      danger: {
        backgroundColor: colors.danger[100],
        color: colors.danger[700],
      },
      neutral: {
        backgroundColor: colors.neutral[100],
        color: colors.neutral[700],
      },
    } as const;

    const sizeConfig = {
      sm: {
        padding: `${spacing[1]} ${spacing[2]}`,
        fontSize: typography.fontSize.caption.size,
        fontWeight: 500,
      },
      md: {
        padding: `${spacing[2]} ${spacing[3]}`,
        fontSize: typography.fontSize.small.size,
        fontWeight: 500,
      },
    } as const;

    const badgeStyle: React.CSSProperties = {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: radius.full,
      whiteSpace: 'nowrap',
      ...variantConfig[variant],
      ...sizeConfig[size],
    };

    return (
      <span ref={ref} style={badgeStyle} className={className} {...props}>
        {children}
      </span>
    );
  }
);

Badge.displayName = 'Badge';
