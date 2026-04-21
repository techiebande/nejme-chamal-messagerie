/**
 * Mock Caisse (Cash Register) Data for Dashboard
 * Simulates real NCM agency cash status
 */

export interface CaisseRegister {
  id: string;
  name: string;
  status: 'open' | 'closed';
  operatorName: string;
  openedAt?: string;
  closedAt?: string;
  receipts: number;
  expenses: number;
  balance: number;
}

export interface CaisseDashboard {
  todayDate: string;
  totalReceipts: number;
  totalExpenses: number;
  runningBalance: number;
  registers: CaisseRegister[];
  lastUpdated: string;
}

export const getCaisseDashboard = (): CaisseDashboard => {
  return {
    todayDate: new Date().toLocaleDateString('fr-FR'),
    totalReceipts: 45800,
    totalExpenses: 12300,
    runningBalance: 33500,
    registers: [
      {
        id: 'caisse-001',
        name: 'Caisse Principale',
        status: 'open',
        operatorName: 'Ahmed Bennani',
        openedAt: '2026-04-21T08:30:00Z',
        receipts: 28500,
        expenses: 7200,
        balance: 21300,
      },
      {
        id: 'caisse-002',
        name: 'Caisse Secondaire',
        status: 'closed',
        operatorName: 'Fatima Aziz',
        closedAt: '2026-04-20T17:45:00Z',
        receipts: 17300,
        expenses: 5100,
        balance: 12200,
      },
    ],
    lastUpdated: new Date().toISOString(),
  };
};
