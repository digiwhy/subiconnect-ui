import type { ColumnDef } from '../../../../../types/components/data-table';
import type { Employee } from '../../../../../types/employee';
import { DataTableColumnHeader } from '../../../../../ui/data-table-column-header';
import type { CellContext } from '@tanstack/react-table';
import React from 'react';

const PayCycleCell: React.FC<CellContext<Employee, unknown>> = ({ row }) => {
  if (!row.original.info?.calendar?.paycycle) return '';

  const value = row.original.info?.calendar?.paycycle;

  return value;
};

export const payCycleColumn: ColumnDef<Employee> = {
  id: 'paycycle',
  accessorKey: 'info.calendar.paycycle',
  header: ({ column }) => (
    <DataTableColumnHeader column={column} title={'Pay Cycle'} />
  ),
  cell: PayCycleCell,
};
