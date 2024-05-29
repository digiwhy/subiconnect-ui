import { ACCESS_TOKEN_NAME } from '@/constants';
import axiosClient from '@/services/axios';
import ConnectionService from '@/services/axios/connection-service';
import React from 'react';

type SubiConnectAccessToken = string;

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
  children: React.ReactNode;
};

export const SubiConnectProvider = ({
  connectionFn,
  children,
}: SubiConnectProviderProps) => {
  const [isLoading, setIsLoading] = React.useState<boolean>(true);

  /**
   * Handle the connection between client and Subi Connect. Uses the provided
   * `connectionFn` to get the access token for the client, organisation pair.
   */
  React.useEffect(() => {
    setIsLoading(true);
    const connectionService = ConnectionService.getInstance();
    connectionService.setConnectionFn(connectionFn);

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
        console.error('[Subi Connect] Failed to initialise connection:', error);
      }

      setIsLoading(false);
    };

    initConnection();
  }, [connectionFn]);

  const value = React.useMemo(() => ({ isLoading }), [isLoading]);

  return (
    <SubiConnectContext.Provider value={value}>
      {children}
    </SubiConnectContext.Provider>
  );
};
