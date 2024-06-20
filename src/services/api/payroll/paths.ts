import { constructAPIURL } from '..';
import type { Payroll } from '../../../types/payroll';

export const PAYROLL_APPLICATIONS_URL = 'payroll';

export const CONNECTED_PAYROLL_APPLICATIONS_URL = 'payroll/connected';

export const getIntegratePayrollURL = (payrollSystemId: number | string) => {
  return constructAPIURL(
    PAYROLL_APPLICATIONS_URL + `/${payrollSystemId}/integrate/`,
  );
};

export const getConnectPayrollURL = (payroll: Payroll) => {
  return constructAPIURL(PAYROLL_APPLICATIONS_URL + `/${payroll}/connect/`);
};

export const getAccountPayrollURL = (payroll: Payroll) => {
  return constructAPIURL(
    PAYROLL_APPLICATIONS_URL + `/${payroll}/account-payroll`,
  );
};

export const getOrganisationsFromPayrollURL = (payrollId: number | string) => {
  return constructAPIURL(
    `${PAYROLL_APPLICATIONS_URL}/${payrollId}/organisations`,
  );
};
