import type { Account } from './account';

export type Company = {
  /** The Subi UID of the company. */
  id: number;

  /** The name of the company--this can possibly be stale. Only used for
   * sanity checking. */
  name: string;

  /** The account's reference id of the company. */
  externalReferenceId: string;

  /**
   * The account associated with the company.
   */
  account: Account;

  /**
   * Whether or not the company has an active payroll connection; i.e., whether
   * or not the company has integrated with a payroll system.
   */
  hasConnection?: boolean;
};
