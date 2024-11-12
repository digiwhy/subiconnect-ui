import { useSubiConnectQuery } from './use-subi-connect-query';
import { useSubiConnectContext } from '@/context/subi-connect';
import { listAllEmployees } from '@/services/api/employee/actions';
import type { EmployeeFilterFields } from '@/services/api/employee/types';
import type {
  ListOptions,
  PaginationResponse,
} from '@/types/components/data-table';
import type { Employee, SelectableEmployeeColumns } from '@/types/employee';
import { SUBI_CONNECT_QUERY_KEY } from '@/types/main';
import type { BaseQueryOptions } from '@/types/query';
import type { DeepPartial } from '@/types/utils';
import { type UseQueryOptions } from '@tanstack/react-query';
import React from 'react';

const BASE_EMPLOYEES_QUERY_KEY = 'employee';

type UseEmployeesOptions = {
  fields?: SelectableEmployeeColumns[];
  filters?: DeepPartial<EmployeeFilterFields>;
  listOptions?: ListOptions;
  queryOptions?: BaseQueryOptions<
    UseQueryOptions<PaginationResponse<Employee>>
  >;
};

export const useEmployees = (options?: UseEmployeesOptions) => {
  const { connectionService } = useSubiConnectContext();

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
      SUBI_CONNECT_QUERY_KEY,
      { context: connectionService.getContext() },
      BASE_EMPLOYEES_QUERY_KEY,
      'list',
      {
        filters: params,
      },
    ],
    [params, connectionService.getContext()],
  );

  const queryFn = React.useCallback(
    async () =>
      listAllEmployees(connectionService)({
        ...options?.listOptions,
        params: params,
      }),
    [options?.listOptions, params, connectionService],
  );

  return useSubiConnectQuery({
    queryKey: queryKey,
    queryFn: queryFn,
    ...options?.queryOptions,
  });
};
