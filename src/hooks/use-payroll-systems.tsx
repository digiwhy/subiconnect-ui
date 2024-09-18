import { listPayrollSystems } from '../services/api/payroll/actions';
import type { AccountPayrollSystemExtended } from '../types/application';
import type {
  ListOptions,
  PaginationResponse,
} from '../types/components/data-table';
import type { BaseQueryOptions } from '../types/query';
import { useSubiConnectQuery } from './use-subi-connect-query';
import ConnectionService from '@/services/axios/connection-service';
import { type UseQueryOptions } from '@tanstack/react-query';
import React from 'react';

export const BASE_PAYROLL_APPLICATION_QUERY_KEY = [
  'subi-connect',
  'payroll system',
] as const;

type PayrollSystemFields = Pick<
  AccountPayrollSystemExtended,
  'name' | 'payrollConnectionType' | 'isConnected'
>;

type UsePayrollSystemsOptions = {
  filters?: PayrollSystemFields;
  listOptions?: ListOptions;
  queryOptions?: BaseQueryOptions<
    UseQueryOptions<PaginationResponse<AccountPayrollSystemExtended>>
  >;
};

export const usePayrollSystems = (options?: UsePayrollSystemsOptions) => {
  const params = React.useMemo(
    () => ({
      ...options?.listOptions?.params,
      ...options?.filters,
    }),
    [options?.listOptions?.params, options?.filters],
  );

  const queryKey = React.useMemo(
    () => [
      ...BASE_PAYROLL_APPLICATION_QUERY_KEY,
      'list',
      {
        filters: params,
        context: ConnectionService.getInstance().getContext(),
      },
    ],
    [params],
  );

  const queryFn = React.useCallback(
    () =>
      listPayrollSystems({
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
