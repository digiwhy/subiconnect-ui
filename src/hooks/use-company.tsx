import { getCompany } from '../services/api/company/actions';
import type { Company } from '../types/company';
import type { BaseQueryOptions } from '../types/query';
import {
  useQuery,
  type UndefinedInitialDataOptions,
  type UseQueryResult,
} from '@tanstack/react-query';

export type UseCompany = UseQueryResult<Company>;
type UseCompanyOptions = BaseQueryOptions<UndefinedInitialDataOptions<Company>>;

const BASE_EMPLOYEES_QUERY_KEY = ['subi-connect', 'company', 'detail'] as const;

export const useCompany = (options?: UseCompanyOptions): UseCompany => {
  return useQuery({
    queryKey: BASE_EMPLOYEES_QUERY_KEY,
    queryFn: getCompany,
    ...options,
  });
};
