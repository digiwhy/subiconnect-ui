import type { ColumnDef } from '../../../types/components/data-table';
import type { Employee } from '../../../types/employee';
import { DataTableColumnHeader } from '../../../ui/data-table-column-header';
import { lastSyncedColumn } from '../../../ui/extended/table/columns/sync-status';
import { emailColumn, fullNameColumn } from './core';
import React from 'react';

export const columns: ColumnDef<Employee>[] = [
  fullNameColumn,
  emailColumn,
  {
    accessorKey: 'organisation',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={'Organisation'} />
    ),
    cell: ({ row }) => {
      const organisationName = row.original.organisationName;

      if (!organisationName) return null;
      return <div className='sc-whitespace-nowrap'>{organisationName}</div>;
    },
  },
  lastSyncedColumn(),
];
