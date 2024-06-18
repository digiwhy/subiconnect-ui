import { getCompany } from '../services/api/company/actions';
import type { Company } from '../types/company';
import type { BaseQueryOptions } from '../types/query';
import { useQuery, type UseQueryOptions } from '@tanstack/react-query';

const BASE_COMPANY_QUERY_KEY = ['subi-connect', 'company'] as const;

type UseCompanyOptions = {
  queryOptions?: BaseQueryOptions<UseQueryOptions<Company>>;
};

export const useCompany = (options?: UseCompanyOptions) => {
  // No need to add the company id to the query key because there will only be
  // one company in the context
  const queryKey = [...BASE_COMPANY_QUERY_KEY, 'detail'] as const;
  return useQuery({
    queryKey: queryKey,
    queryFn: getCompany,
    ...options?.queryOptions,
  });
};
