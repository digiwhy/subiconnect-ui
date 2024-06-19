import { getOrganisation } from '../services/api/organisation/actions';
import {
  listAllOrganisations,
  listOrganisationsFromPayroll,
  listSyncingOrganisations,
} from '../services/api/payroll/actions';
import type {
  AllOrganinisationsResponse,
  FindAllSyncingOrganisationsByCompanyIdResult,
} from '../services/api/payroll/types';
import type {
  PaginationResponse,
  ListOptions,
} from '../types/components/data-table';
import type { Organisation } from '../types/organisation';
import type { BaseQueryOptions } from '../types/query';
import { useQuery, type UseQueryOptions } from '@tanstack/react-query';
import React from 'react';

export const BASE_ORGANISATION_QUERY_KEY = [
  'subi-connect',
  'organisation',
] as const;

type OrganisationFilterFields = Pick<
  Organisation,
  'name' | 'lastSynced' | 'dateConnected' | 'numberOfEmployees' | 'syncStatus'
>;

type UseOrganisationsOptions = {
  filters?: OrganisationFilterFields;
  listOptions?: ListOptions;
  queryOptions?: BaseQueryOptions<
    UseQueryOptions<PaginationResponse<Organisation>>
  >;
};

export const useOrganisations = (
  accountPayrollId: number | undefined,
  options?: UseOrganisationsOptions,
) => {
  const params = React.useMemo(
    () => ({
      ...options?.listOptions?.params,
      ...options?.filters,
    }),
    [options?.listOptions?.params, options?.filters],
  );

  const queryKey = React.useMemo(
    () => [
      ...BASE_ORGANISATION_QUERY_KEY,
      'list',
      { accountPayrollId, filters: params },
    ],
    [accountPayrollId, params],
  );

  const queryFn = React.useCallback(
    () =>
      listOrganisationsFromPayroll(accountPayrollId!, {
        ...options?.listOptions,
        params: params,
      }),
    [accountPayrollId, options?.listOptions, params],
  );

  const { enabled, ...restOfQueryOptions } = options?.queryOptions ?? {
    enabled: true,
  };

  return useQuery({
    queryKey: queryKey,
    queryFn: queryFn,
    enabled: !!accountPayrollId && enabled,
    ...restOfQueryOptions,
  });
};

type UseAllOrganisationsOptions = {
  filters?: OrganisationFilterFields;
  listOptions?: ListOptions;
  queryOptions?: BaseQueryOptions<
    UseQueryOptions<PaginationResponse<AllOrganinisationsResponse>>
  >;
};

export const useAllOrganisations = (options?: UseAllOrganisationsOptions) => {
  const params = React.useMemo(
    () => ({
      limit: 100,
      ...options?.listOptions?.params,
      ...options?.filters,
    }),
    [options?.listOptions?.params, options?.filters],
  );

  const queryKey = React.useMemo(
    () => [...BASE_ORGANISATION_QUERY_KEY, 'list', { filters: params }],
    [params],
  );

  const queryFn = React.useCallback(
    () =>
      listAllOrganisations({
        ...options?.listOptions,
        params: params,
      }),
    [options?.listOptions, params],
  );

  return useQuery({
    queryKey: queryKey,
    queryFn: queryFn,
    ...options?.queryOptions,
  });
};

type UseSyncingOrganisationsOptions = {
  queryOptions?: BaseQueryOptions<
    UseQueryOptions<FindAllSyncingOrganisationsByCompanyIdResult>
  >;
};

const useSyncingOrganisationsQueryKey = [
  ...BASE_ORGANISATION_QUERY_KEY,
  'list',
  'syncing',
] as const;

export const useSyncingOrganisations = (
  options?: UseSyncingOrganisationsOptions,
) => {
  return useQuery({
    queryKey: useSyncingOrganisationsQueryKey,
    queryFn: listSyncingOrganisations,
    ...options?.queryOptions,
  });
};

type UseOrganisationOptions = {
  queryOptions?: BaseQueryOptions<UseQueryOptions<Organisation>>;
};

// N.B.: Not currently exposed
export const useOrganisation = (
  organisationId: number | undefined,
  options?: UseOrganisationOptions,
) => {
  const queryKey = React.useMemo(
    () => [...BASE_ORGANISATION_QUERY_KEY, 'detail', organisationId],
    [organisationId],
  );

  const queryFn = React.useCallback(
    async () => await getOrganisation(organisationId!),
    [organisationId],
  );

  const { enabled, ...restOfQueryOptions } = options?.queryOptions ?? {
    enabled: true,
  };

  return useQuery({
    queryKey: queryKey,
    queryFn: queryFn,
    enabled: !!organisationId && enabled,
    ...restOfQueryOptions,
  });
};
