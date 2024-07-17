import axiosClient from '../services/axios';
import logger from '../services/logger';
import type { SubiConnectOptions } from '../types/main';

/**
 * Handle all the debug options for the SubiConnectProvider.
 */
const handleDebugOptions = ({
  baseURL,
  disabledLogging,
}: SubiConnectOptions['debug']) => {
  if (baseURL) axiosClient.defaults.baseURL = baseURL;
  logger.setEnabled(!disabledLogging);
};

/**
 * Handle all the options for the SubiConnectProvider.
 */
export const handleProviderOptions = ({ debug }: SubiConnectOptions) => {
  if (debug) handleDebugOptions(debug);
};
