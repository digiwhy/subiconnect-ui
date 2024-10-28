import { ACCESS_TOKEN_NAME } from '@/constants';
import { SUBI_CONNECT_QUERY_KEY } from '@/types';
import { QueryClient } from '@tanstack/react-query';

/**
 * Clear all local storage items with the specified prefix and optionally clear the cache.
 * @param queryClient - The react-query client instance. If provided, the cache will be cleared.
 */
export const cleanupAll = (queryClient?: QueryClient) => {
  const prefix = `${ACCESS_TOKEN_NAME}__`;
  const keys = Object.keys(localStorage);

  for (const key of keys) {
    if (key.startsWith(prefix)) {
      localStorage.removeItem(key);
    }
  }

  if (queryClient) {
    queryClient.removeQueries({ queryKey: [SUBI_CONNECT_QUERY_KEY] });
  }
};
