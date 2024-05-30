export enum OrganisationSyncStatus {
  FAILED = 'FAILED',
  FAILED_FIRST = 'FAILED_FIRST',
  READY_TO_FIRST_SYNC = 'READY_TO_FIRST_SYNC',
  READY_TO_SYNC = 'READY_TO_SYNC',
  SYNCED = 'SYNCED',
  SYNCING = 'SYNCING',
  SYNCING_FIRST = 'SYNCING_FIRST',
}

export type Organisation = {
  id: number;
  name: string;
  numberOfEmployees: number;
  dateConnected: Date;
  lastSynced: Date | null;
  syncStatus: OrganisationSyncStatus;
};
