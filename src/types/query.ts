export type BaseQueryOptions<T> = Omit<T, 'queryKey' | 'queryFn'>;

export enum SearchParam {
  PAYROLL_SYSTEM = 'ps',
  PAGE = 'page',
  SEARCH = 'search',
}
