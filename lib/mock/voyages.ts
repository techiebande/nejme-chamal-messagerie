/**
 * Mock Voyages Data for Dashboard
 * Simulates real NCM voyage and shipment records
 */

export interface Voyage {
  id: string;
  routeNumber: string;
  departureCity: string;
  destinationCity: string;
  vehicleReg: string;
  driverName: string;
  status: 'in-progress' | 'completed' | 'delayed' | 'waiting';
  packageCount: number;
  departureTime: string;
  estimatedArrival: string;
}

export interface FleetStatus {
  totalVehicles: number;
  availableVehicles: number;
  inTransit: number;
  inMaintenance: number;
  voyages: Voyage[];
}

export const getFleetStatus = (): FleetStatus => {
  return {
    totalVehicles: 34,
    availableVehicles: 8,
    inTransit: 22,
    inMaintenance: 4,
    voyages: [
      {
        id: 'voy-001',
        routeNumber: 'R-001',
        departureCity: 'Casablanca',
        destinationCity: 'Marrakech',
        vehicleReg: 'CB-123-AA',
        driverName: 'Mohammed Safir',
        status: 'in-progress',
        packageCount: 156,
        departureTime: '2026-04-21T07:30:00Z',
        estimatedArrival: '2026-04-21T12:45:00Z',
      },
      {
        id: 'voy-002',
        routeNumber: 'R-002',
        departureCity: 'Fes',
        destinationCity: 'Tangier',
        vehicleReg: 'FE-456-BB',
        driverName: 'Hassan Boualam',
        status: 'in-progress',
        packageCount: 203,
        departureTime: '2026-04-21T08:00:00Z',
        estimatedArrival: '2026-04-21T14:30:00Z',
      },
      {
        id: 'voy-003',
        routeNumber: 'R-003',
        departureCity: 'Rabat',
        destinationCity: 'Casablanca',
        vehicleReg: 'RB-789-CC',
        driverName: 'Yusuf Kasmi',
        status: 'completed',
        packageCount: 89,
        departureTime: '2026-04-21T06:00:00Z',
        estimatedArrival: '2026-04-21T10:30:00Z',
      },
      {
        id: 'voy-004',
        routeNumber: 'R-004',
        departureCity: 'Agadir',
        destinationCity: 'Essaouira',
        vehicleReg: 'AG-321-DD',
        driverName: 'Ali Bennani',
        status: 'delayed',
        packageCount: 142,
        departureTime: '2026-04-21T07:00:00Z',
        estimatedArrival: '2026-04-21T13:00:00Z',
      },
    ],
  };
};
