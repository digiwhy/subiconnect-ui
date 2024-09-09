import logger from '@/services/logger';
import type { AxiosResponse } from 'axios';

const onResponse = (response: AxiosResponse): AxiosResponse => {
  const { method, url } = response.config;
  const { status } = response;
  logger.log(`[🚀 API] ${method?.toUpperCase()} ${url} | Response ${status}`, {
    response,
  });

  return response;
};

export default onResponse;
