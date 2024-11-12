import { BASE_PAYROLL_APPLICATION_QUERY_KEY } from './use-payroll-systems';
import { useSubiConnectQuery } from './use-subi-connect-query';
import { useSubiConnectContext } from '@/context/subi-connect';
import { getAccountPayroll } from '@/services/api/payroll/actions';
import type { AccountPayrollSystemExtended } from '@/types/application';
import { SUBI_CONNECT_QUERY_KEY } from '@/types/main';
import type { Payroll } from '@/types/payroll';
import type { BaseQueryOptions } from '@/types/query';
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
  const { connectionService } = useSubiConnectContext();

  const queryKey = React.useMemo(
    () => [
      SUBI_CONNECT_QUERY_KEY,
      { context: connectionService.getContext() },
      BASE_PAYROLL_APPLICATION_QUERY_KEY,
      'detail',
      payroll,
    ],
    [payroll, connectionService.getContext()],
  );

  const queryFn = React.useCallback(
    () => getAccountPayroll(connectionService)({ payroll }),
    [payroll, connectionService],
  );

  return useSubiConnectQuery({
    queryKey: queryKey,
    queryFn: queryFn,
    ...options?.queryOptions,
  });
};
