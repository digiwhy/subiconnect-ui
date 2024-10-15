import type { PayrollConnectionTypeEnum } from '../services/api/payroll/types';
import type { Payroll } from './payroll';

export type AccountPayrollSystemExtended = {
  /** The Subi UID of the account payroll system. */
  id: number;

  /** The name of the payroll system. */
  name: Payroll;

  /** The friendly name of the payroll system. */
  friendlyName?: string;

  /** The payroll system logo. */
  bannerImg?: string;

  /**
   * A boolean flag to determine if the user has connected/integrated with the
   * payroll system.
   */
  isConnected: boolean;

  /** The Subi UID of the payroll system. */
  payrollId: number;

  /** The integrations instructions as an mdx string. */
  mdxIntegrationInstructions: string | null;

  /**
   * The type of workflow to integrate the payroll system.
   */
  payrollConnectionType: PayrollConnectionTypeEnum;
};

export type ManualIntegrationAccountPayrollSystemExtended = {
  /** The friendly name of the payroll system. */
  friendlyName: string;

  /** The banner image URL of the payroll system. */
  bannerImgUrl: string;

  /** The description of the payroll system. */
  description: string;

  /** The text of the action button. */
  actionButtonText: string;

  /**
   * This function is called when the user clicks on the manual integration.
   * @param payrollSystem The payroll system the user clicked on.
   * @param onSuccessCallback The function to call when the integration is successful.
   * @param onCancelCallback The function to call when the integration is cancelled.
   */
  onConnect: ({
    payrollSystem,
    onSuccessCallback,
    onCancelCallback,
  }: {
    payrollSystem: ManualIntegrationAccountPayrollSystemExtended;
    onSuccessCallback: () => Promise<void>;
    onCancelCallback: () => Promise<void>;
  }) => void;
};
