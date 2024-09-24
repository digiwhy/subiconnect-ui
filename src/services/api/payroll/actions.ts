import { constructAPIURL } from '..';
import { withConnectionService } from '../utils';
import {
  CONNECTED_PAYROLL_APPLICATIONS_URL,
  PAYROLL_APPLICATIONS_URL,
  getAccountPayrollURL,
  getAllOrganisationsURL,
  getConnectPayrollURL,
  getIntegratePayrollURL,
  getOrganisationsFromPayrollURL,
  getSyncingOrganisationsURL,
} from './paths';
import type {
  AllOrganinisationsResponse,
  ConnectPayrollResponse,
  FindAllSyncingOrganisationsByCompanyIdResult,
} from './types';
import type {
  UsePostPayrollIntegrationProps,
  UsePostConnectPayrollProps,
} from '@/integration-pages/custom/mutation';
import { ConnectionService } from '@/services/axios/connection-service';
import type { AccountPayrollSystemExtended } from '@/types/application';
import type {
  PaginationResponse,
  ListOptions,
} from '@/types/components/data-table';
import type { Organisation } from '@/types/organisation';

export const listPayrollSystems = withConnectionService(
  async (
    connectionService: ConnectionService,
    options?: ListOptions,
  ): Promise<PaginationResponse<AccountPayrollSystemExtended>> => {
    const httpClient = connectionService.getHttpClient();
    const response = await httpClient.get<
      PaginationResponse<AccountPayrollSystemExtended>
    >(constructAPIURL(PAYROLL_APPLICATIONS_URL), options);
    return response.data;
  },
);

/**
 * Get all the payroll systems the company has connected to.
 */
export const listConnectedPayrollSystems = withConnectionService(
  async (
    connectionService: ConnectionService,
    options?: ListOptions,
  ): Promise<PaginationResponse<AccountPayrollSystemExtended>> => {
    const httpClient = connectionService.getHttpClient();
    const response = await httpClient.get<
      PaginationResponse<AccountPayrollSystemExtended>
    >(constructAPIURL(CONNECTED_PAYROLL_APPLICATIONS_URL), options);
    return response.data;
  },
);

export const integratePayroll = withConnectionService(
  async (
    connectionService: ConnectionService,
    { payrollSystem, integrationParams }: UsePostPayrollIntegrationProps,
  ): Promise<void> => {
    const httpClient = connectionService.getHttpClient();
    const response = await httpClient.post<void>(
      getIntegratePayrollURL(payrollSystem),
      integrationParams,
    );
    return response.data;
  },
);

export const connectPayroll = withConnectionService(
  async (
    connectionService: ConnectionService,
    { payroll, options }: UsePostConnectPayrollProps,
  ): Promise<ConnectPayrollResponse> => {
    const httpClient = connectionService.getHttpClient();
    const response = await httpClient.post<ConnectPayrollResponse>(
      getConnectPayrollURL(payroll),
      {},
      options,
    );
    return response.data;
  },
);

export const listOrganisationsFromPayroll = withConnectionService(
  async (
    connectionService: ConnectionService,
    accountPayrollId: number | string,
    options?: ListOptions,
  ): Promise<PaginationResponse<Organisation>> => {
    const httpClient = connectionService.getHttpClient();
    const response = await httpClient.get<PaginationResponse<Organisation>>(
      getOrganisationsFromPayrollURL(accountPayrollId),
      options,
    );
    return response.data;
  },
);

export const listAllOrganisations = withConnectionService(
  async (
    connectionService: ConnectionService,
    options?: ListOptions,
  ): Promise<PaginationResponse<AllOrganinisationsResponse>> => {
    const httpClient = connectionService.getHttpClient();
    const response = await httpClient.get<
      PaginationResponse<AllOrganinisationsResponse>
    >(getAllOrganisationsURL(), options);
    return response.data;
  },
);

export const listSyncingOrganisations = withConnectionService(
  async (
    connectionService: ConnectionService,
  ): Promise<FindAllSyncingOrganisationsByCompanyIdResult> => {
    const httpClient = connectionService.getHttpClient();
    const response =
      await httpClient.get<FindAllSyncingOrganisationsByCompanyIdResult>(
        getSyncingOrganisationsURL(),
      );
    return response.data;
  },
);

export const getAccountPayroll = withConnectionService(
  async (
    connectionService: ConnectionService,
    { payroll }: UsePostConnectPayrollProps,
  ): Promise<AccountPayrollSystemExtended> => {
    const httpClient = connectionService.getHttpClient();
    const response = await httpClient.get<AccountPayrollSystemExtended>(
      getAccountPayrollURL(payroll),
    );
    return response.data;
  },
);
