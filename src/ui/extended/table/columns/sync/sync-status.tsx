import type { ColumnDef } from '../../../../../types/components/data-table';
import { SyncStatus } from '../../../../../types/main';
import { DataTableColumnHeader } from '../../../../data-table-column-header';
import {
  isFlatType,
  isNestedType,
  type BaseLastSyncedColumnNestedType,
  type BaseLastSyncedColumnType,
} from './types';
import { CircleAlertIcon, CircleCheck, LoaderCircleIcon } from 'lucide-react';
import React from 'react';

const SyncFailed: React.FC = () => {
  return (
    <div className='sc-flex sc-flex-row sc-items-center sc-justify-end sc-gap-2 sc-whitespace-nowrap sc-text-left'>
      <CircleAlertIcon className='sc-h-4 sc-w-4 sc-text-red-500' />
      <span className='sc-text-red-500'>Sync failed</span>
    </div>
  );
};

const Syncing: React.FC = () => {
  return (
    <div className='sc-flex sc-flex-row sc-items-center sc-justify-end sc-gap-2 sc-whitespace-nowrap sc-text-right sc-opacity-50'>
      <LoaderCircleIcon className='sc-h-4 sc-w-4 sc-animate-spin' />
      <span>Syncing</span>
    </div>
  );
};

const Success: React.FC<{ lastSynced: Date | null }> = ({ lastSynced }) => {
  if (!lastSynced) return;

  return (
    <div className='sc-flex sc-flex-row sc-items-center sc-justify-end sc-gap-2 sc-whitespace-nowrap sc-text-left'>
      <CircleCheck className='sc-h-4 sc-w-4 sc-text-green-500' />
      <span className='sc-text-green-500'>Sync success</span>
    </div>
  );
};

type SyncStatusColumnProps<T> = ColumnDef<T> & {
  accessorKey: `${string}.sync` | keyof T;
};

export const syncStatusColumn = <
  T extends BaseLastSyncedColumnType | BaseLastSyncedColumnNestedType,
>({
  accessorKey,
  ...props
}: SyncStatusColumnProps<T>) =>
  ({
    accessorKey: accessorKey,
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title={'Sync Status'}
        className='sc-flex sc-justify-end '
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
          `Invalid syncStatusColumn configuration. Please check your accessorKey configuration. [accessorKey: ${accessorKey.toString()}]`,
        );
      }

      switch (label) {
        case SyncStatus.SYNCED:
          return <Success lastSynced={lastSynced} />;

        case SyncStatus.SYNCING || SyncStatus.SYNCING_FIRST:
          return <Syncing />;

        case SyncStatus.FAILED:
          return <SyncFailed />;

        // TODO: provide more finegrained status
        default:
          return <Syncing />;
      }
    },
    meta: {
      style: 'right',
    },
    ...props,
  }) satisfies ColumnDef<T>;
