import {
  SubiConnectEnvironment,
  type SubiConnectDebugOptions,
  type SubiConnectOptions,
} from '../types/main';
import { SUBI_CONNECT_SANDBOX_PUBLIC_BASE_URL } from '@/envs';
import { Logger } from '@/services/logger';
import type { AxiosInstance } from 'axios';

type InternalInitialisationOptions = {
  httpClient: AxiosInstance;
  logger: Logger;
};

/**
 * Handle all the debug options for the SubiConnectProvider.
 */
const handleDebugOptions = ({
  NODE_ENV,
  baseURL,
  disabledLogging = false,
  httpClient,
  logger,
}: SubiConnectDebugOptions & InternalInitialisationOptions) => {
  if (baseURL) httpClient.defaults.baseURL = baseURL;
  logger.initialise({
    env: NODE_ENV,
    enabled: !disabledLogging,
  });
};

/**
 * Handle all the options for the SubiConnectProvider.
 */
export const handleProviderOptions = ({
  debug,
  environment,
  httpClient,
  logger,
}: SubiConnectOptions & InternalInitialisationOptions) => {
  if (environment && environment === SubiConnectEnvironment.SANDBOX) {
    httpClient.defaults.baseURL = SUBI_CONNECT_SANDBOX_PUBLIC_BASE_URL;
  }

  if (debug) {
    handleDebugOptions({ ...debug, httpClient, logger });
  }
};
