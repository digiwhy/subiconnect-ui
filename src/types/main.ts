export type SubiConnectAccessToken = string;

export enum SyncStatus {
  FAILED = 'FAILED',
  FAILED_FIRST = 'FAILED_FIRST',
  READY_TO_FIRST_SYNC = 'READY_TO_FIRST_SYNC',
  READY_TO_SYNC = 'READY_TO_SYNC',
  SYNCED = 'SYNCED',
  SYNCING = 'SYNCING',
  SYNCING_FIRST = 'SYNCING_FIRST',
}

export type DeepPartial<T> = {
  [P in keyof T]?: DeepPartial<T[P]>;
};
