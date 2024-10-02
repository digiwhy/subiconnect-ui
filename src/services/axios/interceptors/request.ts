import type { ILogger } from '@/services/logger/ILogger';
import type { InternalAxiosRequestConfig } from 'axios';

const onRequest =
  ({ logger }: { logger: ILogger }) =>
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    const { method, url } = config;

    logger.log(`[🚀 API] ${method?.toUpperCase()} ${url} | Request`);

    if (method === 'get') {
      config.timeout = 15000;
    }
    return config;
  };

export default onRequest;
