import type { ColumnDef } from '../../../types/components/data-table';
import type { Employee } from '../../../types/employee';
import { DataTableColumnHeader } from '../../../ui/data-table-column-header';
import { lastSyncedColumn } from '../../../ui/extended/table/columns/sync/sync-date';
import { syncStatusColumn } from '../../../ui/extended/table/columns/sync/sync-status';
import { emailColumn, fullNameColumn } from './core';
import React from 'react';

export const startColumns: ColumnDef<Employee>[] = [
  fullNameColumn,
  emailColumn,
  {
    accessorKey: 'organisation',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={'Organisation'} />
    ),
    cell: ({ row }) => {
      const organisationName = row.original.payroll.organisation.name;

      if (!organisationName) return null;
      return <div className='sc-whitespace-nowrap'>{organisationName}</div>;
    },
  },
];

export const endColumns: ColumnDef<Employee>[] = [
  lastSyncedColumn({ accessorKey: 'metadata.sync' }),
  syncStatusColumn({ accessorKey: 'metadata.sync' }),
];

export const columns: ColumnDef<Employee>[] = [...startColumns, ...endColumns];
