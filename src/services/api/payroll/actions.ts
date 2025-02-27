import { constructAPIURL } from '..';
import { withConnectionService } from '../utils';
import {
  CONNECTED_PAYROLL_APPLICATIONS_URL,
  PAYROLL_APPLICATIONS_URL,
  getAccountPayrollURL,
  getAllOrganisationsURL,
  getCheckIntegrationStatusURL,
  getConnectPayrollURL,
  getIntegrateManualPayrollURL,
  getIntegratePayrollURL,
  getOrganisationsFromPayrollURL,
  getSyncingOrganisationsURL,
} from './paths';
import type {
  AllOrganinisationsResponse,
  CheckIntegrationStatusResponse,
  ConnectPayrollResponse,
  FindAllSyncingOrganisationsByCompanyIdResult,
} from './types';
import { ConnectionService } from '@/services/axios/connection-service';
import type { AccountPayrollSystemExtended } from '@/types/application';
import type {
  PaginationResponse,
  ListOptions,
} from '@/types/components/data-table';
import type {
  UseConnectPayrollMutationProps,
  UseIntegrateCustomPayrollMutationProps,
  UseIntegrateManualPayrollMutationProps,
} from '@/types/integration';
import type { Organisation } from '@/types/organisation';
import type { Payroll } from '@/types/payroll';

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
    {
      payrollSystem,
      integrationParams,
    }: UseIntegrateCustomPayrollMutationProps,
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
    { payroll, options }: UseConnectPayrollMutationProps,
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

export const integrateManualPayroll = withConnectionService(
  async (
    connectionService: ConnectionService,
    { payrollName }: UseIntegrateManualPayrollMutationProps,
  ): Promise<void> => {
    const httpClient = connectionService.getHttpClient();
    const response = await httpClient.post<void>(
      getIntegrateManualPayrollURL(),
      {
        payrollName,
      },
    );
    return response.data;
  },
);

export const listOrganisationsFromPayroll = withConnectionService(
  async (
    connectionService: ConnectionService,
    payrollSystemId: number | string,
    options?: ListOptions,
  ): Promise<PaginationResponse<Organisation>> => {
    const httpClient = connectionService.getHttpClient();
    const response = await httpClient.get<PaginationResponse<Organisation>>(
      getOrganisationsFromPayrollURL(payrollSystemId),
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
    {
      payroll,
    }: {
      payroll: Payroll;
    },
  ): Promise<AccountPayrollSystemExtended> => {
    const httpClient = connectionService.getHttpClient();
    const response = await httpClient.get<AccountPayrollSystemExtended>(
      getAccountPayrollURL(payroll),
    );
    return response.data;
  },
);

export const getIntegrationStatus = withConnectionService(
  async (connectionService: ConnectionService): Promise<boolean> => {
    const httpClient = connectionService.getHttpClient();
    const response = await httpClient.get<CheckIntegrationStatusResponse>(
      getCheckIntegrationStatusURL(),
    );
    return response.data.success;
  },
);
