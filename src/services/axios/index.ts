import axiosClient from './config';
import onErrorResponse from './interceptors/error';
import onRequest from './interceptors/request';
import onResponse from './interceptors/response';

axiosClient.interceptors.request.use(onRequest, onErrorResponse);
axiosClient.interceptors.response.use(onResponse, onErrorResponse);

export default axiosClient;
