export type SubiConnectAccessToken = string;

export type SubiConnectConnectionFn = () => Promise<SubiConnectAccessToken>;

export const SUBI_CONNECT_QUERY_KEY = 'subi-connect';

export type SubiConnectCleanupProps = {
  /**
   * Keeps the access token and query cache.
   */
  keepData?: boolean;

  /**
   * Cleans up the access token and query cache for all contexts.
   */
  cleanupAllContexts?: boolean;
};

export type SubiConnectDebugOptions = {
  /**
   *
   */
  NODE_ENV?: 'development' | 'production';

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
