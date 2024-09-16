import { handleProviderOptions } from '@/lib/handle-provider-options';
import axiosClient from '@/services/axios';
import ConnectionService from '@/services/axios/connection-service';
import logger from '@/services/logger';
import {
  type SubiConnectAccessToken,
  type SubiConnectOptions,
} from '@/types/main';
import React from 'react';

type SubiConnectContext = {
  isLoading: boolean;
  initialised: boolean;
  cleanup: () => void;
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

export type SubiConnectProviderProps = {
  connectionFn: () => Promise<SubiConnectAccessToken>;
  options?: SubiConnectOptions;
  children: React.ReactNode;
};

export const SubiConnectProvider = ({
  connectionFn,
  options,
  children,
}: SubiConnectProviderProps) => {
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
      context: options?.context,
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
  }, [connectionFn, options]);

  /**
   * Clear the access token from local storage and the connection service.
   */
  const cleanup = () => {
    const connectionService = ConnectionService.getInstance();
    connectionService.reset();
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
