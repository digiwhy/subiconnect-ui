import { getOrganisationURL } from './paths';
import axiosClient from '@/services/axios';
import type { Organisation } from '@/types/organisation';

export const getOrganisation = async (
  organisationId: number | string,
): Promise<Organisation> => {
  const response = await axiosClient.get<Organisation>(
    getOrganisationURL(organisationId),
  );
  return response.data;
};
