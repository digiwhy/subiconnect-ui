import { useSubiConnectContext } from '@/context/subi-connect';
import {
  useQuery,
  useMutation,
  type UseQueryOptions,
  type UseMutationOptions,
  type QueryKey,
} from '@tanstack/react-query';

export function useSubiConnectQuery<
  TQueryFnData = unknown,
  TError = unknown,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey,
>(options: UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>) {
  const { initialised } = useSubiConnectContext();
  const { enabled, ...queryOptions } = options;
  return useQuery({
    ...queryOptions,
    enabled: initialised && enabled,
  });
}

export function useSubiConnectMutation<
  TData = unknown,
  TError = unknown,
  TVariables = void,
  TContext = unknown,
>(options: UseMutationOptions<TData, TError, TVariables, TContext>) {
  useSubiConnectContext();
  return useMutation(options);
}
