import { constructAPIURL } from '..';
import type {
  UsePostPayrollIntegrationProps,
  UsePostConnectPayrollProps,
} from '../../../integration-pages/custom/mutation';
import type { AccountPayrollSystemExtended } from '../../../types/application';
import type {
  PaginationResponse,
  ListOptions,
} from '../../../types/components/data-table';
import type { Organisation } from '../../../types/organisation';
import axiosClient from '../../axios';
import {
  CONNECTED_PAYROLL_APPLICATIONS_URL,
  PAYROLL_APPLICATIONS_URL,
  getConnectPayrollURL,
  getIntegratePayrollURL,
  getOrganisationsFromPayrollURL,
} from './paths';
import type { ConnectPayrollResponse } from './types';

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
}: UsePostConnectPayrollProps): Promise<ConnectPayrollResponse> => {
  const response = await axiosClient.post<ConnectPayrollResponse>(
    getConnectPayrollURL(payroll),
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
