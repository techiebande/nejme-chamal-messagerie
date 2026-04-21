/**
 * Mock Operations Data for Dashboard
 * Simulates real NCM expedition and voyage metrics
 */

export interface ExpeditionMetric {
  label: string;
  value: number;
  status: 'success' | 'warning' | 'danger' | 'neutral';
}

export interface OperationsOverview {
  expeditionsToday: number;
  expeditionBreakdown: ExpeditionMetric[];
  voyagesInProgress: number;
  pendingAnomalies: number;
  lastUpdated: string;
}

export const getOperationsOverview = (): OperationsOverview => {
  return {
    expeditionsToday: 47,
    expeditionBreakdown: [
      { label: 'Livrées', value: 38, status: 'success' },
      { label: 'En transit', value: 7, status: 'neutral' },
      { label: 'En attente', value: 2, status: 'warning' },
    ],
    voyagesInProgress: 12,
    pendingAnomalies: 3,
    lastUpdated: new Date().toISOString(),
  };
};
