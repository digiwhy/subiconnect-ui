import { getAllEmployeesURL } from '../../services/api/employee/paths';
import { BASE_URL } from '../../services/axios/config';
import type { PaginationResponse } from '../../types/components/data-table';
import type { Employee } from '../../types/employee';
import { SyncStatus } from '../../types/main';
import { Payroll } from '../../types/payroll';

export const useEmployeesMockData = {
  url: BASE_URL + getAllEmployeesURL(),
  method: 'GET',
  status: 200,
  response: {
    count: 5,
    previous: null,
    next: null,
    results: [
      {
        active: true,
        id: 1,
        info: {
          firstName: 'John',
          lastName: 'Doe',
          email: 'john.doe@example.com',
          salary: {
            value: 6323200,
            decimal: 2,
          },
        },
        payroll: {
          organisation: {
            id: 10,
            name: 'Johns Bricklaying',
            referenceId: 'johns-bricklaying',
          },
          name: Payroll.MYOB,
          referenceEmployeeId: 'john.doe@example.com',
        },
        metadata: {
          createdAt: new Date(),
          sync: {
            status: SyncStatus.SYNCED,
            lastSyncAt: new Date(),
          },
        },
        // organisationId: 10,
        // organisationName: 'Johns Bricklaying',
        // syncStatus: OrganisationSyncStatus.SYNCED,
        // lastSynced: new Date(),
        // salaries: [6323200, 5000000],
      },
      // {
      //   id: 2,
      //   info: {
      //     firstName: 'Jane',
      //     lastName: 'Smith',
      //     email: 'jane.smith@example.com',
      //   },
      //   // emails: ['jane.smith@example.com'],
      //   organisationId: 10,
      //   organisationName: 'Johns Bricklaying',
      //   syncStatus: OrganisationSyncStatus.SYNCED,
      //   lastSynced: new Date(),
      //   salaries: [6323200],
      // },
      // {
      //   id: 3,
      //   firstName: 'Emily',
      //   lastName: 'Johnson',
      //   emails: ['emily.johnson@example.com', 'ej.work@example.com'],
      //   organisationId: 11,
      //   organisationName: 'Bobs Bricklaying',
      //   syncStatus: OrganisationSyncStatus.FAILED,
      //   lastSynced: new Date(),
      //   salaries: [6323200],
      // },
      // {
      //   id: 4,
      //   firstName: 'Michael',
      //   lastName: 'Williams',
      //   emails: ['michael.williams@example.com'],
      //   organisationId: 11,
      //   organisationName: 'Bobs Bricklaying',
      //   syncStatus: OrganisationSyncStatus.SYNCING,
      //   lastSynced: null,
      //   salaries: [6323200],
      // },
      // {
      //   id: 5,
      //   firstName: 'Sarah',
      //   lastName: 'Brown',
      //   emails: ['sarah.brown@example.com'],
      //   organisationId: 11,
      //   organisationName: 'Bobs Bricklaying',
      //   syncStatus: OrganisationSyncStatus.FAILED,
      //   lastSynced: null,
      //   salaries: [],
      // },
    ],
  } satisfies PaginationResponse<Employee>,
};
