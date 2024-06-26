import type { ColumnDef } from '../../../types/components/data-table';
import type { Employee } from '../../../types/employee';
import { DataTableColumnHeader } from '../../../ui/data-table-column-header';
import { lastSyncedColumn } from '../../../ui/extended/table/columns/sync/sync-date';
import { syncStatusColumn } from '../../../ui/extended/table/columns/sync/sync-status';
import { emailColumn, fullNameColumn } from './core';
import React from 'react';

const SyncStatusDescription = () => (
  <div className='_sc-max-w-full _sc-w-auto sc-whitespace-normal sc-text-wrap sc-break-words sc-p-2 sc-text-xs sc-font-normal'>
    <h4 className='sc-text-base sc-font-bold'>Sync Status</h4>
    <ul className='sc-list-inside'>
      <li className='sc-indent-1'>
        <span className='sc-font-semibold'>Synced:</span> The employee&apos;s
        data is up-to-date and successfully synchronised.
      </li>
      <li className='sc-indent-1'>
        <span className='sc-font-semibold'>Syncing:</span> The employee&apos;s
        data is currently in the process of being synchronised; please wait.
      </li>
      <li className='sc-indent-1'>
        <span className='sc-font-semibold'>Failed:</span> There was an issue
        syncing the employee&apos;s data. Please check your payroll settings. We
        will try again soon.
      </li>
    </ul>
  </div>
);

const organisationColumn: ColumnDef<Employee> = {
  id: 'organisation',
  accessorKey: 'organisation',
  header: ({ column }) => (
    <DataTableColumnHeader column={column} title='Organisation' />
  ),
  cell: ({ row }) => {
    const organisationName = row.original.payroll?.organisation?.name;

    if (!organisationName) return null;
    return (
      <div className='sc-min-w-[200px] sc-whitespace-nowrap'>
        {organisationName}
      </div>
    );
  },
};

export const startColumns: ColumnDef<Employee>[] = [
  fullNameColumn,
  emailColumn,
  organisationColumn,
];

export const endColumns: ColumnDef<Employee>[] = [
  lastSyncedColumn({ accessorKey: 'metadata.sync', id: 'lastSynced' }),
  syncStatusColumn({
    accessorKey: 'metadata.sync',
    id: 'syncStatus',
    description: <SyncStatusDescription />,
  }),
];

export const columns: ColumnDef<Employee>[] = [...startColumns, ...endColumns];
