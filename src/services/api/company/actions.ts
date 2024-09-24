import { constructAPIURL } from '..';
import { withConnectionService } from '../utils';
import { COMPANY_PAYROLL_INTEGRATIONS_URL, COMPANY_URL } from './paths';
import { ConnectionService } from '@/services/axios/connection-service';
import type { Payroll } from '@/types';
import type { Company } from '@/types/company';

/**
 * Gets the company that is attached to the authorisation headers.
 */
export const getCompany = withConnectionService(
  async (connectionService: ConnectionService): Promise<Company> => {
    const httpClient = connectionService.getHttpClient();
    const response = await httpClient.get<Company>(
      constructAPIURL(COMPANY_URL),
    );
    return response.data;
  },
);

/**
 * Get the company's payroll systems they have connected to.
 * @returns a list of connected payroll systems.
 */
export const getCompanyPayrollIntegrations = withConnectionService(
  async (connectionService: ConnectionService): Promise<Payroll[] | null> => {
    const httpClient = connectionService.getHttpClient();
    const response = await httpClient.get<{ integrations: Payroll[] | null }>(
      constructAPIURL(COMPANY_PAYROLL_INTEGRATIONS_URL),
    );

    return response.data.integrations;
  },
);
