'use client';

import React from 'react';
import { colors, spacing, typography, shadows } from '@/app/config/design-tokens';

interface HeaderProps {
  title?: string;
  subtitle?: string;
  actions?: React.ReactNode;
}

export const Header: React.FC<HeaderProps> = ({
  title = 'Dashboard',
  subtitle,
  actions,
}) => {
  const headerStyle: React.CSSProperties = {
    position: 'fixed',
    top: 0,
    left: '280px',
    right: 0,
    backgroundColor: colors.background,
    borderBottom: `1px solid ${colors.border}`,
    padding: `${spacing[4]} ${spacing[6]}`,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '80px',
    boxSizing: 'border-box',
    zIndex: 100,
    boxShadow: shadows.xs,
  };

  const titleContainerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: spacing[1],
  };

  const titleStyle: React.CSSProperties = {
    fontSize: typography.fontSize.h3.size,
    fontWeight: 700,
    color: colors.textPrimary,
    margin: 0,
  };

  const subtitleStyle: React.CSSProperties = {
    fontSize: typography.fontSize.small.size,
    color: colors.textSecondary,
    margin: 0,
  };

  const actionsStyle: React.CSSProperties = {
    display: 'flex',
    gap: spacing[4],
    alignItems: 'center',
  };

  return (
    <header style={headerStyle}>
      <div style={titleContainerStyle}>
        <h1 style={titleStyle}>{title}</h1>
        {subtitle && <p style={subtitleStyle}>{subtitle}</p>}
      </div>
      {actions && <div style={actionsStyle}>{actions}</div>}
    </header>
  );
};
