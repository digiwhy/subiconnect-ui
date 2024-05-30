import { constructAPIURL } from '..';
import type { Organisation } from '../../../types/organisation';
import axiosClient from '../../axios';
import { ORGANISATION_URL } from './paths';

export const getOrganisation = async (): Promise<Organisation> => {
  const response = await axiosClient.get<Organisation>(
    constructAPIURL(ORGANISATION_URL),
  );
  return response.data;
};
