import type { Organisation } from '../../../types/organisation';
import axiosClient from '../../axios';
import { getOrganisationURL } from './paths';

export const getOrganisation = async (
  organisationId: number | string,
): Promise<Organisation> => {
  const response = await axiosClient.get<Organisation>(
    getOrganisationURL(organisationId),
  );
  return response.data;
};
