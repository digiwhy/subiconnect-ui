import type { ColumnDef } from '../../../types/components/data-table';
import type { Employee } from '../../../types/employee';
import { lastSyncedColumn } from '../../../ui/extended/table/columns/sync-date';
import { emailColumn, fullNameColumn } from './core';

export const columns: ColumnDef<Employee>[] = [
  fullNameColumn,
  emailColumn,
  lastSyncedColumn(),
];
