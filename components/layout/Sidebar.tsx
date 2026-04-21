'use client';

import React from 'react';
import { colors, spacing, typography } from '@/app/config/design-tokens';

interface SidebarLink {
  label: string;
  href: string;
  icon?: string;
  active?: boolean;
}

interface SidebarProps {
  links: SidebarLink[];
  title?: string;
}

export const Sidebar: React.FC<SidebarProps> = ({
  links,
  title = 'NCM Dashboard',
}) => {
  const sidebarStyle: React.CSSProperties = {
    width: '280px',
    backgroundColor: colors.neutral[900],
    color: colors.neutral[0],
    padding: spacing[6],
    height: '100vh',
    overflowY: 'auto',
    position: 'fixed',
    left: 0,
    top: 0,
    display: 'flex',
    flexDirection: 'column',
    gap: spacing[8],
  };

  const logoStyle: React.CSSProperties = {
    fontSize: typography.fontSize.h4.size,
    fontWeight: 700,
    marginBottom: spacing[4],
  };

  const navStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: spacing[2],
  };

  const linkStyle = (active?: boolean): React.CSSProperties => ({
    padding: `${spacing[3]} ${spacing[4]}`,
    fontSize: typography.fontSize.body.size,
    color: active ? colors.primary[500] : colors.neutral[300],
    backgroundColor: active ? colors.neutral[800] : 'transparent',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'all 200ms ease-in-out',
    textAlign: 'left',
    textDecoration: 'none',
    display: 'flex',
    alignItems: 'center',
    gap: spacing[2],
  });

  return (
    <aside style={sidebarStyle}>
      <div style={logoStyle}>{title}</div>
      <nav style={navStyle}>
        {links.map((link) => (
          <a
            key={link.href}
            href={link.href}
            style={linkStyle(link.active)}
            onMouseEnter={(e) => {
              if (!link.active) {
                (e.currentTarget as HTMLAnchorElement).style.backgroundColor = colors.neutral[800];
                (e.currentTarget as HTMLAnchorElement).style.color = colors.neutral[100];
              }
            }}
            onMouseLeave={(e) => {
              if (!link.active) {
                (e.currentTarget as HTMLAnchorElement).style.backgroundColor = 'transparent';
                (e.currentTarget as HTMLAnchorElement).style.color = colors.neutral[300];
              }
            }}
          >
            {link.icon && <span>{link.icon}</span>}
            <span>{link.label}</span>
          </a>
        ))}
      </nav>
    </aside>
  );
};
