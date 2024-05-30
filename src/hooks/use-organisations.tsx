import { listOrganisationsFromPayroll } from '../services/api/payroll/actions';
import type {
  PaginationResponse,
  ListOptions,
} from '../types/components/data-table';
import type { Organisation } from '../types/organisation';
import {
  useQuery,
  type UseQueryOptions,
  type UseQueryResult,
} from '@tanstack/react-query';
import React from 'react';

export type UseOrganisations = UseQueryResult<PaginationResponse<Organisation>>;

const BASE_ORGANISATIONS_QUERY_KEY = ['subi-connect', 'organisation'] as const;

type Options = Omit<
  UseQueryOptions<PaginationResponse<Organisation>>,
  'queryKey' | 'queryFn'
>;

export const useOrganisations = (
  payrollId: number | undefined,
  options?: Options,
): UseOrganisations => {
  const queryKey = React.useMemo(
    () => [...BASE_ORGANISATIONS_QUERY_KEY, 'list', { payrollId: payrollId }],
    [payrollId],
  );

  const queryFn = React.useCallback(
    async (options: ListOptions) =>
      await listOrganisationsFromPayroll(payrollId!, options),
    [payrollId],
  );

  return useQuery({
    queryKey: queryKey,
    queryFn: queryFn,
    enabled: !!payrollId,
    ...options,
  });
};

export const useOrganisation = (
  organisationId: number | undefined,
  options?: Options,
): UseOrganisations => {
  const queryKey = React.useMemo(
    () => [...BASE_ORGANISATIONS_QUERY_KEY, 'detail', organisationId],
    [organisationId],
  );

  const queryFn = React.useCallback(
    async (options: ListOptions) =>
      await listOrganisationsFromPayroll(organisationId!, options),
    [organisationId],
  );

  return useQuery({
    queryKey: queryKey,
    queryFn: queryFn,
    enabled: !!organisationId,
    ...options,
  });
};
