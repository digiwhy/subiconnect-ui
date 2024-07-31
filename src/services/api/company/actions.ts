import { constructAPIURL } from '..';
import type { Company } from '../../../types/company';
import axiosClient from '../../axios';
import logger from '../../logger';
import { COMPANY_URL } from './paths';

/**
 * Gets the company that is attached to the authorisation headers.
 */
export const getCompany = async (): Promise<Company> => {
  logger.log('[API] GET /company', {
    headers: axiosClient.defaults.headers,
    baseURL: axiosClient.defaults.baseURL,
  });

  const response = await axiosClient.get<Company>(constructAPIURL(COMPANY_URL));
  return response.data;
};
