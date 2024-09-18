import { type InternalAxiosRequestConfig as PrimativeInternalAxiosRequestConfig } from 'axios';

export type InternalAxiosRequestConfig = PrimativeInternalAxiosRequestConfig & {
  _retry?: boolean;
};

export type ConnectionServiceResetOptions = {
  keepAccessToken?: boolean;
};
