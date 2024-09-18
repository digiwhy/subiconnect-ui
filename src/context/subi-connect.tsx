import { handleProviderOptions } from '@/lib/handle-provider-options';
import axiosClient from '@/services/axios';
import ConnectionService from '@/services/axios/connection-service';
import type { ConnectionServiceResetOptions } from '@/services/axios/types';
import logger from '@/services/logger';
import {
  type SubiConnectConnectionFn,
  type SubiConnectOptions,
} from '@/types/main';
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
  cleanup: (props?: ConnectionServiceResetOptions) => void;
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
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const [initialised, setInitialised] = React.useState<boolean>(false);

  /**
   * Handle the connection between client and Subi Connect. Uses the provided
   * `connectionFn` to get the access token for the client, organisation pair.
   */
  React.useEffect(() => {
    setIsLoading(true);

    /**
     * Handle options passed to the `SubiConnectProvider`.
     */
    if (options) handleProviderOptions(options);

    /**
     * Set the connection function on the `ConnectionService`.
     */
    const connectionService = ConnectionService.getInstance().initialise({
      connectionFn,
      context: `${window.location.origin}_${companyContext}`,
    });

    const initConnection = async () => {
      try {
        let accessToken = connectionService.getAccessToken();
        accessToken ??= await connectionService.generateAccessToken();

        axiosClient.defaults.headers.common['Authorization'] =
          `Bearer ${accessToken}`;
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
      if (!initialised) setInitialised(true);
    };

    initConnection();

    // Cleanup function
    return () => {
      cleanup({ keepAccessToken: true });
    };
  }, [connectionFn, options]);

  /**
   * Clear the access token from local storage and the connection service.
   */
  const cleanup = (props: ConnectionServiceResetOptions = {}) => {
    ConnectionService.getInstance().reset(props);
  };

  const value = React.useMemo(
    () => ({ isLoading, initialised, cleanup }) satisfies SubiConnectContext,
    [isLoading, initialised],
  );

  return (
    <SubiConnectContext.Provider value={value}>
      <div className='subi-connect'>
        {initialised || options?.bypassInitialisation ? children : null}
      </div>
    </SubiConnectContext.Provider>
  );
};
