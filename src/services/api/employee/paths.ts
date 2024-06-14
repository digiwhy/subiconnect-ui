import { constructAPIURL } from '..';
import type { EmployeeAllowedSelectProps } from './types';

export const EMPLOYEES_URL = 'employee';

export const getEmployeesFromOrganisationURL = (
  organisationId: number | string,
) => {
  return constructAPIURL(EMPLOYEES_URL + `${organisationId}/`);
};

export const getAllEmployeesURL = (
  selectedFields?: EmployeeAllowedSelectProps[],
) => {
  const fieldsQuery = selectedFields && `fields=${selectedFields?.join(',')}`;
  const endpointQuery = fieldsQuery ? `?${fieldsQuery}` : '';

  const endpointPath = `${EMPLOYEES_URL}${endpointQuery}`;

  return constructAPIURL(endpointPath);
};
