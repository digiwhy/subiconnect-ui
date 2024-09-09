import { getMoneyFromDecimals } from '@/lib/utils';
import type { ColumnDef } from '@/types/components/data-table';
import type { Employee } from '@/types/employee';
import { DataTableColumnHeader } from '@/ui/data-table-column-header';
import type { CellContext } from '@tanstack/react-table';
import React from 'react';

const SalaryColumnCell: React.FC<CellContext<Employee, unknown>> = ({
  row,
}) => {
  if (!row.original.info.salary?.value) return '';

  const value = getMoneyFromDecimals(row.original.info.salary.value);

  return value;
};

export const salaryColumn: ColumnDef<Employee> = {
  id: 'salary',
  accessorKey: 'info.salary.value',
  header: ({ column }) => (
    <DataTableColumnHeader column={column} title={'Salary'} />
  ),
  cell: SalaryColumnCell,
};
