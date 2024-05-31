import type {
  ListOptions,
  PaginationResponse,
} from '../../../types/components/data-table';
import type { Employee } from '../../../types/employee';
import axiosClient from '../../axios';
import { getAllEmployeesURL, getEmployeesFromOrganisationURL } from './paths';

/**
 * List all the employees for a company within a given organisation.
 * @param organisationId the id of the organisation.
 */
export const listEmployees = async (
  organisationId: number | string,
  options?: ListOptions,
): Promise<PaginationResponse<Employee>> => {
  const response = await axiosClient.get<PaginationResponse<Employee>>(
    getEmployeesFromOrganisationURL(organisationId),
    options,
  );
  return response.data;
};

/**
 * List all the employees for a company in all connected organisations.
 */
export const listAllEmployees = async (
  options?: ListOptions,
): Promise<PaginationResponse<Employee>> => {
  const response = await axiosClient.get<PaginationResponse<Employee>>(
    getAllEmployeesURL(),
    options,
  );
  return response.data;
};
