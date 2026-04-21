'use client';

import React from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { spacing, colors } from '@/app/config/design-tokens';

interface DashboardLayoutProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  headerActions?: React.ReactNode;
}

const sidebarLinks = [
  { label: 'Vue d\'ensemble', href: '/', icon: '📊', active: true },
  { label: 'Gestion de caisse', href: '/caisse', icon: '💰' },
  { label: 'Voyages', href: '/voyages', icon: '🚚' },
  { label: 'Anomalies', href: '/anomalies', icon: '⚠️' },
  { label: 'Paramètres', href: '/settings', icon: '⚙️' },
];

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  children,
  title = 'Vue d\'ensemble',
  subtitle,
  headerActions,
}) => {
  const mainStyle: React.CSSProperties = {
    marginLeft: '280px',
    marginTop: '80px',
    backgroundColor: colors.background,
    minHeight: '100vh',
  };

  const contentStyle: React.CSSProperties = {
    padding: spacing[6],
    maxWidth: '1400px',
    margin: '0 auto',
  };

  return (
    <>
      <Sidebar links={sidebarLinks} />
      <Header title={title} subtitle={subtitle} actions={headerActions} />
      <main style={mainStyle}>
        <div style={contentStyle}>{children}</div>
      </main>
    </>
  );
};
