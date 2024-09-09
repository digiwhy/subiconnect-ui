import { DATE_FORMAT } from '@/constants';
import type { ColumnDef, ColumnProps } from '@/types/components/data-table';
import { DataTableColumnHeader } from '@/ui/data-table-column-header';
import { format } from 'date-fns';
import React from 'react';

export const dateConnectedColumn = <TData,>({
  title,
  accessorKey,
}: ColumnProps<TData>): ColumnDef<TData> => ({
  accessorKey,
  header: ({ column }) => (
    <DataTableColumnHeader column={column} title={title} />
  ),
  cell: ({ row }) => {
    const label: string = row.getValue(accessorKey as string);

    if (!label) return null;

    const date = format(new Date(label), DATE_FORMAT);

    return <div className='sc-whitespace-nowrap'>{date}</div>;
  },
});
