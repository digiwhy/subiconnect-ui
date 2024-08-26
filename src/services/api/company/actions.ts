import { constructAPIURL } from '..';
import { ACCESS_TOKEN_NAME } from '../../../constants';
import type { Payroll } from '../../../types';
import type { Company } from '../../../types/company';
import axiosClient from '../../axios';
import { COMPANY_PAYROLL_INTEGRATIONS_URL, COMPANY_URL } from './paths';

/**
 * Gets the company that is attached to the authorisation headers.
 */
export const getCompany = async (): Promise<Company> => {
  const accessToken = localStorage.getItem(ACCESS_TOKEN_NAME);
  const response = await axiosClient.get<Company>(
    constructAPIURL(COMPANY_URL),
    { headers: { Authorization: `Bearer ${accessToken}` } },
  );
  return response.data;
};

/**
 * Get the company's payroll systems they have connected to.
 * @returns a list of connected payroll systems.
 */
export const getCompanyPayrollIntegrations = async (): Promise<
  Payroll[] | null
> => {
  const response = await axiosClient.get<{ integrations: Payroll[] | null }>(
    constructAPIURL(COMPANY_PAYROLL_INTEGRATIONS_URL),
  );

  return response.data.integrations;
};
