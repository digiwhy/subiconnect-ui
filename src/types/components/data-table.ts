import type { ColumnDef as ColumnDefPrimative } from '@tanstack/react-table';
import type { AxiosRequestConfig } from 'axios';

type StringAccessorKey<TData> = Extract<keyof TData, string>;

export type ColumnProps<TData, T = StringAccessorKey<TData>> = {
  title: string;
  accessorKey: T;
};

export type ColumnDef<TData, TValue = unknown> = ColumnDefPrimative<
  TData,
  TValue
> & {
  headerClassName?: string;
  accessorKey: keyof TData | string | undefined;
};

export type PaginationResponse<T> = {
  count: number;
  next: number | null;
  previous: number | null;
  results: T[];
};

export interface ListOptions extends AxiosRequestConfig {}

export interface ListRequest<ParamsType, ReturnType> {
  (
    params: ParamsType,
    options?: ListOptions,
  ): Promise<PaginationResponse<ReturnType>>;

  (options?: ListOptions): Promise<PaginationResponse<ReturnType>>;
}

export type BaseQueryData = {
  id: number;
};
