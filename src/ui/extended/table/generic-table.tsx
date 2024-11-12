import { DataTablePaginationProvider } from '@/context/table/pagination-context';
import { DataTableSearchProvider } from '@/context/table/search-context';
import {
  DataTableProvider,
  type DataTableProviderProps,
} from '@/context/table/table-context';
import type { BaseQueryData, ColumnDef } from '@/types/components/data-table';
import type { TypedOmit } from '@/types/utils';
import { DataTable, type DataTableProps } from '@/ui/data-table';
import React from 'react';

type GenericTableProps<TData, TValue> = Pick<
  DataTableProviderProps<TData>,
  'name' | 'listAction' | 'queryOptions' | 'queryKeyFilters'
> & {
  columns: ColumnDef<TData, TValue>[];
  dataTableProps?: TypedOmit<DataTableProps<TData, TValue>, 'columns'>;
};

const GenericTable = <TData extends BaseQueryData, TValue>({
  name,
  listAction,
  queryOptions,
  columns,
  dataTableProps,
  queryKeyFilters,
}: GenericTableProps<TData, TValue>) => {
  return (
    <DataTableProvider<TData>
      name={name}
      listAction={listAction}
      queryOptions={queryOptions}
      queryKeyFilters={queryKeyFilters}
    >
      <DataTablePaginationProvider>
        <DataTableSearchProvider>
          <DataTable columns={columns} {...dataTableProps} />
        </DataTableSearchProvider>
      </DataTablePaginationProvider>
    </DataTableProvider>
  );
};

export default GenericTable;
