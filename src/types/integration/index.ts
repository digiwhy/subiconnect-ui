import { Payroll } from '../payroll';

/**
 * The params for the Bamboo integration.
 * domain: The sub-domain of the user's BambooHR instance.
 * apiKey: The API key for the BambooHR instance.
 */
export type BambooIntegrationParams = {
  domain: string;
  apiKey: string;
};

/**
 * The params for the KeyPay integration.
 * apiKey: The API key for the KeyPay instance.
 */
export type KeyPayIntegrationParams = {
  apiKey: string;
};

/**
 * The params for the QuickBooks integration.
 * apiKey: The API key for the QuickBooks instance.
 */
export type QuickBooksIntegrationParams = {
  apiKey: string;
};

export type CustomIntegrationPayroll =
  | (typeof Payroll)['BAMBOO']
  | (typeof Payroll)['KEYPAY']
  | (typeof Payroll)['QUICKBOOKS'];

export const isCustomIntegrationPayroll = (
  payroll: Payroll,
): payroll is CustomIntegrationPayroll => {
  return (
    payroll === Payroll.BAMBOO ||
    payroll === Payroll.KEYPAY ||
    payroll === Payroll.QUICKBOOKS
  );
};

export type IntegrateCustomPayrollParams =
  | BambooIntegrationParams
  | KeyPayIntegrationParams
  | QuickBooksIntegrationParams;

export type UseIntegrateCustomPayrollMutationProps =
  | {
      payrollSystem: (typeof Payroll)['BAMBOO'];
      integrationParams: BambooIntegrationParams;
    }
  | {
      payrollSystem: (typeof Payroll)['KEYPAY'];
      integrationParams: KeyPayIntegrationParams;
    }
  | {
      payrollSystem: (typeof Payroll)['QUICKBOOKS'];
      integrationParams: QuickBooksIntegrationParams;
    };

export type UseConnectPayrollMutationProps = {
  payroll: Payroll;
  options?: {
    params: { authWindow: boolean | undefined };
  };
};

export type UseIntegrateManualPayrollMutationProps = {
  payrollName: string;
};
