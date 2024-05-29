import { getAllEmployeesURL } from '@/services/api/employee/paths';
import type { PaginationResponse } from '@/types/components/data-table';
import type { Employee } from '@/types/employee';
import { OrganisationSyncStatus } from '@/types/organisation';

export const _useEmployeesMockData = {
  url: getAllEmployeesURL(),
  method: 'GET',
  status: 200,
  response: {
    count: 5,
    previous: null,
    next: null,
    results: [
      {
        id: 1,
        firstName: 'John',
        lastName: 'Doe',
        emails: ['john.doe@example.com'],
        organisationId: 10,
        organisationName: 'Johns Bricklaying',
        syncStatus: OrganisationSyncStatus.SYNCED,
        lastSynced: new Date(),
      },
      {
        id: 2,
        firstName: 'Jane',
        lastName: 'Smith',
        emails: ['jane.smith@example.com'],
        organisationId: 10,
        organisationName: 'Johns Bricklaying',
        syncStatus: OrganisationSyncStatus.SYNCED,
        lastSynced: new Date(),
      },
      {
        id: 3,
        firstName: 'Emily',
        lastName: 'Johnson',
        emails: ['emily.johnson@example.com', 'ej.work@example.com'],
        organisationId: 11,
        organisationName: 'Bobs Bricklaying',
        syncStatus: OrganisationSyncStatus.FAILED,
        lastSynced: new Date(),
      },
      {
        id: 4,
        firstName: 'Michael',
        lastName: 'Williams',
        emails: ['michael.williams@example.com'],
        organisationId: 11,
        organisationName: 'Bobs Bricklaying',
        syncStatus: OrganisationSyncStatus.SYNCING,
        lastSynced: null,
      },
      {
        id: 5,
        firstName: 'Sarah',
        lastName: 'Brown',
        emails: ['sarah.brown@example.com'],
        organisationId: 11,
        organisationName: 'Bobs Bricklaying',
        syncStatus: OrganisationSyncStatus.FAILED,
        lastSynced: null,
      },
    ],
  } satisfies PaginationResponse<Employee>,
};
