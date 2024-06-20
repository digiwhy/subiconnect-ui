import type { QueryClientProviderProps } from '@tanstack/react-query';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

export type ApiProviderProps = Pick<QueryClientProviderProps, 'children'>;

function ApiProvider({ children }: ApiProviderProps) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}

export default ApiProvider;
