import { useCompany } from './use-company';
import { BASE_PAYROLL_APPLICATION_QUERY_KEY } from './use-payroll-systems';
import { useSubiConnectQuery } from './use-subi-connect-query';
import { useSubiConnectContext } from '@/context/subi-connect';
import { listConnectedPayrollSystems } from '@/services/api/payroll/actions';
import type { AccountPayrollSystemExtended } from '@/types/application';
import type { PaginationResponse } from '@/types/components/data-table';
import { SUBI_CONNECT_QUERY_KEY } from '@/types/main';
import type { BaseQueryOptions } from '@/types/query';
import { type UseQueryOptions } from '@tanstack/react-query';

type UseConnectedPayrollsOptions = {
  queryOptions?: BaseQueryOptions<
    UseQueryOptions<PaginationResponse<AccountPayrollSystemExtended>>
  >;
};

export const useConnectedPayrolls = (options?: UseConnectedPayrollsOptions) => {
  const { connectionService } = useSubiConnectContext();

  const { data: company } = useCompany();

  const queryKey = [
    SUBI_CONNECT_QUERY_KEY,
    { context: connectionService.getContext() },
    BASE_PAYROLL_APPLICATION_QUERY_KEY,
    'list',
    {
      connected: true,
      companyId: company?.id,
    },
  ];

  const { enabled, ...rest } = options?.queryOptions ?? { enabled: true };

  return useSubiConnectQuery({
    queryKey: queryKey,
    queryFn: listConnectedPayrollSystems(connectionService),
    enabled: !!company?.id && enabled,
    ...rest,
  });
};
