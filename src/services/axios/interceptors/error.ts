import { logOnDev } from '../../../lib/utils';
import axiosClient from '../config';
import ConnectionService from '../connection-service';
import type { InternalAxiosRequestConfig } from '../types';
import { getAccessToken } from '../utils/get-token';
import axios, { AxiosError, type AxiosResponse } from 'axios';

const onErrorResponse = async (
  error: AxiosError | Error,
): Promise<AxiosResponse> => {
  /* Error other than axios. */
  if (!axios.isAxiosError(error)) {
    logOnDev(`🚨 [API] | Non-Axios Error: ${error.message}`);
    return Promise.reject(error);
  }

  const { config, response } = error;
  const originalRequest = error.config as InternalAxiosRequestConfig;
  const { method, url } = originalRequest;
  const statusCode = response?.status;
  const statusText = response?.statusText;

  logOnDev(
    `🚨 [API] ${method?.toUpperCase()} ${url} | Error: ${statusCode} ${statusText}`,
    error,
  );

  if (response === undefined) {
    logOnDev('Undefined response ERROR:', error);
    return Promise.reject(error);
  }

  if (config === undefined) {
    logOnDev('Undefined config ERROR:', error);
    return Promise.reject(error);
  }

  /* Go through the different status codes */
  switch (statusCode) {
    case 401:
      // Check if the response status code is 401 and the token has not been refreshed yet
      if (!originalRequest._retry) {
        originalRequest._retry = true; // Mark it so that we don't try to retry forever
        const connectionService = ConnectionService.getInstance();
        const connectionFn = connectionService.getConnectionFn();

        // If the axios client was used outside the Subi Connect Provider.
        if (!connectionFn) {
          break;
        }

        const newToken = await getAccessToken(connectionFn);

        if (!newToken) {
          break;
        }

        // Update the token in Axios defaults
        axiosClient.defaults.headers.common['Authorization'] =
          `Bearer ${newToken}`;
        // Update the token on the original request
        originalRequest.headers['Authorization'] = `Bearer ${newToken}`;

        // Return Axios to retry the original request with the new token
        return axiosClient(originalRequest);
      }
      break;
    case 403:
      // Handle "Permission Denied" globally if needed
      break;
    case 404:
      // Handle "Not Found" globally if needed
      break;
    case 500:
      // Handle "Server Error" globally if needed
      break;
    default:
      // Handle other errors globally if needed
      break;
  }

  return Promise.reject(error);
};

export default onErrorResponse;
