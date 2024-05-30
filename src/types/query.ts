export type BaseQueryOptions<T> = Omit<T, 'queryKey' | 'queryFn'>;
