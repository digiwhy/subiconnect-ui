import type { SyncStatus } from '@/types/main';

export function isNestedType(
  data: unknown,
): data is BaseLastSyncedColumnNestedSyncType {
  return (
    typeof data === 'object' &&
    data !== null &&
    'status' in data &&
    'lastSyncAt' in data
  );
}

export function isFlatType(data: unknown): data is BaseLastSyncedColumnType {
  return (
    typeof data === 'object' &&
    data !== null &&
    'syncStatus' in data &&
    'lastSynced' in data
  );
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
