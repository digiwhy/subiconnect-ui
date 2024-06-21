import { useDataTableSearchContext } from '../context/table/search-context';
import { useDataTableContext } from '../context/table/table-context';
import { cn } from '../lib/utils';
import type { TypedOmit } from '../types/utils';
import { Button } from './button';
import {
  DataTableFacetedFilter,
  type DataTableFacetedFilterProps,
} from './data-table-faceted-filter';
import { Input } from './input';
import type { Table } from '@tanstack/react-table';
import { LoaderCircleIcon, RefreshCwIcon } from 'lucide-react';
import React from 'react';

export type DataTableToolbarFilterOptions<TData, TValue> = Array<
  TypedOmit<DataTableFacetedFilterProps<TData, TValue>, 'column'> & {
    columnId: string;
  }
>;

export type DataTableToolbarProps<TData, TValue = unknown> = {
  table: Table<TData>;
  hideSearchBar?: boolean;
  filterOptions?: DataTableToolbarFilterOptions<TData, TValue>;
};

export function DataTableToolbar<TData, TCreate>({
  table,
  hideSearchBar = false,
  filterOptions = [],
}: Readonly<DataTableToolbarProps<TData, TCreate>>) {
  const {
    query: { refetch, data, isRefetching, isLoading },
  } = useDataTableContext();
  const { search, setSearch } = useDataTableSearchContext();

  const handleRefresh = () => {
    refetch();
  };

  const handleOnChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      const trimmed = value.trim();

      // return if there are only whitespaces
      if (value !== '' && trimmed === '') {
        return;
      }

      /**
       * Return if there is no data for a given search, and the new input is
       * only adding to the search.
       */
      if (data?.results.length === 0 && trimmed.startsWith(search)) {
        return;
      }

      setSearch(value);
    },
    [data, search],
  );

  return (
    <div className='sc-flex sc-items-start sc-justify-between'>
      <div className='sc-flex sc-flex-1 sc-flex-col sc-items-start sc-gap-2 sm:sc-flex-row sm:sc-items-center'>
        {!hideSearchBar && (
          <div className='sc-relative sc-flex sc-flex-row sc-items-center sc-justify-between sc-gap-2'>
            <Input
              placeholder='Filter'
              value={search}
              onChange={handleOnChange}
              className='sc-h-8 sc-w-[150px] sc-pr-7 lg:sc-w-[250px]'
            />

            <div className='_sc-pl-2 sc-absolute sc-right-0 sc-mx-2 sc-flex sc-h-fit sc-w-fit sc-items-center sc-justify-center sc-rounded-full sc-bg-background sc-pt-[0.125rem]'>
              <LoaderCircleIcon
                className={cn(
                  'sc-hidden sc-h-3 sc-w-3 sc-text-muted-foreground/50',
                  {
                    'sc-block sc-animate-spin': isLoading && search !== '',
                  },
                )}
              />
            </div>
          </div>
        )}

        <div className='sc-flex sc-flex-row sc-flex-wrap sc-gap-2'>
          {filterOptions.map(({ columnId, ...props }) => {
            const col = table.getColumn(columnId);
            if (!col) return null;
            return (
              <DataTableFacetedFilter key={columnId} column={col} {...props} />
            );
          })}
        </div>
      </div>
      <div className='flex items-center gap-2'>
        <Button
          size='icon'
          variant='ghost'
          type='button'
          className={cn('sc-flex sc-h-8 sc-flex-row')}
          onClick={handleRefresh}
        >
          <RefreshCwIcon
            className={cn('sc-h-4 sc-w-4', { 'sc-animate-spin': isRefetching })}
          />
        </Button>
      </div>
    </div>
  );
}
