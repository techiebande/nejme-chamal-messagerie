'use client';

import React from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { colors, spacing, typography } from '@/app/config/design-tokens';
import { OperationsOverview } from '@/lib/mock/operations';

interface OperationsOverviewCardProps {
  data: OperationsOverview;
}

export const OperationsOverviewCard: React.FC<OperationsOverviewCardProps> = ({
  data,
}) => {
  const titleStyle: React.CSSProperties = {
    fontSize: typography.fontSize.h3.size,
    fontWeight: 700,
    color: colors.textPrimary,
    margin: 0,
    marginBottom: spacing[6],
  };

  const metricsGridStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: spacing[4],
    marginBottom: spacing[8],
  };

  const metricCardStyle: React.CSSProperties = {
    padding: spacing[4],
    backgroundColor: colors.surface,
    borderRadius: '8px',
    border: `1px solid ${colors.border}`,
  };

  const metricLabelStyle: React.CSSProperties = {
    fontSize: typography.fontSize.small.size,
    color: colors.textSecondary,
    margin: 0,
    marginBottom: spacing[2],
  };

  const metricValueStyle: React.CSSProperties = {
    fontSize: typography.fontSize.h2.size,
    fontWeight: 700,
    color: colors.textPrimary,
    margin: 0,
  };

  const breakdownStyle: React.CSSProperties = {
    marginTop: spacing[6],
  };

  const breakdownTitleStyle: React.CSSProperties = {
    fontSize: typography.fontSize.h4.size,
    fontWeight: 600,
    color: colors.textPrimary,
    margin: 0,
    marginBottom: spacing[3],
  };

  const breakdownListStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: spacing[2],
  };

  const breakdownItemStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing[2],
  };

  const badgeVariantMap = {
    success: 'success',
    warning: 'warning',
    danger: 'danger',
    neutral: 'neutral',
  } as const;

  return (
    <Card variant="elevated">
      <h2 style={titleStyle}>Aperçu des opérations</h2>

      <div style={metricsGridStyle}>
        <div style={metricCardStyle}>
          <p style={metricLabelStyle}>Expéditions du jour</p>
          <p style={metricValueStyle}>{data.expeditionsToday}</p>
        </div>
        <div style={metricCardStyle}>
          <p style={metricLabelStyle}>Voyages en cours</p>
          <p style={metricValueStyle}>{data.voyagesInProgress}</p>
        </div>
        <div style={metricCardStyle}>
          <p style={metricLabelStyle}>Anomalies en attente</p>
          <p style={metricValueStyle}>{data.pendingAnomalies}</p>
        </div>
      </div>

      <div style={breakdownStyle}>
        <h3 style={breakdownTitleStyle}>Répartition des expéditions</h3>
        <div style={breakdownListStyle}>
          {data.expeditionBreakdown.map((item, idx) => (
            <div key={idx} style={breakdownItemStyle}>
              <span style={{ color: colors.textPrimary }}>
                {item.label}
              </span>
              <div style={{ display: 'flex', alignItems: 'center', gap: spacing[2] }}>
                <span style={{ fontWeight: 600, color: colors.textPrimary }}>
                  {item.value}
                </span>
                <Badge
                  variant={badgeVariantMap[item.status]}
                  size="sm"
                >
                  {((item.value / data.expeditionsToday) * 100).toFixed(0)}%
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};
