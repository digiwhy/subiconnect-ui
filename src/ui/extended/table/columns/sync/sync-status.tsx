import {
  isFlatType,
  isNestedType,
  type BaseLastSyncedColumnNestedType,
  type BaseLastSyncedColumnType,
} from './types';
import type { ColumnDef } from '@/types/components/data-table';
import { SyncStatus } from '@/types/main';
import { DataTableColumnHeader } from '@/ui/data-table-column-header';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/ui/tooltip';
import type { Cell, Column, Row } from '@tanstack/react-table';
import { CircleAlertIcon, CircleCheck, LoaderCircleIcon } from 'lucide-react';
import React from 'react';

type SyncStatusColumnProps<T> = ColumnDef<T> & {
  accessorKey: `${string}.sync` | keyof T;
  description?: React.ReactNode;
};

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

const SyncStatusCell = <T,>({
  row,
  cell,
  accessorKey,
}: {
  row: Row<T>;
  cell: Cell<T, unknown>;
  accessorKey: SyncStatusColumnProps<T>['accessorKey'];
}) => {
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

    case SyncStatus.SYNCING:
    case SyncStatus.SYNCING_FIRST:
      return <Syncing />;

    case SyncStatus.FAILED:
    case SyncStatus.FAILED_FIRST:
      return <SyncFailed />;

    // TODO: provide more finegrained status
    default:
      return <Syncing />;
  }
};

const SyncStatusHeader = <T,>({
  column,
  description,
}: {
  column: Column<T, unknown>;
  description?: React.ReactNode;
}) => {
  if (!description) {
    return (
      <DataTableColumnHeader
        column={column}
        title={'Sync Status'}
        className='sc-flex sc-justify-end'
      />
    );
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger className='sc-flex sc-w-full sc-justify-end'>
          <DataTableColumnHeader
            column={column}
            title={'Sync Status'}
            className='sc-flex sc-justify-end'
          />
        </TooltipTrigger>
        <TooltipContent side='bottom' align='end'>
          {description}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export const syncStatusColumn = <
  T extends BaseLastSyncedColumnType | BaseLastSyncedColumnNestedType,
>({
  accessorKey,
  description,
  ...props
}: SyncStatusColumnProps<T>) =>
  ({
    accessorKey: accessorKey,
    header: ({ column }) => (
      <SyncStatusHeader column={column} description={description} />
    ),
    cell: ({ row, cell }) => {
      return <SyncStatusCell row={row} cell={cell} accessorKey={accessorKey} />;
    },
    meta: {
      style: 'right',
    },
    ...props,
  }) satisfies ColumnDef<T>;
