import {
  SubiConnectEnvironment,
  type SubiConnectDebugOptions,
  type SubiConnectOptions,
} from '../types/main';
import { SUBI_CONNECT_SANDBOX_PUBLIC_BASE_URL } from '@/envs';
import type { ConnectionService } from '@/services/axios/connection-service';
import { Logger } from '@/services/logger';

type InternalInitialisationOptions = {
  connectionService: ConnectionService;
  logger: Logger;
};

/**
 * Handle all the debug options for the SubiConnectProvider.
 */
const handleDebugOptions = ({
  NODE_ENV,
  baseURL,
  disabledLogging = false,
  connectionService,
  logger,
}: SubiConnectDebugOptions & InternalInitialisationOptions) => {
  if (baseURL) connectionService.getHttpClient().defaults.baseURL = baseURL;
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
  connectionService,
  logger,
}: SubiConnectOptions & InternalInitialisationOptions) => {
  if (environment && environment === SubiConnectEnvironment.SANDBOX) {
    connectionService.getHttpClient().defaults.baseURL =
      SUBI_CONNECT_SANDBOX_PUBLIC_BASE_URL;
  }

  if (debug) {
    handleDebugOptions({ ...debug, connectionService, logger });
  }
};
