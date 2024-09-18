import { listAllEmployees } from '../services/api/employee/actions';
import type { EmployeeFilterFields } from '../services/api/employee/types';
import type {
  ListOptions,
  PaginationResponse,
} from '../types/components/data-table';
import type { Employee, SelectableEmployeeColumns } from '../types/employee';
import type { BaseQueryOptions } from '../types/query';
import type { DeepPartial } from '../types/utils';
import { useSubiConnectQuery } from './use-subi-connect-query';
import ConnectionService from '@/services/axios/connection-service';
import { type UseQueryOptions } from '@tanstack/react-query';
import React from 'react';

const BASE_EMPLOYEES_QUERY_KEY = [
  'subi-connect',
  { context: ConnectionService.getInstance().getContext() },
  'employee',
] as const;

type UseEmployeesOptions = {
  fields?: SelectableEmployeeColumns[];
  filters?: DeepPartial<EmployeeFilterFields>;
  listOptions?: ListOptions;
  queryOptions?: BaseQueryOptions<
    UseQueryOptions<PaginationResponse<Employee>>
  >;
};

export const useEmployees = (options?: UseEmployeesOptions) => {
  const params = React.useMemo(
    () => ({
      ...options?.listOptions?.params,
      ...options?.filters,
      fields: options?.fields,
    }),
    [options?.listOptions?.params, options?.filters],
  );

  const queryKey = React.useMemo(
    () => [
      ...BASE_EMPLOYEES_QUERY_KEY,
      'list',
      {
        filters: params,
      },
    ],
    [params],
  );

  const queryFn = React.useCallback(
    async () =>
      listAllEmployees({
        ...options?.listOptions,
        params: params,
      }),
    [options?.listOptions, params],
  );

  return useSubiConnectQuery({
    queryKey: queryKey,
    queryFn: queryFn,
    ...options?.queryOptions,
  });
};
