import { useDataTableContext } from '../context/table/table-context';
import useIntersectionObserver from '../hooks/internal/use-intersection-observer';
import { FILTER_SEARCH_PARAM_PREFIX } from '../hooks/internal/use-serach-params';
import { cn } from '../lib/utils';
import type { ListOptions, ListRequest } from '../types/components/data-table';
import { Badge } from './badge';
import { Button } from './button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from './command';
import { Popover, PopoverContent, PopoverTrigger } from './popover';
import { Separator } from './separator';
import {
  useInfiniteQuery,
  type QueryFunctionContext,
  type QueryKey,
} from '@tanstack/react-query';
import type { Column } from '@tanstack/react-table';
import { CheckIcon, PlusCircleIcon } from 'lucide-react';
import React from 'react';

interface InfiniteQueryFunctionProps
  extends QueryFunctionContext<QueryKey, number> {
  options?: ListOptions;
}

export type DataTableFacetedFilterProps<TData, TValue> = {
  column: Column<TData, TValue>;
  accessorKey: string;
  title?: string;
  listAction: ListRequest<never, { name: string; id: number }>;
};

export function DataTableFacetedFilter<TData, TValue>({
  column,
  accessorKey,
  title,
  listAction,
}: Readonly<DataTableFacetedFilterProps<TData, TValue>>) {
  const [search, setSearch] = React.useState<string>('');
  const { getParamValue, setParamValue } = useDataTableContext();
  const _key = FILTER_SEARCH_PARAM_PREFIX + accessorKey;
  const _value = getParamValue(_key);

  const [localisedFilters, setLocalisedFilters] = React.useState<
    Set<string | number>
  >(
    !_value || typeof _value === 'string'
      ? new Set()
      : new Set(_value.map((v) => Number.parseInt(v))),
  );

  const ref = React.useRef<HTMLDivElement>(null);
  const isVisible = useIntersectionObserver(ref);

  const mainQueryKey = React.useMemo(() => {
    return ['subi-connect', column.id, 'list'];
  }, [column.id]);

  const fullQueryKey = React.useMemo(() => {
    const _search = search !== '' ? search : undefined;
    return [
      ...mainQueryKey,
      {
        ...(search && { search: _search }),
      },
      'dropdown',
    ];
  }, [mainQueryKey, search]);

  const queryFunction = React.useCallback(
    ({ pageParam, options, signal }: InfiniteQueryFunctionProps) => {
      const fullOptions = {
        ...options,
        signal,
        params: {
          ...options?.params,
          page: pageParam,
          search: search !== '' ? search : undefined,
        },
      };

      return listAction(fullOptions);
    },
    [search, mainQueryKey],
  );

  const resetFilters = React.useCallback(() => {
    setLocalisedFilters(new Set());
    setParamValue(_key, undefined);
  }, [_key]);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: fullQueryKey,
      queryFn: queryFunction,
      enabled: listAction !== undefined,
      initialPageParam: 1,
      getPreviousPageParam: (firstPage) => firstPage.previous ?? undefined,
      getNextPageParam: (lastPage) => lastPage.next ?? undefined,
    });

  React.useEffect(() => {
    if (!isFetchingNextPage && isVisible && hasNextPage) {
      fetchNextPage();
    }
  }, [fetchNextPage, isVisible, hasNextPage, isFetchingNextPage]);

  const handleRemoveFilter = React.useCallback(
    (id: number) => {
      setLocalisedFilters((prev) => {
        prev.delete(id);
        const localisedFiltersString = Array.from(prev).join(',');
        setParamValue(_key, localisedFiltersString);
        return prev;
      });
    },
    [setLocalisedFilters, setParamValue],
  );

  const handleAddFilter = React.useCallback(
    (id: number) => {
      setLocalisedFilters((prev) => {
        prev.add(id);
        const localisedFiltersString = Array.from(prev).join(',');
        setParamValue(_key, localisedFiltersString);
        return prev;
      });
    },
    [setLocalisedFilters, setParamValue],
  );

  const finalOptions = React.useMemo(
    () => data?.pages.flatMap((page) => page.results) ?? [],
    [data?.pageParams, fullQueryKey],
  );

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant='outline' size='sm' className='sc-h-8 sc-border-border'>
          <PlusCircleIcon className='sc-mr-2 sc-h-4 sc-w-4' />
          {title}
          {localisedFilters.size > 0 && (
            <>
              <Separator orientation='vertical' className='sc-mx-2 sc-h-4' />
              <Badge
                variant='outline'
                className='sc-rounded-sm sc-px-1 sc-py-[2px] sc-text-xs sc-font-normal lg:sc-hidden'
              >
                {localisedFilters.size}
              </Badge>
              <div className='sc-hidden sc-space-x-1 lg:sc-flex'>
                {localisedFilters.size > 2 ? (
                  <Badge
                    variant='secondary'
                    className='sc-rounded-sm sc-px-1 sc-font-normal'
                  >
                    {localisedFilters.size} selected
                  </Badge>
                ) : (
                  finalOptions
                    .filter((option) => localisedFilters.has(option.id))
                    .map((option) => (
                      <Badge
                        variant='secondary'
                        key={option.id}
                        className='sx-py-1 sc-rounded-sm sc-font-normal'
                      >
                        {option.name}
                      </Badge>
                    ))
                )}
              </div>
            </>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className='sc-w-[200px] sc-p-0' align='start'>
        <Command>
          <CommandInput
            placeholder={title}
            value={search}
            onValueChange={setSearch}
          />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup>
              {finalOptions.map((option) => {
                const isSelected = localisedFilters.has(option.id);
                return (
                  <CommandItem
                    key={option.id}
                    onSelect={() => {
                      if (isSelected) {
                        handleRemoveFilter(option.id);
                      } else {
                        handleAddFilter(option.id);
                      }
                    }}
                  >
                    <div
                      className={cn(
                        'sc-mr-2 sc-flex sc-h-4 sc-w-4 sc-items-center sc-justify-center sc-rounded-sm sc-border sc-border-primary',
                        isSelected
                          ? 'sc-bg-primary sc-text-primary-foreground'
                          : 'sc-opacity-50 [&_svg]:sc-invisible',
                      )}
                    >
                      <CheckIcon className={cn('sc-h-4 sc-w-4')} />
                    </div>
                    <span>{option.name}</span>
                  </CommandItem>
                );
              })}
              <div ref={ref} className=''></div>
            </CommandGroup>
            {localisedFilters.size > 0 && (
              <>
                <CommandSeparator />
                <CommandGroup>
                  <CommandItem
                    onSelect={resetFilters}
                    className='sc-justify-center sc-text-center'
                  >
                    Clear filters
                  </CommandItem>
                </CommandGroup>
              </>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
