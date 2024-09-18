import {
  getCompany,
  getCompanyPayrollIntegrations,
} from '../services/api/company/actions';
import { SUBI_CONNECT_QUERY_KEY, type Payroll } from '../types';
import type { Company } from '../types/company';
import type { BaseQueryOptions } from '../types/query';
import { useSubiConnectQuery } from './use-subi-connect-query';
import ConnectionService from '@/services/axios/connection-service';
import { type UseQueryOptions } from '@tanstack/react-query';

const BASE_COMPANY_QUERY_KEY = 'company';

type UseCompanyOptions = {
  queryOptions?: BaseQueryOptions<UseQueryOptions<Company>>;
};

export const useCompany = (options?: UseCompanyOptions) => {
  /**
   * No need to add the company id to the query key because there will only be
   * one company in the context
   */
  const queryKey = [
    SUBI_CONNECT_QUERY_KEY,
    { context: ConnectionService.getInstance().getContext() },
    BASE_COMPANY_QUERY_KEY,
    'detail',
  ] as const;
  return useSubiConnectQuery({
    queryKey: queryKey,
    queryFn: getCompany,
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
  const queryKey = [
    SUBI_CONNECT_QUERY_KEY,
    { context: ConnectionService.getInstance().getContext() },
    BASE_COMPANY_PAYROLL_INTEGRATIONS_QUERY_KEY,
  ] as const;
  return useSubiConnectQuery({
    queryKey: queryKey,
    queryFn: getCompanyPayrollIntegrations,
    ...options?.queryOptions,
  });
};
