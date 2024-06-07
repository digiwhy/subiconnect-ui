import type { OrganisationSyncStatus } from './organisation';

export type Employee = {
  id: number;
  firstName: string;
  lastName: string;

  emails: string[];
  salaries: number[];

  organisationId: number;
  organisationName: string;

  lastSynced: Date | null;
  syncStatus: OrganisationSyncStatus;
};
