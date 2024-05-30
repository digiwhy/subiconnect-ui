import { listPayrollSystems } from '../services/api/payroll/actions';
import type { AccountPayrollSystemExtended } from '../types/application';
import type { PaginationResponse } from '../types/components/data-table';
import type { BaseQueryOptions } from '../types/query';
import { useCompany } from './use-company';
import { useQuery, type UseQueryOptions } from '@tanstack/react-query';
import React from 'react';

const BASE_PAYROLL_APPLICATION_QUERY_KEY = [
  'subi-connect',
  'payroll system',
  'list',
] as const;

type UsePayrollSystemsOptions = BaseQueryOptions<
  UseQueryOptions<PaginationResponse<AccountPayrollSystemExtended>>
>;

export const usePayrollSystems = (options?: UsePayrollSystemsOptions) => {
  const { data: company } = useCompany();

  const queryKey = React.useMemo(
    () => [...BASE_PAYROLL_APPLICATION_QUERY_KEY, { companyId: company?.id }],
    [company?.id],
  );

  const { enabled, ...rest } = options ?? { enabled: true };

  return useQuery({
    queryKey: queryKey,
    queryFn: listPayrollSystems,
    enabled: !!company?.id && enabled,
    ...rest,
  });
};
