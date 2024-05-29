import { constructAPIURL } from '..';

export const EMPLOYEES_URL = 'employee/';

export const getEmployeesFromOrganisationURL = (
  organisationId: number | string,
) => {
  return constructAPIURL(EMPLOYEES_URL + `${organisationId}/`);
};

export const getAllEmployeesURL = () => {
  return constructAPIURL(EMPLOYEES_URL);
};
