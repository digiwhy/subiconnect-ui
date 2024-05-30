import { useDataTablePaginationContext } from '../context/table/pagination-context';
import { useDataTableContext } from '../context/table/table-context';
import { Button } from './button';
import { Input } from './input';
import type { Table } from '@tanstack/react-table';
import axios from 'axios';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsLeftIcon,
  ChevronsRightIcon,
} from 'lucide-react';
import React from 'react';

interface DataTablePaginationProps<TData> {
  table: Table<TData>;
}

export function DataTablePagination<TData>({
  table,
}: Readonly<DataTablePaginationProps<TData>>) {
  const { setPage } = useDataTablePaginationContext();
  const {
    query: { error },
  } = useDataTableContext<TData>();
  const currentPage = table.getState().pagination.pageIndex + 1;

  /**
   * Reset the page index if the page does not exist.
   */
  React.useEffect(() => {
    if (
      axios.isAxiosError(error) &&
      error.response?.status === 404 &&
      table.getState().pagination.pageIndex > 0
    ) {
      setPage(0);
    }
  }, [error]);

  const handlePageInputOnChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;

      if (value === '') {
        setPage(undefined);
      }

      if (!/^[0-9]+$/.test(value)) {
        return;
      }

      const valueAsInt = Number.parseInt(value);

      if (Number.parseInt(value) <= table.getPageCount()) {
        setPage(valueAsInt);
      }
    },
    [currentPage],
  );

  const handlePageChangeToStart = () => {
    setPage(1);
  };

  const handlePageChangeToEnd = () => {
    setPage(table.getPageCount());
  };

  const handlePageChangeToPrevious = () => {
    setPage(table.getState().pagination.pageIndex);
  };

  const handlePageChangeToNext = () => {
    setPage(table.getState().pagination.pageIndex + 2);
  };

  if (table.getPageCount() === 0) {
    return null;
  }

  return (
    <div className='sc-flex sc-items-center sc-justify-end'>
      <div className='sc-flex sc-items-center sc-space-x-6 lg:sc-space-x-8'>
        <div className='sc-flex sc-items-center sc-justify-center sc-gap-2 sc-text-sm'>
          Page{' '}
          <Input
            onChange={handlePageInputOnChange}
            placeholder={currentPage.toString()}
            value={currentPage}
            className='sc-flex sc-h-8 sc-w-8 sc-max-w-8 sc-px-2 sc-py-0 sc-text-center sc-leading-tight'
          />{' '}
          of {table.getPageCount()}
        </div>
        <div className='sc-flex sc-items-center sc-space-x-2'>
          <Button
            variant='outline'
            className='sc-hidden sc-h-8 sc-w-8 sc-p-0 lg:sc-flex'
            onClick={handlePageChangeToStart}
            disabled={!table.getCanPreviousPage()}
          >
            <span className='sc-sr-only'>Go to first page</span>
            <ChevronsLeftIcon size={'1em'} className='sc-h-4 sc-w-4' />
          </Button>
          <Button
            variant='outline'
            className='sc-h-8 sc-w-8 sc-p-0'
            onClick={handlePageChangeToPrevious}
            disabled={!table.getCanPreviousPage()}
          >
            <span className='sc-sr-only'>Go to previous page</span>
            <ChevronLeftIcon className='sc-h-4 sc-w-4' />
          </Button>
          <Button
            variant='outline'
            className='sc-h-8 sc-w-8 sc-p-0'
            onClick={handlePageChangeToNext}
            disabled={!table.getCanNextPage()}
          >
            <span className='sc-sr-only'>Go to next page</span>
            <ChevronRightIcon className='sc-h-4 sc-w-4' />
          </Button>
          <Button
            variant='outline'
            className='sc-hidden sc-h-8 sc-w-8 sc-p-0 lg:sc-flex'
            onClick={handlePageChangeToEnd}
            disabled={!table.getCanNextPage()}
          >
            <span className='sc-sr-only'>Go to last page</span>
            <ChevronsRightIcon className='sc-h-4 sc-w-4' />
          </Button>
        </div>
      </div>
    </div>
  );
}
