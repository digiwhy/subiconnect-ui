import { useCompany } from './company/use-company';
import { listPayrollSystems } from '@/services/api/payroll/actions';
import type { AccountPayrollSystemExtended } from '@/types/application';
import type { PaginationResponse } from '@/types/components/data-table';
import { useQuery, type UseQueryOptions } from '@tanstack/react-query';
import React from 'react';

const BASE_PAYROLL_APPLICATION_QUERY_KEY = [
  'subi-connect',
  'payroll system',
  'list',
] as const;

type Options = Omit<
  UseQueryOptions<PaginationResponse<AccountPayrollSystemExtended>>,
  'queryKey' | 'queryFn'
>;

export const usePayrollSystems = (queryOptions?: Options) => {
  const { data: company } = useCompany();

  const queryKey = React.useMemo(
    () => [...BASE_PAYROLL_APPLICATION_QUERY_KEY, { companyId: company?.id }],
    [company?.id],
  );

  const { enabled, ...rest } = queryOptions ?? { enabled: true };

  return useQuery({
    queryKey: queryKey,
    queryFn: listPayrollSystems,
    enabled: !!company?.id && enabled,
    ...rest,
  });
};
