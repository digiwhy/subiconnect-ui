import { cn } from '../lib/utils';
import { Button } from './button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './dropdown-menu';
import { type Column } from '@tanstack/react-table';
import { ArrowDownIcon, ArrowUpDownIcon, ArrowUpIcon } from 'lucide-react';
import React from 'react';

interface DataTableColumnHeaderProps<TData, TValue>
  extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>;
  title: string;
}

export function DataTableColumnHeader<TData, TValue>({
  column,
  title,
  className,
}: Readonly<DataTableColumnHeaderProps<TData, TValue>>) {
  if (!column.getCanSort()) {
    return <div className={cn(className)}>{title}</div>;
  }

  return (
    <div
      className={cn(
        'sc-flex sc-items-center sc-space-x-2 sc-text-secondary',
        className,
      )}
    >
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant='ghost'
            size='sm'
            className='-sc-ml-3 sc-h-8 sc-font-mainMedium sc-font-normal data-[state=open]:sc-bg-accent'
          >
            <span>{title}</span>
            {column.getIsSorted() === 'desc' ? (
              <ArrowDownIcon className='sc-ml-2 sc-h-4 sc-w-4' />
            ) : column.getIsSorted() === 'asc' ? (
              <ArrowUpIcon className='sc-ml-2 sc-h-4 sc-w-4' />
            ) : (
              <ArrowUpDownIcon className='sc-ml-2 sc-h-4 sc-w-4' />
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='start'>
          <DropdownMenuItem onClick={() => column.toggleSorting(false)}>
            <ArrowUpIcon className='sc-mr-2 sc-h-3.5 sc-w-3.5 sc-text-muted-foreground/70' />
            Asc
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => column.toggleSorting(true)}>
            <ArrowDownIcon className='sc-mr-2 sc-h-3.5 sc-w-3.5 sc-text-muted-foreground/70' />
            Desc
          </DropdownMenuItem>
          <DropdownMenuSeparator />
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
