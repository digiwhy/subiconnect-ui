import { logOnDev } from '../../../lib/utils';
import type { InternalAxiosRequestConfig } from 'axios';

const onRequest = (
  config: InternalAxiosRequestConfig,
): InternalAxiosRequestConfig => {
  const { method, url } = config;

  logOnDev(`🚀 [API] ${method?.toUpperCase()} ${url} | Request`);

  if (method === 'get') {
    config.timeout = 15000;
  }
  return config;
};

export default onRequest;
