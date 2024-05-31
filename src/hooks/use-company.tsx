import { getCompany } from '../services/api/company/actions';
import type { Company } from '../types/company';
import type { BaseQueryOptions } from '../types/query';
import { useQuery, type UseQueryOptions } from '@tanstack/react-query';

const BASE_EMPLOYEES_QUERY_KEY = ['subi-connect', 'company', 'detail'] as const;

type UseCompanyOptions = {
  queryOptions?: BaseQueryOptions<UseQueryOptions<Company>>;
};

export const useCompany = (options?: UseCompanyOptions) => {
  return useQuery({
    queryKey: BASE_EMPLOYEES_QUERY_KEY,
    queryFn: getCompany,
    ...options?.queryOptions,
  });
};
