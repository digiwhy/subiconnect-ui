import { getMoneyFromDecimals } from '../../../lib/utils';
import type { ColumnDef } from '../../../types/components/data-table';
import type { Employee } from '../../../types/employee';
import { Button } from '../../../ui/button';
import { DataTableColumnHeader } from '../../../ui/data-table-column-header';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '../../../ui/dropdown-menu';
import ClipboardButton from '../../../ui/extended/table/columns/copy';
import type { CellContext } from '@tanstack/react-table';
import { MoreHorizontal } from 'lucide-react';
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

const SalaryColumnCell: React.FC<CellContext<Employee, unknown>> = ({
  row,
}) => {
  if (!row.original.info.salary?.value) return '';

  const value = getMoneyFromDecimals(row.original.info.salary.value);

  return value;
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

export const salaryColumn: ColumnDef<Employee> = {
  accessorKey: 'salary',
  header: ({ column }) => (
    <DataTableColumnHeader column={column} title={'Salary'} />
  ),
  cell: SalaryColumnCell,
};

export const actionsColumn: ColumnDef<Employee> = {
  id: 'actions',
  accessorKey: undefined,
  cell: () => {
    return (
      <div className='sc-flex sc-justify-end'>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='ghost' className='sc-h-8 sc-w-8 sc-p-0'>
              <span className='sc-sr-only'>Open menu</span>
              <MoreHorizontal className='sc-h-4 sc-w-4' />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem></DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    );
  },
};
