import type { ColumnDef } from '../../../../types/components/data-table';
import type { Employee } from '../../../../types/employee';
import { OrganisationSyncStatus } from '../../../../types/organisation';
import { DataTableColumnHeader } from '../../../data-table-column-header';
import { CircleAlertIcon, CircleCheck, LoaderCircleIcon } from 'lucide-react';
import React from 'react';

const SyncFailed: React.FC = () => {
  return (
    <div className='sc-items-left sc-flex sc-flex-row sc-justify-end sc-gap-2 sc-text-left'>
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

  return (
    <div className='sc-items-left sc-flex sc-flex-row sc-justify-end sc-gap-2 sc-text-left'>
      <CircleCheck className='sc-h-4 sc-w-4 sc-text-green-500' />
      <span className='sc-text-green-500'>Sync success</span>
    </div>
  );
};

type OmittedProps<T> = keyof Pick<ColumnDef<T>, 'accessorKey'>;
type Props<T> = Omit<ColumnDef<T>, OmittedProps<T>>;

export const syncStatusColumn = <T extends Employee>(props?: Props<T>) =>
  ({
    accessorKey: 'syncStatus',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title={'Sync Status'}
        className='sc-flex sc-justify-end'
      />
    ),
    cell: ({ row }) => {
      const label = row.original.metadata.sync.status;
      const lastSynced: Date | null = row.original.metadata.sync.lastSyncAt;

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
