import { ACCESS_TOKEN_NAME } from '../constants';
import { handleProviderOptions } from '../lib/handle-provider-options';
import axiosClient from '../services/axios';
import ConnectionService from '../services/axios/connection-service';
import logger from '../services/logger';
import type { SubiConnectAccessToken, SubiConnectOptions } from '../types/main';
import React from 'react';

type SubiConnectContext = {
  isLoading: boolean;
};

export const SubiConnectContext = React.createContext<
  SubiConnectContext | undefined
>(undefined);

export const useSubiConnectContext = (): SubiConnectContext => {
  const context = React.useContext(SubiConnectContext);
  if (!context) {
    throw new Error(
      'useSubiConnectContext must be used within a SubiConnectProvider',
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

  /**
   * Handle the connection between client and Subi Connect. Uses the provided
   * `connectionFn` to get the access token for the client, organisation pair.
   */
  React.useEffect(() => {
    setIsLoading(true);

    /**
     * Set the connection function on the `ConnectionService`.
     */
    const connectionService = ConnectionService.getInstance();
    connectionService.setConnectionFn(connectionFn);

    /**
     * Handle options passed to the `SubiConnectProvider`.
     */
    if (options) handleProviderOptions(options);

    /**
     * Initialise the connection between client and Subi Connect.
     */
    const initConnection = async () => {
      try {
        let accessToken = localStorage.getItem(ACCESS_TOKEN_NAME);

        if (!accessToken) {
          accessToken = await connectionFn();
          localStorage.setItem(ACCESS_TOKEN_NAME, accessToken);
        }

        axiosClient.defaults.headers.common['Authorization'] =
          `Bearer ${accessToken}`;
      } catch (error) {
        logger.error(
          '[SubiConnectProvider] Failed to initialise connection with Subi Connect',
          error as Error,
          {
            accessToken:
              localStorage.getItem(ACCESS_TOKEN_NAME) !== null
                ? 'SET (see local storage)'
                : 'NOT SET',
          },
        );
      }

      setIsLoading(false);
    };

    initConnection();
  }, [connectionFn, options]);

  const value = React.useMemo(() => ({ isLoading }), [isLoading]);

  return (
    <SubiConnectContext.Provider value={value}>
      {children}
    </SubiConnectContext.Provider>
  );
};
