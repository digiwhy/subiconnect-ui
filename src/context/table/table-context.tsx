import useSearchParams from '../../hooks/internal/use-serach-params';
import type {
  PaginationResponse,
  ListRequest,
} from '../../types/components/data-table';
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
  getParamName: (param: string) => string;

  /**
   * Get the value of a parameter.
   *
   * @param param the base name of the parameter.
   *
   * @returns the parameter value.
   */
  getParamValue: (param: string) => string | null;

  /**
   * Set the value of a parameter.
   * @param param the base name of the parameter.
   * @param value (optional) the value to set. If no value is provided, delete the parameter.
   */
  setParamValue: (param: string, value?: string) => void;

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
  const [getSearchParam, setSearchParam] = useSearchParams();

  const getParamName = React.useCallback((param: string) => {
    return `${param}`;
  }, []);

  const getParamValue = React.useCallback(
    (param: string) => {
      return getSearchParam(getParamName(param));
    },
    [getSearchParam],
  );

  const setParamValue = React.useCallback(
    (param: string, value?: string) => {
      setSearchParam(getParamName(param), value);
    },
    [setSearchParam],
  );

  const params = React.useMemo(() => {
    const page = getParamValue('page');
    const search = getParamValue('search');

    return {
      ...(page !== '' && { page: page }),
      ...(search && { search }),
      // TODO: [pageSizeParam]: paginationState.pageSize,
    };
  }, [getParamValue]);

  const queryKey: QueryKey = React.useMemo(() => {
    return [
      'subi-connect',
      name.toLowerCase(),
      'list',
      ...queryKeyFilters,
      params,
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
      query,
      queryKey,
    }),
    [name, getParamName, getParamValue, setParamValue, query, queryKey],
  );

  return (
    <DataTableContext.Provider value={value}>
      {children}
    </DataTableContext.Provider>
  );
};
