import { listConnectedPayrollSystems } from '../services/api/payroll/actions';
import type { AccountPayrollSystemExtended } from '../types/application';
import type { PaginationResponse } from '../types/components/data-table';
import { useCompany } from './use-company';
import { useQuery, type UseQueryOptions } from '@tanstack/react-query';
import React from 'react';

const BASE_PAYROLL_APPLICATION_QUERY_KEY = [
  'subi-connect',
  'payroll system',
  'list',
] as const;

type Options =
  | Omit<
      UseQueryOptions<PaginationResponse<AccountPayrollSystemExtended>>,
      'queryKey' | 'queryFn'
    >
  | undefined;

export const useConnectedPayrolls = (queryOptions?: Options) => {
  const { data: company } = useCompany();

  const queryKey = React.useMemo(
    () => [
      ...BASE_PAYROLL_APPLICATION_QUERY_KEY,
      { connected: true, companyId: company?.id },
    ],
    [company?.id],
  );

  const { enabled, ...rest } = queryOptions ?? { enabled: true };

  return useQuery({
    queryKey: queryKey,
    queryFn: listConnectedPayrollSystems,
    enabled: !!company?.id && enabled,
    ...rest,
  });
};
