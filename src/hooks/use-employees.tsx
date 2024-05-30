import { listEmployees } from '../services/api/employee/actions';
import type { Employee } from '../types/employee';
import { useCompany } from './use-company';
import { useQuery, type UseQueryResult } from '@tanstack/react-query';
import React from 'react';

export type UseEmployees = UseQueryResult<Array<Employee>>;

const BASE_EMPLOYEES_QUERY_KEY = ['subi-connect', 'employee', 'list'] as const;

export const useEmployees = (): UseEmployees => {
  const { data: company } = useCompany();

  const queryKey = React.useMemo(
    () => [...BASE_EMPLOYEES_QUERY_KEY, { companyId: company?.id }],
    [company?.id],
  );

  const queryFn = React.useCallback(
    () => listEmployees(company!.id),
    [company?.id],
  );

  return useQuery({
    queryKey: queryKey,
    queryFn: queryFn,
    enabled: !!company?.id,
  });
};
