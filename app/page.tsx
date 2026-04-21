'use client';

import { spacing } from '@/app/config/design-tokens';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { OperationsOverviewCard } from '@/components/dashboard/OperationsOverviewCard';
import { CaisseDashboardCard } from '@/components/dashboard/CaisseDashboardCard';
import { FleetStatusCard } from '@/components/dashboard/FleetStatusCard';
import { getOperationsOverview } from '@/lib/mock/operations';
import { getCaisseDashboard } from '@/lib/mock/caisse';
import { getFleetStatus } from '@/lib/mock/voyages';

export default function DashboardPage() {
  const operationsData = getOperationsOverview();
  const caisseData = getCaisseDashboard();
  const fleetData = getFleetStatus();

  const gridStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: spacing[6],
  };

  return (
    <DashboardLayout title="Vue d'ensemble" subtitle="Aperçu complet des opérations NCM">
      <div style={gridStyle}>
        <OperationsOverviewCard data={operationsData} />
        <CaisseDashboardCard data={caisseData} />
        <FleetStatusCard data={fleetData} />
      </div>
    </DashboardLayout>
  );
}
