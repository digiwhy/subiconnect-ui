import { dateConnectedColumn } from './date';
import type { ColumnDef } from '@/types/components/data-table';
import type { Organisation } from '@/types/organisation';
import { DataTableColumnHeader } from '@/ui/data-table-column-header';
import { syncStatusColumn } from '@/ui/extended/table/columns/sync/sync-status';
import React from 'react';

export const columns: ColumnDef<Organisation>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={'Name'} />
    ),
  },
  {
    accessorKey: 'numberOfEmployees',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={'No. of employees'} />
    ),
  },
  dateConnectedColumn({
    title: 'Date connected',
    accessorKey: 'dateConnected',
  }),
  syncStatusColumn({ accessorKey: 'syncStatus', id: 'syncStatus' }),
];
