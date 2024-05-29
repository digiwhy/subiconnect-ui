import { useDataTablePaginationContext } from "./pagination-context";
import { useDataTableContext } from "./table-context";
import React, { createContext, useContext, useCallback, useMemo } from "react";

interface IDataTableSearchContext {
  search: string;
  setSearch: (value: string) => void;
}

export const DataTableSearchContext = createContext<
  IDataTableSearchContext | undefined
>(undefined);

export const useDataTableSearchContext = (): IDataTableSearchContext => {
  const context = useContext(
    DataTableSearchContext as React.Context<IDataTableSearchContext>
  );
  if (!context) {
    throw new Error(
      "useDataTableSearchContext must be used within a DataTableSearchProvider"
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
  const search = useMemo(() => getParamValue("search") ?? "", [getParamValue]);

  const handleSetSearch = useCallback(
    (value: string) => {
      // Change the page to DEFAULT when going from '' to 'x'
      // Change the page back to DEFAULT when going from 'x' to ''
      if ((search === "" && value !== "") || (search !== "" && value === "")) {
        setPage(); // Set page to DEFAULT
      }

      setParamValue("search", value);
    },
    [setParamValue, search]
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
