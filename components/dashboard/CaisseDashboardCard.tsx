'use client';

import React from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { colors, spacing, typography } from '@/app/config/design-tokens';
import { CaisseDashboard } from '@/lib/mock/caisse';

interface CaisseDashboardCardProps {
  data: CaisseDashboard;
}

export const CaisseDashboardCard: React.FC<CaisseDashboardCardProps> = ({
  data,
}) => {
  const titleStyle: React.CSSProperties = {
    fontSize: typography.fontSize.h3.size,
    fontWeight: 700,
    color: colors.textPrimary,
    margin: 0,
    marginBottom: spacing[6],
  };

  const summaryGridStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: spacing[4],
    marginBottom: spacing[8],
  };

  const summaryCardStyle: React.CSSProperties = {
    padding: spacing[4],
    backgroundColor: colors.surface,
    borderRadius: '8px',
    border: `1px solid ${colors.border}`,
  };

  const summaryLabelStyle: React.CSSProperties = {
    fontSize: typography.fontSize.small.size,
    color: colors.textSecondary,
    margin: 0,
    marginBottom: spacing[1],
  };

  const summaryValueStyle: React.CSSProperties = {
    fontSize: typography.fontSize.h2.size,
    fontWeight: 700,
    color: colors.textPrimary,
    margin: 0,
  };

  const registersStyle: React.CSSProperties = {
    marginTop: spacing[6],
  };

  const registersTitleStyle: React.CSSProperties = {
    fontSize: typography.fontSize.h4.size,
    fontWeight: 600,
    color: colors.textPrimary,
    margin: 0,
    marginBottom: spacing[3],
  };

  const registerItemStyle: React.CSSProperties = {
    padding: spacing[4],
    backgroundColor: colors.surface,
    borderRadius: '8px',
    border: `1px solid ${colors.border}`,
    marginBottom: spacing[2],
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  };

  const registerInfoStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    gap: spacing[4],
    flex: 1,
  };

  const actionsStyle: React.CSSProperties = {
    display: 'flex',
    gap: spacing[3],
    marginTop: spacing[6],
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'MAD',
    }).format(value);
  };

  return (
    <Card variant="elevated">
      <h2 style={titleStyle}>Situation de caisse</h2>

      <p style={{ fontSize: typography.fontSize.small.size, color: colors.textSecondary }}>
        {data.todayDate}
      </p>

      <div style={summaryGridStyle}>
        <div style={summaryCardStyle}>
          <p style={summaryLabelStyle}>Recettes du jour</p>
          <p style={summaryValueStyle}>{formatCurrency(data.totalReceipts)}</p>
        </div>
        <div style={summaryCardStyle}>
          <p style={summaryLabelStyle}>Dépenses du jour</p>
          <p style={summaryValueStyle}>{formatCurrency(data.totalExpenses)}</p>
        </div>
        <div style={summaryCardStyle}>
          <p style={summaryLabelStyle}>Solde courant</p>
          <p style={{ ...summaryValueStyle, color: colors.success[600] }}>
            {formatCurrency(data.runningBalance)}
          </p>
        </div>
      </div>

      <div style={registersStyle}>
        <h3 style={registersTitleStyle}>Caisses</h3>
        {data.registers.map((register) => (
          <div key={register.id} style={registerItemStyle}>
            <div style={registerInfoStyle}>
              <div>
                <p style={{ margin: 0, fontWeight: 600, color: colors.textPrimary }}>
                  {register.name}
                </p>
                <p style={{ margin: 0, fontSize: typography.fontSize.small.size, color: colors.textSecondary }}>
                  Opérateur: {register.operatorName}
                </p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <p style={{ margin: 0, fontSize: typography.fontSize.small.size, color: colors.textSecondary }}>
                  Recettes: {formatCurrency(register.receipts)}
                </p>
                <p style={{ margin: 0, fontSize: typography.fontSize.small.size, color: colors.textSecondary }}>
                  Dépenses: {formatCurrency(register.expenses)}
                </p>
              </div>
            </div>
            <Badge
              variant={register.status === 'open' ? 'success' : 'neutral'}
              size="md"
            >
              {register.status === 'open' ? 'Ouverte' : 'Fermée'}
            </Badge>
          </div>
        ))}
      </div>

      <div style={actionsStyle}>
        <Button variant="primary">Ouvrir Caisse</Button>
        <Button variant="secondary">Enregistrer Dépense</Button>
      </div>
    </Card>
  );
};
