import type { SyncStatus } from '../../../../../types/main';

export function isNestedType(
  data: any, // eslint-disable-line @typescript-eslint/no-explicit-any
): data is BaseLastSyncedColumnNestedSyncType {
  return data && data.status !== undefined && data.lastSyncAt !== undefined;
}

export function isFlatType(
  data: any, // eslint-disable-line @typescript-eslint/no-explicit-any
): data is BaseLastSyncedColumnType {
  return data && data.syncStatus !== undefined && data.lastSynced !== undefined;
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
