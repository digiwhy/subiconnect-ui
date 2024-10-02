import type { ColumnDef } from '@/types/components/data-table';
import type { Employee } from '@/types/employee';
import { DataTableColumnHeader } from '@/ui/data-table-column-header';
import ClipboardButton from '@/ui/extended/table/columns/copy';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/ui/select';
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
  const value = row.original.info.emails?.[0];

  if (!value) return null;

  const getValue = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    event.stopPropagation();
    return value;
  };

  const id = `dropdown-menu-${row.id}`;

  if (row.original.info.emails?.length === 1) {
    return (
      <ClipboardButton id={id} data-email-value={value} getValue={getValue}>
        {value}
      </ClipboardButton>
    );
  }

  return (
    <Select defaultValue={value}>
      <div className='sc-flex sc-items-center sc-justify-between sc-gap-2 sc-overflow-visible'>
        <ClipboardButton id={id} data-email-value={value} getValue={getValue}>
          <SelectValue />
        </ClipboardButton>
        <SelectTrigger className='sc-group sc-relative sc-flex sc-w-fit sc-flex-col sc-items-center sc-justify-center sc-overflow-visible sc-border-none sc-p-1'>
          <div className='sc-absolute sc-translate-y-0 sc-text-xs sc-text-muted-foreground sc-opacity-0 sc-transition-[transform,opacity] group-hover:-sc-translate-y-3 group-hover:sc-opacity-100'>
            {row.original.info.emails?.length}
          </div>
        </SelectTrigger>
      </div>
      <SelectContent>
        {row.original.info.emails?.map((email) => (
          <SelectItem key={email} value={email}>
            {email}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
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
