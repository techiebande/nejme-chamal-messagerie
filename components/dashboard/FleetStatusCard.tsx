'use client';

import React from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Table, TableBody, TableHeader, TableRow, TableCell } from '@/components/ui/Table';
import { colors, spacing, typography } from '@/app/config/design-tokens';
import { FleetStatus } from '@/lib/mock/voyages';

interface FleetStatusCardProps {
  data: FleetStatus;
}

export const FleetStatusCard: React.FC<FleetStatusCardProps> = ({ data }) => {
  const titleStyle: React.CSSProperties = {
    fontSize: typography.fontSize.h3.size,
    fontWeight: 700,
    color: colors.textPrimary,
    margin: 0,
    marginBottom: spacing[6],
  };

  const fleetSummaryStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: spacing[4],
    marginBottom: spacing[8],
  };

  const fleetCardStyle: React.CSSProperties = {
    padding: spacing[4],
    backgroundColor: colors.surface,
    borderRadius: '8px',
    border: `1px solid ${colors.border}`,
    textAlign: 'center',
  };

  const fleetLabelStyle: React.CSSProperties = {
    fontSize: typography.fontSize.small.size,
    color: colors.textSecondary,
    margin: 0,
    marginBottom: spacing[2],
  };

  const fleetValueStyle: React.CSSProperties = {
    fontSize: typography.fontSize.h2.size,
    fontWeight: 700,
    color: colors.textPrimary,
    margin: 0,
  };

  const tableContainerStyle: React.CSSProperties = {
    overflowX: 'auto',
    marginTop: spacing[4],
  };

  const statusBadgeVariant = (status: string) => {
    switch (status) {
      case 'completed':
        return 'success';
      case 'in-progress':
        return 'primary';
      case 'delayed':
        return 'danger';
      case 'waiting':
        return 'warning';
      default:
        return 'neutral';
    }
  };

  const statusLabel = (status: string) => {
    switch (status) {
      case 'completed':
        return 'Livrée';
      case 'in-progress':
        return 'En transit';
      case 'delayed':
        return 'Retardée';
      case 'waiting':
        return 'En attente';
      default:
        return status;
    }
  };

  return (
    <Card variant="elevated">
      <h2 style={titleStyle}>Statut du parc et des expéditions</h2>

      <div style={fleetSummaryStyle}>
        <div style={fleetCardStyle}>
          <p style={fleetLabelStyle}>Total véhicules</p>
          <p style={fleetValueStyle}>{data.totalVehicles}</p>
        </div>
        <div style={fleetCardStyle}>
          <p style={fleetLabelStyle}>Disponibles</p>
          <p style={{ ...fleetValueStyle, color: colors.success[600] }}>
            {data.availableVehicles}
          </p>
        </div>
        <div style={fleetCardStyle}>
          <p style={fleetLabelStyle}>En transit</p>
          <p style={{ ...fleetValueStyle, color: colors.primary[600] }}>
            {data.inTransit}
          </p>
        </div>
        <div style={fleetCardStyle}>
          <p style={fleetLabelStyle}>En maintenance</p>
          <p style={{ ...fleetValueStyle, color: colors.warning[600] }}>
            {data.inMaintenance}
          </p>
        </div>
      </div>

      <div style={tableContainerStyle}>
        <Table>
          <thead>
            <TableRow>
              <TableHeader>Itinéraire</TableHeader>
              <TableHeader>Véhicule</TableHeader>
              <TableHeader>Conducteur</TableHeader>
              <TableHeader>Colis</TableHeader>
              <TableHeader>Statut</TableHeader>
            </TableRow>
          </thead>
          <TableBody>
            {data.voyages.map((voyage) => (
              <TableRow key={voyage.id}>
                <TableCell>
                  <span style={{ fontWeight: 600 }}>
                    {voyage.departureCity} → {voyage.destinationCity}
                  </span>
                  <br />
                  <span style={{ fontSize: typography.fontSize.small.size, color: colors.textSecondary }}>
                    {voyage.routeNumber}
                  </span>
                </TableCell>
                <TableCell>{voyage.vehicleReg}</TableCell>
                <TableCell>{voyage.driverName}</TableCell>
                <TableCell>{voyage.packageCount}</TableCell>
                <TableCell>
                  <Badge variant={statusBadgeVariant(voyage.status)} size="md">
                    {statusLabel(voyage.status)}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
};
