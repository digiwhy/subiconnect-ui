import useSearchParams, {
  FILTER_SEARCH_PARAM_PREFIX,
} from '@/hooks/internal/use-serach-params';
import { createNestedObjectFromString } from '@/lib/utils';
import ConnectionService from '@/services/axios/connection-service';
import { SUBI_CONNECT_QUERY_KEY } from '@/types';
import type {
  PaginationResponse,
  ListRequest,
} from '@/types/components/data-table';
import { SearchParam } from '@/types/query';
import {
  type QueryFunctionContext,
  type QueryKey,
  type UseQueryOptions,
  type UseQueryResult,
  useQuery,
} from '@tanstack/react-query';
import React from 'react';

interface IDataTableContext<TData> {
  /**
   * The name of the data table.
   */
  name: string;

  /**
   * Get the parameter name with the given prefix.
   *
   * @param param the base name of the parameter.
   *
   * @returns the verbose parameter name.
   */
  getParamName: (param: SearchParam | string) => string;

  /**
   * Get the value of a parameter.
   *
   * @param param the base name of the parameter.
   *
   * @returns the parameter value.
   */
  getParamValue: (param: SearchParam | string) => string | string[] | null;

  /**
   * Set the value of a parameter.
   * @param param the base name of the parameter.
   * @param value (optional) the value to set. If no value is provided, delete the parameter.
   */
  setParamValue: (param: SearchParam | string, value?: string) => void;

  /**
   * Reset all filters.
   */
  resetFilters: () => void;

  /**
   * Get all the filters in the current search state.
   *
   * @returns the filters.
   */
  getFilters: () => Record<string, string | string[] | undefined>;

  /**
   * The useQuery result.
   */
  query: UseQueryResult<PaginationResponse<TData>, unknown>;

  /**
   * The query key associated witht the query.
   */
  queryKey: QueryKey;
}

export const DataTableContext = React.createContext<
  IDataTableContext<unknown> | undefined
>(undefined);

export const useDataTableContext = <TData,>(): IDataTableContext<TData> => {
  const context = React.useContext(
    DataTableContext as React.Context<IDataTableContext<TData>>,
  );
  if (!context) {
    throw new Error(
      'useDataTableContext must be used within a DataTableProvider',
    );
  }
  return context;
};

interface DataTableProviderProps<TData> {
  children: React.ReactNode;
  name: string;
  listAction: ListRequest<never, TData>;
  queryKeyFilters?: QueryKey;
  queryOptions?: Omit<
    UseQueryOptions<
      PaginationResponse<TData>,
      unknown,
      PaginationResponse<TData>,
      QueryKey
    >,
    'initialData' | 'queryKey'
  >;
}

export const DataTableProvider = <TData,>({
  children,
  name,
  listAction,
  queryKeyFilters = [],
  queryOptions,
}: DataTableProviderProps<TData>) => {
  const { getSearchParam, setSearchParam, getAllParams } = useSearchParams();

  const getParamName = React.useCallback((param: SearchParam | string) => {
    return `${param}`;
  }, []);

  const getParamValue = React.useCallback(
    (param: SearchParam | string) => {
      return getSearchParam(getParamName(param));
    },
    [getSearchParam],
  );

  const setParamValue = React.useCallback(
    (param: SearchParam | string, value: string | undefined) => {
      setSearchParam(getParamName(param), value);
    },
    [setSearchParam],
  );

  const resetFilters = React.useCallback(() => {
    for (const key of Object.keys(getAllParams())) {
      if (key.startsWith(FILTER_SEARCH_PARAM_PREFIX)) {
        setParamValue(key, undefined);
      }
    }
  }, [setParamValue]);

  const getFilters = React.useCallback(() => {
    const filters: Record<string, string | string[] | undefined> = {};
    Object.keys(getAllParams()).forEach((key) => {
      if (key.startsWith(FILTER_SEARCH_PARAM_PREFIX)) {
        filters[key] = getAllParams()[key];
      }
    });

    return filters;
  }, [getAllParams]);

  const params = React.useMemo(() => {
    const _page = getParamValue(SearchParam.PAGE);
    const page = Number.parseInt(typeof _page === 'string' ? _page : '');
    const search = getParamValue(SearchParam.SEARCH);

    const filtersWithoutPrefix = Object.entries(getAllParams())
      .filter(([key]) => key.startsWith(FILTER_SEARCH_PARAM_PREFIX))
      .reduce((acc: Record<string, unknown>, [key, value]) => {
        const newObject = createNestedObjectFromString(
          key.replace(FILTER_SEARCH_PARAM_PREFIX, ''),
          value,
        );
        return { ...acc, ...newObject }; // Merge the new object into the accumulator
      }, {});

    return {
      ...filtersWithoutPrefix,
      ...(!Number.isNaN(page) && { page: page }),
      ...(search && typeof search === 'string' && { search }),

      // TODO: [pageSizeParam/limit]: paginationState.pageSize,
    };
  }, [getParamValue]);

  const queryKey: QueryKey = React.useMemo(() => {
    return [
      SUBI_CONNECT_QUERY_KEY,
      { context: ConnectionService.getInstance().getContext() },
      name.toLowerCase(),
      'list',
      { filters: { ...params, ...queryKeyFilters } },
    ];
  }, [name, queryKeyFilters, params]);

  const queryFunction = async ({ signal }: QueryFunctionContext<QueryKey>) => {
    return await listAction({ signal, params }).then((value) => {
      return value;
    });
  };

  const query = useQuery({
    ...queryOptions,
    queryKey: queryKey,
    queryFn: queryFunction,
  });

  const value = React.useMemo(
    () => ({
      name,
      getParamName,
      getParamValue,
      setParamValue,
      resetFilters,
      getFilters,
      query,
      queryKey,
    }),
    [
      name,
      getParamName,
      getParamValue,
      setParamValue,
      resetFilters,
      getFilters,
      query,
      queryKey,
    ],
  );

  return (
    <DataTableContext.Provider value={value}>
      {children}
    </DataTableContext.Provider>
  );
};
