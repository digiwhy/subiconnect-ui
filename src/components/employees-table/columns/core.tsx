import type { ColumnDef } from '@/types/components/data-table';
import type { Employee } from '@/types/employee';
import { DataTableColumnHeader } from '@/ui/data-table-column-header';
import ClipboardButton from '@/ui/extended/table/columns/copy';
import type { CellContext } from '@tanstack/react-table';
import React from 'react';

export const fullNameColumn: ColumnDef<Employee> = {
  accessorKey: 'fullName',
  header: ({ column }) => (
    <DataTableColumnHeader column={column} title={'Employee'} />
  ),
  cell: ({ row }) => {
    const firstName = row.original.info.firstName;
    const lastName = row.original.info.lastName;

    return `${firstName} ${lastName}`;
  },
};

const EmailColum: React.FC<CellContext<Employee, unknown>> = ({ row }) => {
  const value = row.original.info.email;

  if (!value) return null;

  const getValue = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    event.stopPropagation();
    return value;
  };

  const id = `dropdown-menu-${row.id}`;

  return (
    <ClipboardButton id={id} data-email-value={value} getValue={getValue}>
      {value}
    </ClipboardButton>
  );
};

export const emailColumn: ColumnDef<Employee> = {
  accessorKey: 'email',
  id: 'email',
  header: ({ column }) => (
    <DataTableColumnHeader column={column} title={'Email'} />
  ),
  cell: EmailColum,
  headerClassName: 'sc-w-full',
};
