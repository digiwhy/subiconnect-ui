import { getAllEmployeesURL, getEmployeesFromOrganisationURL } from './paths';
import type { ListAllEmployeesOptions } from './types';
import axiosClient from '@/services/axios';
import type {
  ListOptions,
  PaginationResponse,
} from '@/types/components/data-table';
import type { Employee } from '@/types/employee';

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
  options?: ListAllEmployeesOptions,
): Promise<PaginationResponse<Employee>> => {
  const response = await axiosClient.get<PaginationResponse<Employee>>(
    getAllEmployeesURL(),
    options,
  );
  return response.data;
};
