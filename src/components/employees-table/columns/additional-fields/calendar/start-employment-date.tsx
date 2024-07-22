import type { ColumnDef } from '../../../../../types/components/data-table';
import type { Employee } from '../../../../../types/employee';
import { DataTableColumnHeader } from '../../../../../ui/data-table-column-header';
import type { CellContext } from '@tanstack/react-table';
import React from 'react';

const StartEmploymentDateCell: React.FC<CellContext<Employee, unknown>> = ({
  row,
}) => {
  if (!row.original.info?.calendar?.startEmploymentDate) return '';

  const value = row.original.info?.calendar?.startEmploymentDate;

  return value;
};

export const startEmployementDateColumn: ColumnDef<Employee> = {
  id: 'startEmploymentDate',
  accessorKey: 'info.calendar.startEmploymentDate',
  header: ({ column }) => (
    <DataTableColumnHeader column={column} title={'Start Date'} />
  ),
  cell: StartEmploymentDateCell,
};
