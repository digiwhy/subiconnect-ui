import { DATE_FORMAT } from '../../../../constants';
import type { ColumnDef } from '../../../../types/components/data-table';
import { OrganisationSyncStatus } from '../../../../types/organisation';
import { DataTableColumnHeader } from '../../../data-table-column-header';
import { format } from 'date-fns';
import { CircleAlertIcon, LoaderCircleIcon } from 'lucide-react';
import React from 'react';

const SyncFailed: React.FC = () => {
  return (
    <div className='sc-flex sc-flex-row sc-items-center sc-justify-end sc-gap-2 sc-text-right'>
      <CircleAlertIcon className='sc-h-4 sc-w-4 sc-text-red-500' />
      <span className='sc-text-red-500'>Sync failed</span>
    </div>
  );
};

const Syncing: React.FC = () => {
  return (
    <div className='sc-flex sc-flex-row sc-items-center sc-justify-end sc-gap-2 sc-text-right sc-opacity-50'>
      <LoaderCircleIcon className='sc-h-4 sc-w-4 sc-animate-spin' />
      <span>Syncing</span>
    </div>
  );
};

const Success: React.FC<{ lastSynced: Date | null }> = ({ lastSynced }) => {
  if (!lastSynced) return;

  const formatted = format(lastSynced, DATE_FORMAT);

  return (
    <div className='sc-flex sc-items-center sc-justify-end sc-whitespace-nowrap sc-text-right'>
      <span>{formatted}</span>
    </div>
  );
};

type BaseColumn = {
  lastSynced: Date | null;
  syncStatus: OrganisationSyncStatus;
};

type OmittedProps<T> = keyof Pick<ColumnDef<T>, 'accessorKey'>;
type Props<T> = Omit<ColumnDef<T>, OmittedProps<T>>;

export const lastSyncedColumn = <T extends BaseColumn>(props?: Props<T>) =>
  ({
    accessorKey: 'syncStatus',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title={'Last synced'}
        className='sc-flex sc-justify-end'
      />
    ),
    cell: ({ row }) => {
      const label = row.original.syncStatus;
      const lastSynced: Date | null = row.original.lastSynced;

      if (!label) return null;

      switch (label) {
        case OrganisationSyncStatus.SYNCED:
          return <Success lastSynced={lastSynced} />;

        case OrganisationSyncStatus.SYNCING:
          return <Syncing />;

        case OrganisationSyncStatus.FAILED:
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
