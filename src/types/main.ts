export type SubiConnectAccessToken = string;

export type SubiConnectDebugOptions = {
  /**
   * Sets the base URL for the SubiConnect API.
   */
  baseURL?: string;

  /**
   * Disables logging to the console when NODE_ENV = development. Logging is
   * not enabled in production environments.
   */
  disabledLogging?: boolean;
};

export type SubiConnectOptions = {
  /**
   * Debugging options.
   */
  debug?: SubiConnectDebugOptions;

  /**
   * Sets the environment for the SubiConnect API.
   */
  environment?: SubiConnectEnvironment;

  /**
   * Whether or not to bypass the initialisation of the provider before
   * rendering the children. By default, Subi Connect will wait for the
   * initialisation process to complete before rendering the children.
   */
  bypassInitialisation?: boolean;

  /**
   * The context for the SubiConnect API. This can be something that uniquely
   * identifies the organisation—for example, the company ID or name.
   */
  context?: string;
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

export enum SubiConnectEnvironment {
  PRODUCTION = 'PRODUCTION',
  SANDBOX = 'SANDBOX',
}
