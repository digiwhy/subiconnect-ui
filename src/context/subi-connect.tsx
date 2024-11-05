import { ConnectionService } from '@/services/axios/connection-service';
import { Logger } from '@/services/logger';
import {
  SUBI_CONNECT_QUERY_KEY,
  type SubiConnectCleanupProps,
  type SubiConnectConnectionFn,
  type SubiConnectOptions,
} from '@/types/main';
import { useQueryClient } from '@tanstack/react-query';
import React from 'react';

type SubiConnectContext = {
  /**
   * Whether or not the connection is loading.
   */
  isLoading: boolean;

  /**
   * Whether or not the connection has been initialised.
   */
  initialised: boolean;

  /**
   * Function to clean up the connection.
   */
  cleanup: (props?: SubiConnectCleanupProps) => void;

  /**
   * The connection service.
   */
  connectionService: ConnectionService;
};

export const SubiConnectContext = React.createContext<
  SubiConnectContext | undefined
>(undefined);

export const useSubiConnectContext = (): SubiConnectContext => {
  const context = React.useContext(SubiConnectContext);
  if (!context) {
    throw new Error(
      'Subi Connect hooks must be used within a SubiConnectProvider',
    );
  }
  return context;
};

export type SubiConnectProviderProps<TCompanyContext extends string> = {
  /**
   * The connection function to use to get the access token for the company.
   */
  connectionFn: SubiConnectConnectionFn;

  /**
   * The context for the SubiConnect API. This can be something that uniquely
   * identifies the company—for example, the company ID or name.
   */
  companyContext: TCompanyContext extends '' ? never : TCompanyContext;

  /**
   * Options to pass to the Subi Connect provider.
   */
  options?: SubiConnectOptions;

  /**
   * The children to render within the Subi Connect provider.
   */
  children: React.ReactNode;
};

export const SubiConnectProvider = <TCompanyContext extends string>({
  connectionFn,
  companyContext,
  options,
  children,
}: SubiConnectProviderProps<TCompanyContext>) => {
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const initialised = React.useRef<boolean>(false);
  const logger = React.useMemo(() => new Logger(), [companyContext]);
  const connectionService = React.useMemo(
    () =>
      new ConnectionService({
        connectionFn,
        context: companyContext,
        logger,
        providerOptions: options,
      }),
    [connectionFn, companyContext, logger, options],
  );

  /**
   * Handle the connection between client and Subi Connect. Uses the provided
   * `connectionFn` to get the access token for the client, organisation pair.
   */
  React.useEffect(() => {
    setIsLoading(true);
    initialised.current = false;

    const initConnection = async () => {
      try {
        let accessToken = connectionService.getAccessToken();
        accessToken ??= await connectionService.generateAccessToken();

        connectionService.getHttpClient().defaults.headers.common[
          'Authorization'
        ] = `Bearer ${accessToken}`;
      } catch (error) {
        logger.error(
          '[SubiConnectProvider] Failed to initialise connection with Subi Connect',
          error as Error,
          {
            accessToken:
              connectionService.getAccessToken() !== null
                ? 'SET (see local storage)'
                : 'NOT SET',
          },
        );
      }

      setIsLoading(false);
      initialised.current = true;
    };

    initConnection();
  }, [options, connectionService]);

  /**
   * Clear the access token from local storage and the connection service.
   */
  const cleanup = React.useCallback(
    (props: SubiConnectCleanupProps = {}) => {
      connectionService.reset({
        keepAccessToken: props.keepData,
      });

      if (!props.keepData) {
        const queryKey = [
          SUBI_CONNECT_QUERY_KEY,
          ...(props.cleanupAllContexts
            ? []
            : [{ context: connectionService.getContext() }]),
        ];

        queryClient.removeQueries({
          queryKey: queryKey,
        });
      }
    },
    [connectionService, queryClient],
  );

  const value = React.useMemo(() => {
    return {
      isLoading,
      initialised: initialised.current,
      cleanup,
      connectionService,
    } satisfies SubiConnectContext;
  }, [isLoading, initialised, cleanup, connectionService, initialised.current]);

  return (
    <SubiConnectContext.Provider value={value}>
      <div className='subi-connect'>
        {initialised.current || options?.bypassInitialisation ? children : null}
      </div>
    </SubiConnectContext.Provider>
  );
};
