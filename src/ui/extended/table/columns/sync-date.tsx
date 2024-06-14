import { DATE_FORMAT } from '../../../../constants';
import type { ColumnDef } from '../../../../types/components/data-table';
import type { Employee } from '../../../../types/employee';
import { DataTableColumnHeader } from '../../../data-table-column-header';
import { format } from 'date-fns';
import React from 'react';

const DateDisplay: React.FC<{ lastSynced: Date | null }> = ({ lastSynced }) => {
  if (!lastSynced) return;

  const formatted = format(lastSynced, DATE_FORMAT);

  return (
    <div className='sc-flex sc-items-center sc-justify-end sc-whitespace-nowrap sc-text-right'>
      <span>{formatted}</span>
    </div>
  );
};

type OmittedProps<T> = keyof Pick<ColumnDef<T>, 'accessorKey'>;
type Props<T> = Omit<ColumnDef<T>, OmittedProps<T>>;

export const lastSyncedColumn = <T extends Employee>(props?: Props<T>) =>
  ({
    accessorKey: 'lastSyncAt',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title={'Last synced'}
        className='sc-flex sc-justify-end'
      />
    ),
    cell: ({ row }) => {
      const label = row.original.metadata.sync.status;
      const lastSynced: Date | null = row.original.metadata.sync.lastSyncAt;

      if (!label) return null;

      return <DateDisplay lastSynced={lastSynced} />;
    },
    meta: {
      style: 'right',
    },
    ...props,
  }) satisfies ColumnDef<T>;
