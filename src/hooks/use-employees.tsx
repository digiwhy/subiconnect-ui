import { listAllEmployees } from '../services/api/employee/actions';
import type {
  ListOptions,
  PaginationResponse,
} from '../types/components/data-table';
import type { Employee } from '../types/employee';
import type { BaseQueryOptions } from '../types/query';
import { useQuery, type UseQueryOptions } from '@tanstack/react-query';
import React from 'react';

const BASE_EMPLOYEES_QUERY_KEY = ['subi-connect', 'employee', 'list'] as const;

type EmployeeFilterFields = Pick<
  Employee,
  'firstName' | 'lastName' | 'organisationId'
>;

type UseEmployeesOptions = {
  filters?: Partial<EmployeeFilterFields>;
  queryOptions?: BaseQueryOptions<
    UseQueryOptions<PaginationResponse<Employee>>
  >;
};
export const useEmployees = (options?: UseEmployeesOptions) => {
  const queryFn = React.useCallback(
    async (listOptions: ListOptions) =>
      listAllEmployees({
        ...listOptions,
        params: {
          ...listOptions.params,
          ...options?.filters,
        },
      }),
    [options],
  );

  return useQuery({
    queryKey: BASE_EMPLOYEES_QUERY_KEY,
    queryFn: queryFn,
    ...options?.queryOptions,
  });
};
