import { emailColumn, fullNameColumn } from './core';
import type { ColumnDef } from '@/types/components/data-table';
import type { Employee } from '@/types/employee';
import { lastSyncedColumn } from '@/ui/extended/table/columns/sync/sync-date';

export const columns: ColumnDef<Employee>[] = [
  fullNameColumn,
  emailColumn,
  lastSyncedColumn({ accessorKey: 'metadata.sync', id: 'lastSynced' }),
];
