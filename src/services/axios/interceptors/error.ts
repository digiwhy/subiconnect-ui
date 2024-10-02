import type { ConnectionService } from '../connection-service';
import type { InternalAxiosRequestConfig } from '../types';
import type { ILogger } from '@/services/logger/ILogger';
import axios, { AxiosError, type AxiosResponse } from 'axios';

const onErrorResponse =
  ({
    connectionService,
    logger,
  }: {
    connectionService: ConnectionService;
    logger: ILogger;
  }) =>
  async (error: AxiosError | Error): Promise<AxiosResponse> => {
    /* Error other than axios. */
    if (!axios.isAxiosError(error)) {
      logger.error(`[🚨 API] | Non-Axios Error: ${error.message}`, error);
      return Promise.reject(error);
    }

    const { config, response } = error;
    const originalRequest = error.config as InternalAxiosRequestConfig;
    const { method, url } = originalRequest;
    const statusCode = response?.status;
    const statusText = response?.statusText;

    logger.error(
      `[🚨 API] ${method?.toUpperCase()} ${url} | Error: ${statusCode} ${statusText}`,
      error,
    );

    if (response === undefined) {
      logger.error('[🚨 API] Undefined _response_ ERROR:', error);
      return Promise.reject(error);
    }

    if (config === undefined) {
      logger.error('[🚨 API] Undefined _config_ ERROR:', error);
      return Promise.reject(error);
    }

    /* Go through the different status codes */
    // Check if the response status code is 401 and the token has not been refreshed yet
    if (statusCode === 401) {
      // Check if the request has not been retried yet
      if (!originalRequest._retry) {
        originalRequest._retry = true; // Mark it so that we don't try to retry forever
        const connectionFn = connectionService.getConnectionFn();

        if (!connectionFn) {
          return Promise.reject(error);
        }

        let newToken: string | null = null;

        try {
          newToken = await connectionFn();
        } catch (error) {
          logger.error(
            '[getAccessToken] Error getting new token',
            error as Error,
          );
          return Promise.reject(error as Error);
        }

        if (!newToken) {
          return Promise.reject(error);
        }

        // Update the token in Axios defaults
        connectionService.getHttpClient().defaults.headers.common[
          'Authorization'
        ] = `Bearer ${newToken}`;
        // Update the token on the original request
        originalRequest.headers['Authorization'] = `Bearer ${newToken}`;

        // Return Axios to retry the original request with the new token
        return connectionService.getHttpClient()(originalRequest);
      }
    }

    return Promise.reject(error);
  };

export default onErrorResponse;
