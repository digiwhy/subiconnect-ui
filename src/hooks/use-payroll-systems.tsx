import { listPayrollSystems } from '../services/api/payroll/actions';
import type { AccountPayrollSystemExtended } from '../types/application';
import type { PaginationResponse } from '../types/components/data-table';
import type { BaseQueryOptions } from '../types/query';
import { useCompany } from './use-company';
import { useQuery, type UseQueryOptions } from '@tanstack/react-query';
import React from 'react';

export const BASE_PAYROLL_APPLICATION_QUERY_KEY = [
  'subi-connect',
  'payroll system',
] as const;

type UsePayrollSystemsOptions = {
  queryOptions?: BaseQueryOptions<
    UseQueryOptions<PaginationResponse<AccountPayrollSystemExtended>>
  >;
};

export const usePayrollSystems = (options?: UsePayrollSystemsOptions) => {
  const { data: company } = useCompany();

  const queryKey = React.useMemo(
    () => [
      ...BASE_PAYROLL_APPLICATION_QUERY_KEY,
      'list',
      { companyId: company?.id },
    ],
    [company?.id],
  );

  const { enabled, ...restOfQueryOptions } = options?.queryOptions ?? {
    enabled: true,
  };

  return useQuery({
    queryKey: queryKey,
    queryFn: listPayrollSystems,
    enabled: !!company?.id && enabled,
    ...restOfQueryOptions,
  });
};
