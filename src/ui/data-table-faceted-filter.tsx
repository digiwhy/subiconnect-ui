import { cn } from '../lib/utils';
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
import type { Column } from '@tanstack/react-table';
import { CheckIcon, PlusCircleIcon } from 'lucide-react';
import React from 'react';

export type DataTableFacetedFilterProps<TData, TValue> = {
  column?: Column<TData, TValue>;
  title?: string;
  options: {
    label: string;
    value: string;
    icon?: React.ComponentType<{ className?: string }>;
  }[];
};

export function DataTableFacetedFilter<TData, TValue>({
  column,
  title,
  options,
}: Readonly<DataTableFacetedFilterProps<TData, TValue>>) {
  const facets = column?.getFacetedUniqueValues();
  const selectedValues = new Set(column?.getFilterValue() as string[]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant='outline' size='sm' className='sc-h-8 sc-border-dashed'>
          <PlusCircleIcon className='sc-mr-2 sc-h-4 sc-w-4' />
          {title}
          {selectedValues?.size > 0 && (
            <>
              <Separator orientation='vertical' className='sc-mx-2 sc-h-4' />
              <Badge
                variant='secondary'
                className='sc-rounded-sm sc-px-1 sc-font-normal lg:sc-hidden'
              >
                {selectedValues.size}
              </Badge>
              <div className='sc-hidden sc-space-x-1 lg:sc-flex'>
                {selectedValues.size > 2 ? (
                  <Badge
                    variant='secondary'
                    className='sc-rounded-sm sc-px-1 sc-font-normal'
                  >
                    {selectedValues.size} selected
                  </Badge>
                ) : (
                  options
                    .filter((option) => selectedValues.has(option.value))
                    .map((option) => (
                      <Badge
                        variant='secondary'
                        key={option.value}
                        className='sc-rounded-sm sc-px-1 sc-font-normal'
                      >
                        {option.label}
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
          <CommandInput placeholder={title} />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup>
              {options.map((option) => {
                const isSelected = selectedValues.has(option.value);
                return (
                  <CommandItem
                    key={option.value}
                    onSelect={() => {
                      if (isSelected) {
                        selectedValues.delete(option.value);
                      } else {
                        selectedValues.add(option.value);
                      }
                      const filterValues = Array.from(selectedValues);
                      column?.setFilterValue(
                        filterValues.length ? filterValues : undefined,
                      );
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
                    {option.icon && (
                      <option.icon className='sc-mr-2 sc-h-4 sc-w-4 sc-text-muted-foreground' />
                    )}
                    <span>{option.label}</span>
                    {facets?.get(option.value) && (
                      <span className='sc-font-mono sc-ml-auto sc-flex sc-h-4 sc-w-4 sc-items-center sc-justify-center sc-text-xs'>
                        {facets.get(option.value)}
                      </span>
                    )}
                  </CommandItem>
                );
              })}
            </CommandGroup>
            {selectedValues.size > 0 && (
              <>
                <CommandSeparator />
                <CommandGroup>
                  <CommandItem
                    onSelect={() => column?.setFilterValue(undefined)}
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
