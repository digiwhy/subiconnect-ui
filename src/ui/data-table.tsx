import { DataTablePagination } from './data-table-pagination';
import { DataTableToolbar } from './data-table-toolbar';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './table';
import { DataTableError } from '@/components/payroll-integration/get-error';
import { Loading } from '@/components/payroll-integration/loading';
import { useDataTablePaginationContext } from '@/context/table/pagination-context';
import { useDataTableContext } from '@/context/table/table-context';
import type { ColumnDef } from '@/types/components/data-table';
import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
  type SortingState,
} from '@tanstack/react-table';
import React from 'react';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
}

export function DataTable<TData, TValue>({
  columns,
}: Readonly<DataTableProps<TData, TValue>>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const {
    name,
    query: { data, error, isLoading },
  } = useDataTableContext<TData>();
  const { paginationState, onPaginationChange } =
    useDataTablePaginationContext();

  const tableData = React.useMemo(() => data?.results ?? [], [data]);

  const table = useReactTable({
    data: tableData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
      pagination: paginationState,
    },

    // Pagination
    manualPagination: true,
    onPaginationChange: onPaginationChange,
    pageCount: Math.ceil((data?.count ?? 0) / paginationState.pageSize),
  });

  if (error) {
    return <DataTableError context={`your ${name.toLowerCase()} data`} />;
  }

  return (
    <div className='sc-flex sc-flex-col sc-gap-2'>
      <DataTableToolbar table={table} />
      <div className='sc-rounded-md sc-border'>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  const columnDef = header.column.columnDef as ColumnDef<
                    TData,
                    TValue
                  >;
                  return (
                    <TableHead
                      key={header.id}
                      className={columnDef.headerClassName}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className='sc-h-24 sc-text-center'
                >
                  {isLoading ? (
                    <Loading title={`Loading ${name.toLowerCase()} data`} />
                  ) : (
                    'No results.'
                  )}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <DataTablePagination table={table} />
    </div>
  );
}
