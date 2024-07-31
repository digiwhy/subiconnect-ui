import { constructAPIURL } from '..';
import { ACCESS_TOKEN_NAME } from '../../../constants';
import type { Company } from '../../../types/company';
import axiosClient from '../../axios';
import { COMPANY_URL } from './paths';

/**
 * Gets the company that is attached to the authorisation headers.
 */
export const getCompany = async (): Promise<Company> => {
  const accessToken = localStorage.getItem(ACCESS_TOKEN_NAME);
  const response = await axiosClient.get<Company>(
    constructAPIURL(COMPANY_URL),
    { headers: { Authorization: `Bearer ${accessToken}` } },
  );
  return response.data;
};
