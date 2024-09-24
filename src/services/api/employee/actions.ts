import { withConnectionService } from '../utils';
import { getAllEmployeesURL, getEmployeesFromOrganisationURL } from './paths';
import type { ListAllEmployeesOptions } from './types';
import { ConnectionService } from '@/services/axios/connection-service';
import type {
  ListOptions,
  PaginationResponse,
} from '@/types/components/data-table';
import type { Employee } from '@/types/employee';

/**
 * List all the employees for a company within a given organisation.
 * @param organisationId the id of the organisation.
 */
export const listEmployees = withConnectionService(
  async (
    connectionService: ConnectionService,
    organisationId: number | string,
    options?: ListOptions,
  ): Promise<PaginationResponse<Employee>> => {
    const httpClient = connectionService.getHttpClient();
    const response = await httpClient.get<PaginationResponse<Employee>>(
      getEmployeesFromOrganisationURL(organisationId),
      options,
    );
    return response.data;
  },
);

/**
 * List all the employees for a company in all connected organisations.
 */
export const listAllEmployees = withConnectionService(
  async (
    connectionService: ConnectionService,
    options?: ListAllEmployeesOptions,
  ): Promise<PaginationResponse<Employee>> => {
    const httpClient = connectionService.getHttpClient();
    const response = await httpClient.get<PaginationResponse<Employee>>(
      getAllEmployeesURL(),
      options,
    );
    return response.data;
  },
);
