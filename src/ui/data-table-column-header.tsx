import { cn } from '../lib/utils';
import { type Column } from '@tanstack/react-table';
import React from 'react';

interface DataTableColumnHeaderProps<TData, TValue>
  extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>; // This will be used with server-side filtering
  title: string;
}

const BASE_CLASSNAME = `sc-flex sc-items-center sc-space-x-2 sc-text-secondary`;

export function DataTableColumnHeader<TData, TValue>({
  title,
  className,
}: Readonly<DataTableColumnHeaderProps<TData, TValue>>) {
  return (
    <div
      className={cn(
        BASE_CLASSNAME,
        'sc-h-8 sc-justify-start sc-whitespace-nowrap sc-font-mainMedium sc-text-sm sc-font-normal',
        className,
      )}
    >
      {title}
    </div>
  );
}
