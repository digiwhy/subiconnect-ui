import { constructAPIURL } from '..';
import { Payroll } from '@/types/payroll';

export const PAYROLL_APPLICATIONS_URL = 'payroll';

export const CONNECTED_PAYROLL_APPLICATIONS_URL = 'payroll/connected';

export const getIntegratePayrollURL = (payrollSystemId: number | string) => {
  return constructAPIURL(
    PAYROLL_APPLICATIONS_URL + `/${payrollSystemId}/integrate`,
  );
};

export const getConnectPayrollURL = (payroll: Payroll) => {
  return constructAPIURL(PAYROLL_APPLICATIONS_URL + `/${payroll}/connect`);
};

export const getIntegrateManualPayrollURL = () => {
  return constructAPIURL(
    PAYROLL_APPLICATIONS_URL + `/${Payroll.MANUAL}/integrate`,
  );
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

export const getAllOrganisationsURL = () => {
  return constructAPIURL(`${PAYROLL_APPLICATIONS_URL}/organisations`);
};

export const getSyncingOrganisationsURL = () => {
  return constructAPIURL(`${PAYROLL_APPLICATIONS_URL}/organisations/syncing`);
};

export const getCheckIntegrationStatusURL = () => {
  return constructAPIURL(`${PAYROLL_APPLICATIONS_URL}/integrate-status`);
};
