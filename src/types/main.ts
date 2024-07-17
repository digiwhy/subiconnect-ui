export type SubiConnectAccessToken = string;

export type SubiConnectOptions = {
  /**
   * Debugging options.
   */
  debug: {
    /**
     * Sets the base URL for the SubiConnect API.
     */
    baseURL?: string;

    /**
     * Disables logging to the console when NODE_ENV = local.
     */
    disabledLogging?: boolean;
  };
};

export enum SyncStatus {
  FAILED = 'FAILED',
  FAILED_FIRST = 'FAILED_FIRST',
  READY_TO_FIRST_SYNC = 'READY_TO_FIRST_SYNC',
  READY_TO_SYNC = 'READY_TO_SYNC',
  SYNCED = 'SYNCED',
  SYNCING = 'SYNCING',
  SYNCING_FIRST = 'SYNCING_FIRST',
}
