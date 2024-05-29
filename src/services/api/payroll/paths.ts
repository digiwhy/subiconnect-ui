import { constructAPIURL } from '..';

export const PAYROLL_APPLICATIONS_URL = 'payroll/';

export const CONNECTED_PAYROLL_APPLICATIONS_URL = 'payroll/connected';

export const getIntegratePayrollURL = (payrollSystemId: number | string) => {
  return constructAPIURL(
    PAYROLL_APPLICATIONS_URL + `${payrollSystemId}/integrate/`,
  );
};

export const getConnectPayrollURL = (payrollSystemId: number | string) => {
  return constructAPIURL(
    PAYROLL_APPLICATIONS_URL + `${payrollSystemId}/connect/`,
  );
};

export const getOrganisationsFromPayrollURL = (payrollId: number | string) => {
  return constructAPIURL(
    `${PAYROLL_APPLICATIONS_URL}${payrollId}/organisations/`,
  );
};
