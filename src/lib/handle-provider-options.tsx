import logger from '../services/logger';
import type {
  SubiConnectDebugOptions,
  SubiConnectOptions,
} from '../types/main';
import type { ConnectionService } from '@/services/axios/connection-service';

/**
 * Handle all the debug options for the SubiConnectProvider.
 */
const handleDebugOptions = ({
  NODE_ENV,
  baseURL,
  disabledLogging,
  connectionService,
}: SubiConnectDebugOptions & { connectionService: ConnectionService }) => {
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
  connectionService,
}: SubiConnectOptions & { connectionService: ConnectionService }) => {
  if (debug) handleDebugOptions({ ...debug, connectionService });
};
