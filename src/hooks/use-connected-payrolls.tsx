import { listConnectedPayrollSystems } from '../services/api/payroll/actions';
import type { AccountPayrollSystemExtended } from '../types/application';
import type { PaginationResponse } from '../types/components/data-table';
import type { BaseQueryOptions } from '../types/query';
import { useCompany } from './use-company';
import { BASE_PAYROLL_APPLICATION_QUERY_KEY } from './use-payroll-systems';
import { useSubiConnectQuery } from './use-subi-connect-query';
import { type UseQueryOptions } from '@tanstack/react-query';
import React from 'react';

type UseConnectedPayrollsOptions = {
  queryOptions?: BaseQueryOptions<
    UseQueryOptions<PaginationResponse<AccountPayrollSystemExtended>>
  >;
};

export const useConnectedPayrolls = (options?: UseConnectedPayrollsOptions) => {
  const { data: company } = useCompany();

  const queryKey = React.useMemo(
    () => [
      ...BASE_PAYROLL_APPLICATION_QUERY_KEY,
      'list',
      { connected: true, companyId: company?.id },
    ],
    [company?.id],
  );

  const { enabled, ...rest } = options?.queryOptions ?? { enabled: true };

  return useSubiConnectQuery({
    queryKey: queryKey,
    queryFn: listConnectedPayrollSystems,
    enabled: !!company?.id && enabled,
    ...rest,
  });
};
