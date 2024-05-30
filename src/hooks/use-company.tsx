import { getCompany } from '../services/api/company/actions';
import type { Company } from '../types/company';
import {
  useQuery,
  type UndefinedInitialDataOptions,
  type UseQueryResult,
} from '@tanstack/react-query';

export type UseCompany = UseQueryResult<Company>;
type BaseQueryOptions<T> = Omit<T, 'queryKey' | 'queryFn'>;
type Options = BaseQueryOptions<UndefinedInitialDataOptions<Company>>;

const BASE_EMPLOYEES_QUERY_KEY = ['subi-connect', 'company', 'detail'] as const;

export const useCompany = (options?: Options): UseCompany => {
  return useQuery({
    queryKey: BASE_EMPLOYEES_QUERY_KEY,
    queryFn: getCompany,
    ...options,
  });
};
