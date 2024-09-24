import { ConnectionService } from '@/services/axios/connection-service';

type ApiFunction<TArgs extends unknown[], TReturn> = (
  connectionService: ConnectionService,
  ...args: TArgs
) => Promise<TReturn>;

export const withConnectionService = <TArgs extends unknown[], TReturn>(
  apiFunction: ApiFunction<TArgs, TReturn>,
) => {
  return (connectionService: ConnectionService) => {
    return (...args: TArgs) => apiFunction(connectionService, ...args);
  };
};
