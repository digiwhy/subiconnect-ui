import type { PayrollConnectionTypeEnum } from '@/services/api/payroll/types';

export type AccountPayrollSystemExtended = {
  /** The Subi UID of the account payroll system. */
  id: number;

  /** The name of the payroll system. */
  name: string;

  /** The payroll system logo. */
  bannerImg: string;

  /** The background colour for the system banner. */
  backgroundColour: string;

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
