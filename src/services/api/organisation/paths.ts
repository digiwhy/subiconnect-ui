import { constructAPIURL } from '..';

export const ORGANISATION_URL = 'organisation/';

export const getOrganisationURL = (organisationId: number | string) =>
  constructAPIURL(`${ORGANISATION_URL}${organisationId}/`);
