import { useSubiConnectQuery } from './use-subi-connect-query';
import { useSubiConnectContext } from '@/context/subi-connect';
import { getOrganisation } from '@/services/api/organisation/actions';
import {
  listAllOrganisations,
  listOrganisationsFromPayroll,
  listSyncingOrganisations,
} from '@/services/api/payroll/actions';
import type {
  AllOrganinisationsResponse,
  FindAllSyncingOrganisationsByCompanyIdResult,
} from '@/services/api/payroll/types';
import type {
  PaginationResponse,
  ListOptions,
} from '@/types/components/data-table';
import { SUBI_CONNECT_QUERY_KEY } from '@/types/main';
import type { Organisation } from '@/types/organisation';
import type { BaseQueryOptions } from '@/types/query';
import { type UseQueryOptions } from '@tanstack/react-query';
import React from 'react';

export const BASE_ORGANISATION_QUERY_KEY = 'organisation';

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
  const { connectionService } = useSubiConnectContext();

  const params = React.useMemo(
    () => ({
      ...options?.listOptions?.params,
      ...options?.filters,
    }),
    [options?.listOptions?.params, options?.filters],
  );

  const queryKey = React.useMemo(
    () => [
      SUBI_CONNECT_QUERY_KEY,
      { context: connectionService.getContext() },
      BASE_ORGANISATION_QUERY_KEY,
      'list',
      {
        accountPayrollId,
        filters: params,
      },
    ],
    [accountPayrollId, params],
  );

  const queryFn = React.useCallback(
    () =>
      listOrganisationsFromPayroll(connectionService)(accountPayrollId!, {
        ...options?.listOptions,
        params: params,
      }),
    [accountPayrollId, options?.listOptions, params, connectionService],
  );

  const { enabled, ...restOfQueryOptions } = options?.queryOptions ?? {
    enabled: true,
  };

  return useSubiConnectQuery({
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
  const { connectionService } = useSubiConnectContext();

  const params = React.useMemo(
    () => ({
      limit: 100,
      ...options?.listOptions?.params,
      ...options?.filters,
    }),
    [options?.listOptions?.params, options?.filters],
  );

  const queryKey = React.useMemo(
    () => [
      SUBI_CONNECT_QUERY_KEY,
      { context: connectionService.getContext() },
      BASE_ORGANISATION_QUERY_KEY,
      'list',
      {
        filters: params,
      },
    ],
    [params],
  );

  const queryFn = React.useCallback(
    () =>
      listAllOrganisations(connectionService)({
        ...options?.listOptions,
        params: params,
      }),
    [options?.listOptions, params, connectionService],
  );

  return useSubiConnectQuery({
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

export const useSyncingOrganisations = (
  options?: UseSyncingOrganisationsOptions,
) => {
  const { connectionService } = useSubiConnectContext();

  const queryKey = [
    SUBI_CONNECT_QUERY_KEY,
    { context: connectionService.getContext() },
    BASE_ORGANISATION_QUERY_KEY,
    'list',
    'syncing',
  ];

  return useSubiConnectQuery({
    queryKey: queryKey,
    queryFn: listSyncingOrganisations(connectionService),
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
  const { connectionService } = useSubiConnectContext();

  const queryKey = React.useMemo(
    () => [
      SUBI_CONNECT_QUERY_KEY,
      { context: connectionService.getContext() },
      BASE_ORGANISATION_QUERY_KEY,
      'detail',
      organisationId,
    ],
    [organisationId],
  );

  const queryFn = React.useCallback(
    () => getOrganisation(connectionService)(organisationId!),
    [organisationId, connectionService],
  );

  const { enabled, ...restOfQueryOptions } = options?.queryOptions ?? {
    enabled: true,
  };

  return useSubiConnectQuery({
    queryKey: queryKey,
    queryFn: queryFn,
    enabled: !!organisationId && enabled,
    ...restOfQueryOptions,
  });
};
