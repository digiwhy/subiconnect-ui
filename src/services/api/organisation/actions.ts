import { constructAPIURL } from '..';
import { ORGANISATION_URL } from './paths';
import axiosClient from '@/services/axios';
import type { Organisation } from '@/types/organisation';

export const getOrganisation = async (): Promise<Organisation> => {
  const response = await axiosClient.get<Organisation>(
    constructAPIURL(ORGANISATION_URL),
  );
  return response.data;
};
