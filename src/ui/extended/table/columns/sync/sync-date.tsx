import { DATE_FORMAT } from '../../../../../constants';
import type { ColumnDef } from '../../../../../types/components/data-table';
import { DataTableColumnHeader } from '../../../../data-table-column-header';
import {
  isFlatType,
  isNestedType,
  type BaseLastSyncedColumnNestedType,
  type BaseLastSyncedColumnType,
} from './types';
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

type LastSyncedColumnProps<T> = ColumnDef<T> & {
  accessorKey: `${string}.sync` | keyof T;
};

export const lastSyncedColumn = <
  T extends BaseLastSyncedColumnType | BaseLastSyncedColumnNestedType,
>({
  accessorKey,
  ...props
}: LastSyncedColumnProps<T>) =>
  ({
    accessorKey: accessorKey,
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title={'Last synced'}
        className='sc-flex sc-justify-end'
      />
    ),
    cell: ({ row, cell }) => {
      let label;
      let lastSynced: Date | null;

      const value = cell.getValue();

      if (isNestedType(value)) {
        label = value.status;
        lastSynced = value.lastSyncAt;
      } else if (isFlatType(row.original)) {
        label = row.original.syncStatus;
        lastSynced = row.original.lastSynced;
      } else {
        throw Error(
          `Invalid lastSyncedColumn configuration. Please check your accessorKey configuration. [accessorKey: ${accessorKey.toString()}]`,
        );
      }

      if (!label) return null;

      return <DateDisplay lastSynced={lastSynced} />;
    },
    meta: {
      style: 'right',
    },
    headerClassName: 'sc-min-w-[200px]',
    ...props,
  }) satisfies ColumnDef<T>;
