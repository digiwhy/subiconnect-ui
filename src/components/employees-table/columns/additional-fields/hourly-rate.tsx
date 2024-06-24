import { getMoneyFromDecimals } from '../../../../lib/utils';
import type { ColumnDef } from '../../../../types/components/data-table';
import type { Employee } from '../../../../types/employee';
import { DataTableColumnHeader } from '../../../../ui/data-table-column-header';
import type { CellContext } from '@tanstack/react-table';
import React from 'react';

const HourlyRateCell: React.FC<CellContext<Employee, unknown>> = ({ row }) => {
  if (!row.original.info.salary?.hourlyRate) return '';

  const value = getMoneyFromDecimals(row.original.info.salary.hourlyRate);

  return value;
};

export const hourlyRateColumn: ColumnDef<Employee> = {
  id: 'hourlyRate',
  accessorKey: 'info.salary.hourlyRate',
  header: ({ column }) => (
    <DataTableColumnHeader column={column} title={'Hourly Rate'} />
  ),
  cell: HourlyRateCell,
};
