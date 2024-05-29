import type { Account } from './account';

export type Company = {
  /** The Subi UID of the company. */
  id: number;

  /** The name of the company--this can possibly be stale. Only used for
   * sanity checking. */
  name: string;

  /** The account's reference id of the company. */
  externalReferenceId: string;

  account: Account;
};
