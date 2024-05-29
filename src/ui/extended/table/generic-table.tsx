import { DataTablePaginationProvider } from '@/context/table/pagination-context';
import { DataTableSearchProvider } from '@/context/table/search-context';
import { DataTableProvider } from '@/context/table/table-context';
import type {
  BaseQueryData,
  ColumnDef,
  ListRequest,
  PaginationResponse,
} from '@/types/components/data-table';
import { DataTable } from '@/ui/data-table';
import type { QueryKey, UseQueryOptions } from '@tanstack/react-query';
import React from 'react';

type GenericTableProps<TData, TValue> = {
  name: string;
  listAction: ListRequest<never, TData>;
  queryOptions?: Omit<
    UseQueryOptions<
      PaginationResponse<TData>,
      unknown,
      PaginationResponse<TData>,
      QueryKey
    >,
    'initialData' | 'queryKey'
  >;
  columns: ColumnDef<TData, TValue>[];
  queryKeyFilters?: QueryKey;
};

const GenericTable = <TData extends BaseQueryData, TValue>({
  name,
  listAction,
  queryOptions,
  columns,
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
          <DataTable columns={columns} />
        </DataTableSearchProvider>
      </DataTablePaginationProvider>
    </DataTableProvider>
  );
};

export default GenericTable;
