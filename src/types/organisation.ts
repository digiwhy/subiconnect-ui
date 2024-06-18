import type { SyncStatus } from './main';

export type Organisation = {
  id: number;
  name: string;
  numberOfEmployees: number;
  dateConnected: Date;
  lastSynced: Date | null;
  syncStatus: SyncStatus;
};
