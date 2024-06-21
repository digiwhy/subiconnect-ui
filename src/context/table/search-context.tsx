import { SearchParam } from '../../types/query';
import { useDataTablePaginationContext } from './pagination-context';
import { useDataTableContext } from './table-context';
import React from 'react';

interface IDataTableSearchContext {
  search: string;
  setSearch: (value: string) => void;
}

export const DataTableSearchContext = React.createContext<
  IDataTableSearchContext | undefined
>(undefined);

export const useDataTableSearchContext = (): IDataTableSearchContext => {
  const context = React.useContext(
    DataTableSearchContext as React.Context<IDataTableSearchContext>,
  );
  if (!context) {
    throw new Error(
      'useDataTableSearchContext must be used within a DataTableSearchProvider',
    );
  }
  return context;
};

interface DataTableSearchProviderProps {
  children: React.ReactNode;
}

export const DataTableSearchProvider = ({
  children,
}: DataTableSearchProviderProps) => {
  const { getParamValue, setParamValue } = useDataTableContext();
  const { setPage } = useDataTablePaginationContext();
  const search = React.useMemo(() => {
    const _search = getParamValue(SearchParam.SEARCH);
    return typeof _search === 'string' ? _search : '';
  }, [getParamValue]);

  const handleSetSearch = React.useCallback(
    (value: string) => {
      // Change the page to DEFAULT when going from '' to 'x'
      // Change the page back to DEFAULT when going from 'x' to ''
      if ((search === '' && value !== '') || (search !== '' && value === '')) {
        setPage(); // Set page to DEFAULT
      }

      setParamValue(SearchParam.SEARCH, value);
    },
    [setParamValue, search],
  );

  return (
    <DataTableSearchContext.Provider
      value={{
        search,
        setSearch: handleSetSearch,
      }}
    >
      {children}
    </DataTableSearchContext.Provider>
  );
};
