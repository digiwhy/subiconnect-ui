import type { ColumnDef } from '../../../../../types/components/data-table';
import type { Employee } from '../../../../../types/employee';
import { DataTableColumnHeader } from '../../../../../ui/data-table-column-header';
import type { CellContext } from '@tanstack/react-table';
import React from 'react';

const NextPaymentDateCell: React.FC<CellContext<Employee, unknown>> = ({
  row,
}) => {
  if (!row.original.info.calendar?.nextPaymentDate) return '';

  const value = row.original.info?.calendar?.nextPaymentDate;

  return value;
};

export const nextPaymentDateColumn: ColumnDef<Employee> = {
  id: 'nextPaymentDate',
  accessorKey: 'info.calendar.nextPaymentDate',
  header: ({ column }) => (
    <DataTableColumnHeader column={column} title={'Next Pay Day'} />
  ),
  cell: NextPaymentDateCell,
};
