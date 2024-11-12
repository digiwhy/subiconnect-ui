import { useSubiConnectQuery } from './use-subi-connect-query';
import { useSubiConnectContext } from '@/context/subi-connect';
import {
  getCompany,
  getCompanyPayrollIntegrations,
} from '@/services/api/company/actions';
import type { Company } from '@/types/company';
import { SUBI_CONNECT_QUERY_KEY } from '@/types/main';
import type { Payroll } from '@/types/payroll';
import type { BaseQueryOptions } from '@/types/query';
import { type UseQueryOptions } from '@tanstack/react-query';

export const BASE_COMPANY_QUERY_KEY = 'company';

type UseCompanyOptions = {
  queryOptions?: BaseQueryOptions<UseQueryOptions<Company>>;
};

export const useCompany = (options?: UseCompanyOptions) => {
  const { connectionService } = useSubiConnectContext();

  /**
   * No need to add the company id to the query key because there will only be
   * one company in the context
   */
  const queryKey = [
    SUBI_CONNECT_QUERY_KEY,
    { context: connectionService.getContext() },
    BASE_COMPANY_QUERY_KEY,
    'detail',
  ] as const;

  return useSubiConnectQuery({
    queryKey: queryKey,
    queryFn: getCompany(connectionService),
    ...options?.queryOptions,
  });
};

const BASE_COMPANY_PAYROLL_INTEGRATIONS_QUERY_KEY =
  'company-payroll-integrations';

type UseCompanyPayrollIntegrationsOptions = {
  queryOptions?: BaseQueryOptions<UseQueryOptions<Payroll[] | null>>;
};

export const useCompanyPayrollIntegrations = (
  options?: UseCompanyPayrollIntegrationsOptions,
) => {
  const { connectionService } = useSubiConnectContext();

  const queryKey = [
    SUBI_CONNECT_QUERY_KEY,
    { context: connectionService.getContext() },
    BASE_COMPANY_PAYROLL_INTEGRATIONS_QUERY_KEY,
  ] as const;

  return useSubiConnectQuery({
    queryKey: queryKey,
    queryFn: getCompanyPayrollIntegrations(connectionService),
    ...options?.queryOptions,
  });
};
