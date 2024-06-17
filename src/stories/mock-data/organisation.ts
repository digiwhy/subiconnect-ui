import { getOrganisationsFromPayrollURL } from '../../services/api/payroll/paths';
import { BASE_URL } from '../../services/axios/config';
import { SyncStatus } from '../../types/main';

export const useOrganisationsMockData = (id: number) => ({
  url: BASE_URL + getOrganisationsFromPayrollURL(id),
  method: 'GET',
  status: 200,
  response: {
    count: 5,
    next: null,
    previous: null,
    results: [
      {
        id: 1,
        name: 'Test Organisation',
        numberOfEmployees: 50,
        dateConnected: new Date(),
        lastSynced: null,
        syncStatus: SyncStatus.SYNCING,
      },

      {
        id: 2,
        name: 'Test 2',
        numberOfEmployees: 5,
        dateConnected: new Date(),
        lastSynced: null,
        syncStatus: SyncStatus.SYNCING,
      },
      {
        id: 3,
        name: 'Test 3333',
        numberOfEmployees: 93,
        dateConnected: new Date(),
        lastSynced: null,
        syncStatus: SyncStatus.SYNCING,
      },
      {
        id: 4,
        name: 'Test 4',
        numberOfEmployees: 55,
        dateConnected: new Date(),
        lastSynced: null,
        syncStatus: SyncStatus.FAILED,
      },
      {
        id: 5,
        name: 'Test five',
        numberOfEmployees: 102,
        dateConnected: new Date(),
        lastSynced: new Date(),
        syncStatus: SyncStatus.SYNCED,
      },
    ],
  },
});
