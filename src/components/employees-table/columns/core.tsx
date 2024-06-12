import { cn, getMoneyFromDecimals } from '../../../lib/utils';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from '../../../ui/select';
import type { CellContext } from '@tanstack/react-table';
import { MoreHorizontal } from 'lucide-react';
import React from 'react';

export const fullNameColumn: ColumnDef<Employee> = {
  accessorKey: 'fullName',
  header: ({ column }) => (
    <DataTableColumnHeader column={column} title={'Employee'} />
  ),
  cell: ({ row }) => {
    const firstName = row.original.firstName;
    const lastName = row.original.lastName;

    return `${firstName} ${lastName}`;
  },
};

const EmailColum: React.FC<CellContext<Employee, unknown>> = ({ row }) => {
  const [value, setValue] = React.useState<string | undefined>(
    row.original.emails[0],
  );

  if (!value) return null;

  const emails = row.original.emails;

  const getValue = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    event.stopPropagation();
    return value;
  };

  const id = `dropdown-menu-${row.id}`;

  if (emails.length === 1) {
    return (
      <ClipboardButton id={id} data-email-value={value} getValue={getValue}>
        {value}
      </ClipboardButton>
    );
  }

  return (
    <div id={id} className='sc-flex sc-gap-4' data-email-value={value}>
      <ClipboardButton data-email-value={value} getValue={getValue}>
        {value}
      </ClipboardButton>

      <Select value={value} onValueChange={setValue}>
        <SelectTrigger
          className={cn('sc-flex sc-w-auto sc-gap-2 sc-border-none')}
        >
          {emails.length}
        </SelectTrigger>
        <SelectContent>
          {row.original.emails.map((email) => (
            <SelectItem key={email} value={email}>
              {email}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

const SalaryColum: React.FC<CellContext<Employee, unknown>> = ({ row }) => {
  if (!row.original.salaries[0]) return '';

  const salaryFormatted = getMoneyFromDecimals(row.original.salaries[0]);

  const [value, setValue] = React.useState<string | undefined>(salaryFormatted);

  if (!value) return null;

  const getValue = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    event.stopPropagation();
    return value;
  };

  const id = `dropdown-menu-${row.id}`;

  if (row.original.salaries.length === 1) {
    return (
      <ClipboardButton id={id} data-email-value={value} getValue={getValue}>
        {value}
      </ClipboardButton>
    );
  }

  const salaries = row.original.salaries.map((salary) =>
    getMoneyFromDecimals(salary),
  );

  return (
    <div id={id} className='sc-flex sc-gap-4' data-email-value={value}>
      <ClipboardButton data-email-value={value} getValue={getValue}>
        {value}
      </ClipboardButton>

      <Select value={value} onValueChange={setValue}>
        <SelectTrigger
          className={cn('sc-flex sc-w-auto sc-gap-2 sc-border-none')}
        >
          {salaries.length}
        </SelectTrigger>
        <SelectContent>
          {salaries.map((salary) => (
            <SelectItem key={salary} value={salary}>
              {salary}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export const emailColumn: ColumnDef<Employee> = {
  accessorKey: 'emails',
  id: 'emails',
  header: ({ column }) => (
    <DataTableColumnHeader column={column} title={'Email'} />
  ),
  cell: EmailColum,
  headerClassName: 'sc-w-full',
};

export const salaryColumn: ColumnDef<Employee> = {
  accessorKey: 'salaries',
  id: 'salaries',
  header: ({ column }) => (
    <DataTableColumnHeader column={column} title={'Salary'} />
  ),
  cell: SalaryColum,
  headerClassName: 'sc-w-full',
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
