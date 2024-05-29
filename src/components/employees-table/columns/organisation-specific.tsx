import { actionsColumn, emailColumn, fullNameColumn } from './core';
import type { ColumnDef } from '@/types/components/data-table';
import type { Employee } from '@/types/employee';
import { lastSyncedColumn } from '@/ui/extended/table/columns/sync-status';

export const columns: ColumnDef<Employee>[] = [
  fullNameColumn,
  emailColumn,
  lastSyncedColumn(),
  actionsColumn,
];
