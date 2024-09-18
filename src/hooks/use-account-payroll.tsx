import { getAccountPayroll } from '../services/api/payroll/actions';
import type { AccountPayrollSystemExtended } from '../types/application';
import type { Payroll } from '../types/payroll';
import type { BaseQueryOptions } from '../types/query';
import { BASE_PAYROLL_APPLICATION_QUERY_KEY } from './use-payroll-systems';
import { useSubiConnectQuery } from './use-subi-connect-query';
import ConnectionService from '@/services/axios/connection-service';
import { SUBI_CONNECT_QUERY_KEY } from '@/types/main';
import type { UseQueryOptions } from '@tanstack/react-query';
import React from 'react';

type UsePayrollSystemsOptions = {
  queryOptions?: BaseQueryOptions<
    UseQueryOptions<AccountPayrollSystemExtended>
  >;
};

export const useAccountPayrollSystem = (
  payroll: Payroll,
  options?: UsePayrollSystemsOptions,
) => {
  const queryKey = React.useMemo(
    () => [
      SUBI_CONNECT_QUERY_KEY,
      { context: ConnectionService.getInstance().getContext() },
      BASE_PAYROLL_APPLICATION_QUERY_KEY,
      'detail',
      payroll,
    ],
    [payroll],
  );

  const queryFn = React.useCallback(
    async () => getAccountPayroll({ payroll }),
    [payroll],
  );

  return useSubiConnectQuery({
    queryKey: queryKey,
    queryFn: queryFn,
    ...options?.queryOptions,
  });
};
