import { constructAPIURL } from '..';
import axiosClient from '../../axios';
import { COMPANY_URL } from './paths';
import type { Company } from '@/types/company';

/**
 * Gets the company that is attached to the authorisation headers.
 */
export const getCompany = async (): Promise<Company> => {
  const response = await axiosClient.get<Company>(constructAPIURL(COMPANY_URL));
  return response.data;
};
