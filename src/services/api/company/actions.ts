import { constructAPIURL } from '..';
import { COMPANY_PAYROLL_INTEGRATIONS_URL, COMPANY_URL } from './paths';
import axiosClient from '@/services/axios';
import type { Payroll } from '@/types';
import type { Company } from '@/types/company';

/**
 * Gets the company that is attached to the authorisation headers.
 */
export const getCompany = async (): Promise<Company> => {
  const response = await axiosClient.get<Company>(constructAPIURL(COMPANY_URL));
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
