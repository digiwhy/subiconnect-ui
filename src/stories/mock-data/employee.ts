import { SUBI_CONNECT_PUBLIC_BASE_URL } from '../../envs';
import { getAllEmployeesURL } from '../../services/api/employee/paths';
import type { PaginationResponse } from '../../types/components/data-table';
import type { Employee } from '../../types/employee';
import { SyncStatus } from '../../types/main';
import { Payroll } from '../../types/payroll';

export const useEmployeesMockData = {
  url: SUBI_CONNECT_PUBLIC_BASE_URL + getAllEmployeesURL(),
  method: 'GET',
  status: 200,
  response: {
    count: 2,
    previous: null,
    next: null,
    results: [
      {
        active: true,
        id: 1,
        info: {
          firstName: 'John',
          lastName: 'Doe',
          emails: ['john.doe@example.com', 'john.doex@example.com'],
          salaries: [
            {
              id: 1,
              value: 6323200,
              decimal: 2,
            },
            {
              id: 2,
              value: 5000000,
              decimal: 2,
            },
          ],
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
      {
        active: true,
        id: 1,
        info: {
          firstName: 'James',
          lastName: 'May',
          emails: ['james@may.com', 'james.may@example.com'],
          salaries: [
            {
              id: 1,
              value: 16323200,
              decimal: 2,
            },
            {
              id: 2,
              value: 16323200,
              decimal: 2,
            },
          ],
        },
        payroll: {
          organisation: {
            id: 11,
            name: 'Bobbys Demo',
            referenceId: 'bb-demo',
          },
          name: Payroll.MYOB,
          referenceEmployeeId: 'james@may.com',
        },
        metadata: {
          createdAt: new Date(),
          sync: {
            status: SyncStatus.SYNCED,
            lastSyncAt: new Date(),
          },
        },
      },
    ],
  } satisfies PaginationResponse<Employee>,
};
