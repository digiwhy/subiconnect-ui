import { SearchParam } from '../../types/query';
import { useDataTableContext } from './table-context';
import type { OnChangeFn, PaginationState } from '@tanstack/react-table';
import React from 'react';

const DEFAULT_PAGE = 1 as const;
const DEFAULT_PAGE_SIZE = 10 as const;

interface IDataTablePaginationContext {
  paginationState: PaginationState;
  onPaginationChange: OnChangeFn<PaginationState>;
  setPage: (page?: number) => void;
}

export const DataTablePaginationContext = React.createContext<
  IDataTablePaginationContext | undefined
>(undefined);

export const useDataTablePaginationContext =
  (): IDataTablePaginationContext => {
    const context = React.useContext(
      DataTablePaginationContext as React.Context<IDataTablePaginationContext>,
    );
    if (!context) {
      throw new Error(
        'useDataTablePaginationContext must be used within a DataTablePaginationProvider',
      );
    }
    return context;
  };

/**
 * Given a page parameter value, return the page number.
 *
 * @param param the page parameter value.
 * @param defaultValue the default value to return if the `param` does not exist.
 */
const handlePageParams = (
  param: string | undefined | null,
  defaultValue: number,
): number => {
  if (!param) {
    return defaultValue;
  }
  const parsedNumber = Number.parseInt(param, 10);

  if (isNaN(parsedNumber) || parsedNumber <= 0) {
    return defaultValue;
  }

  return parsedNumber;
};

interface DataTablePaginationProviderProps {
  children: React.ReactNode;
}

export const DataTablePaginationProvider = ({
  children,
}: DataTablePaginationProviderProps) => {
  const { getParamValue, setParamValue } = useDataTableContext();

  const page = React.useMemo(
    () => handlePageParams(getParamValue(SearchParam.PAGE), DEFAULT_PAGE),
    [getParamValue],
  );

  const [paginationState, setPaginationState] = React.useState<PaginationState>(
    {
      pageIndex: page - 1,
      pageSize: DEFAULT_PAGE_SIZE,
    },
  );

  const handleSetPage = React.useCallback((page: number = DEFAULT_PAGE) => {
    const validatedPage = Math.max(page, DEFAULT_PAGE);

    setPaginationState((prev) => {
      return { pageIndex: validatedPage - 1, pageSize: prev.pageSize };
    });

    if (validatedPage === 1) {
      setParamValue(SearchParam.PAGE, undefined);
    } else {
      setParamValue(SearchParam.PAGE, validatedPage.toString());
    }
  }, []);

  return (
    <DataTablePaginationContext.Provider
      value={{
        paginationState,
        onPaginationChange: setPaginationState,
        setPage: handleSetPage,
      }}
    >
      {children}
    </DataTablePaginationContext.Provider>
  );
};
