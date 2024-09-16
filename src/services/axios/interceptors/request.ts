import logger from '@/services/logger';
import type { InternalAxiosRequestConfig } from 'axios';

const onRequest = (
  config: InternalAxiosRequestConfig,
): InternalAxiosRequestConfig => {
  const { method, url } = config;

  logger.log(`[🚀 API] ${method?.toUpperCase()} ${url} | Request`);

  if (method === 'get') {
    config.timeout = 15000;
  }
  return config;
};

export default onRequest;
