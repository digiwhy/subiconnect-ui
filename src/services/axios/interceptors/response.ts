import type { ILogger } from '@/services/logger/ILogger';
import type { AxiosResponse } from 'axios';

const onResponse =
  ({ logger }: { logger: ILogger }) =>
  (response: AxiosResponse): AxiosResponse => {
    const { method, url } = response.config;
    const { status } = response;
    logger.log(
      `[🚀 API] ${method?.toUpperCase()} ${url} | Response ${status}`,
      {
        response,
      },
    );

    return response;
  };

export default onResponse;
