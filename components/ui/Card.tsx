'use client';

import React from 'react';
import { colors, radius, shadows, spacing } from '@/app/config/design-tokens';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: 'default' | 'elevated';
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ variant = 'default', className = '', children, ...props }, ref) => {
    const cardStyle: React.CSSProperties = {
      backgroundColor: colors.background,
      borderRadius: radius.lg,
      padding: spacing[6],
      border: variant === 'default' ? `1px solid ${colors.border}` : 'none',
      boxShadow: variant === 'elevated' ? shadows.md : shadows.xs,
      transition: 'all 200ms ease-in-out',
    };

    return (
      <div ref={ref} style={cardStyle} className={className} {...props}>
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';
