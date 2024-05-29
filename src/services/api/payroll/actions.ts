import { constructAPIURL } from '..';
import axiosClient from '../../axios';
import {
  CONNECTED_PAYROLL_APPLICATIONS_URL,
  PAYROLL_APPLICATIONS_URL,
  getConnectPayrollURL,
  getIntegratePayrollURL,
  getOrganisationsFromPayrollURL,
} from './paths';
import type { ConnectPayrollResponse } from './types';
import type {
  UsePostConnectPayrollProps,
  UsePostPayrollIntegrationProps,
} from '@/integration-pages/custom/mutation';
import type { AccountPayrollSystemExtended } from '@/types/application';
import type {
  ListOptions,
  PaginationResponse,
} from '@/types/components/data-table';
import { type Organisation } from '@/types/organisation';

export const listPayrollSystems = async (): Promise<
  PaginationResponse<AccountPayrollSystemExtended>
> => {
  const response = await axiosClient.get<
    PaginationResponse<AccountPayrollSystemExtended>
  >(constructAPIURL(PAYROLL_APPLICATIONS_URL));
  return response.data;
};

/**
 * Get all the payroll systems the company has connected to.
 */
export const listConnectedPayrollSystems = async (): Promise<
  PaginationResponse<AccountPayrollSystemExtended>
> => {
  const response = await axiosClient.get<
    PaginationResponse<AccountPayrollSystemExtended>
  >(constructAPIURL(CONNECTED_PAYROLL_APPLICATIONS_URL));
  return response.data;
};

export const integratePayroll = async ({
  payrollSystemId,
  integrationParams,
}: UsePostPayrollIntegrationProps): Promise<void> => {
  const response = await axiosClient.post<void>(
    getIntegratePayrollURL(payrollSystemId),
    integrationParams,
  );
  return response.data;
};

export const connectPayroll = async ({
  payrollSystemId,
}: UsePostConnectPayrollProps): Promise<ConnectPayrollResponse> => {
  const response = await axiosClient.post<ConnectPayrollResponse>(
    getConnectPayrollURL(payrollSystemId),
  );
  return response.data;
};

export const listOrganisationsFromPayroll = async (
  payrollId: number | string,
  options?: ListOptions,
): Promise<PaginationResponse<Organisation>> => {
  const response = await axiosClient.get<PaginationResponse<Organisation>>(
    getOrganisationsFromPayrollURL(payrollId),
    options,
  );
  return response.data;
};
