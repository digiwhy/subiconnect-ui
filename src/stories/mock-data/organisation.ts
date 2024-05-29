import { getOrganisationsFromPayrollURL } from '@/services/api/payroll/paths';
import { OrganisationSyncStatus } from '@/types/organisation';

export const _useOrganisationsMockData = {
  url: getOrganisationsFromPayrollURL(1),
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
        syncStatus: OrganisationSyncStatus.SYNCING,
      },

      {
        id: 2,
        name: 'Test 2',
        numberOfEmployees: 5,
        dateConnected: new Date(),
        lastSynced: null,
        syncStatus: OrganisationSyncStatus.SYNCING,
      },
      {
        id: 3,
        name: 'Test 3333',
        numberOfEmployees: 93,
        dateConnected: new Date(),
        lastSynced: null,
        syncStatus: OrganisationSyncStatus.SYNCING,
      },
      {
        id: 4,
        name: 'Test 4',
        numberOfEmployees: 55,
        dateConnected: new Date(),
        lastSynced: null,
        syncStatus: OrganisationSyncStatus.FAILED,
      },
      {
        id: 5,
        name: 'Test five',
        numberOfEmployees: 102,
        dateConnected: new Date(),
        lastSynced: new Date(),
        syncStatus: OrganisationSyncStatus.SYNCED,
      },
    ],
  },
};
