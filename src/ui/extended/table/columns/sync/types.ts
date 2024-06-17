import type { SyncStatus } from '../../../../../types/main';

export function isNestedType(
  data: any, // eslint-disable-line @typescript-eslint/no-explicit-any
): data is BaseLastSyncedColumnNestedSyncType {
  return data && data.status && data.lastSyncAt;
}

export function isFlatType(
  data: any, // eslint-disable-line @typescript-eslint/no-explicit-any
): data is BaseLastSyncedColumnType {
  return data && data.syncStatus && data.lastSynced;
}

export type BaseLastSyncedColumnNestedType = {
  metadata: { sync: BaseLastSyncedColumnNestedSyncType };
};

export type BaseLastSyncedColumnType = {
  syncStatus: SyncStatus;
  lastSynced: Date | null;
};

export type BaseLastSyncedColumnNestedSyncType = {
  status: SyncStatus;
  lastSyncAt: Date | null;
};
