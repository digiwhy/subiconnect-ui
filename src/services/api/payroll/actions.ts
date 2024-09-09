import { constructAPIURL } from '..';
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
import axiosClient from '@/services/axios';
import type { AccountPayrollSystemExtended } from '@/types/application';
import type {
  PaginationResponse,
  ListOptions,
} from '@/types/components/data-table';
import type { Organisation } from '@/types/organisation';

export const listPayrollSystems = async (
  options?: ListOptions,
): Promise<PaginationResponse<AccountPayrollSystemExtended>> => {
  const response = await axiosClient.get<
    PaginationResponse<AccountPayrollSystemExtended>
  >(constructAPIURL(PAYROLL_APPLICATIONS_URL), options);
  return response.data;
};

/**
 * Get all the payroll systems the company has connected to.
 */
export const listConnectedPayrollSystems = async (
  options?: ListOptions,
): Promise<PaginationResponse<AccountPayrollSystemExtended>> => {
  const response = await axiosClient.get<
    PaginationResponse<AccountPayrollSystemExtended>
  >(constructAPIURL(CONNECTED_PAYROLL_APPLICATIONS_URL), options);
  return response.data;
};

export const integratePayroll = async ({
  payrollSystem,
  integrationParams,
}: UsePostPayrollIntegrationProps): Promise<void> => {
  const response = await axiosClient.post<void>(
    getIntegratePayrollURL(payrollSystem),
    integrationParams,
  );
  return response.data;
};

export const connectPayroll = async ({
  payroll,
  options,
}: UsePostConnectPayrollProps): Promise<ConnectPayrollResponse> => {
  const response = await axiosClient.post<ConnectPayrollResponse>(
    getConnectPayrollURL(payroll),
    {},
    options,
  );
  return response.data;
};

export const listOrganisationsFromPayroll = async (
  accountPayrollId: number | string,
  options?: ListOptions,
): Promise<PaginationResponse<Organisation>> => {
  const response = await axiosClient.get<PaginationResponse<Organisation>>(
    getOrganisationsFromPayrollURL(accountPayrollId),
    options,
  );
  return response.data;
};

export const listAllOrganisations = async (
  options?: ListOptions,
): Promise<PaginationResponse<AllOrganinisationsResponse>> => {
  const response = await axiosClient.get<
    PaginationResponse<AllOrganinisationsResponse>
  >(getAllOrganisationsURL(), options);
  return response.data;
};

export const listSyncingOrganisations =
  async (): Promise<FindAllSyncingOrganisationsByCompanyIdResult> => {
    const response =
      await axiosClient.get<FindAllSyncingOrganisationsByCompanyIdResult>(
        getSyncingOrganisationsURL(),
      );
    return response.data;
  };

export const getAccountPayroll = async ({
  payroll,
}: UsePostConnectPayrollProps): Promise<AccountPayrollSystemExtended> => {
  const response = await axiosClient.get<AccountPayrollSystemExtended>(
    getAccountPayrollURL(payroll),
  );
  return response.data;
};
