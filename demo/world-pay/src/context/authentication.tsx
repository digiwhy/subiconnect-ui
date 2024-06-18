'use client';

import { getUser } from '@/services/api/authentication/actions';
import { Me } from '../../types/user';
import { useQuery } from '@tanstack/react-query';
import React from 'react';

const API_KEY_STORAGE_NAME = 'sc-api-key';

interface IAutheticationContext {
  isLoading: boolean;
  isLoggedIn: boolean;
  apiKey: string;
  setApiKey: (value: string) => void;
  apiKeyLocalStorage: boolean;
  setApiKeyLocalStorage: (value: boolean) => void;
}

interface IAutheticationContextAuthenticated extends IAutheticationContext {
  user: Me;
}

interface IAutheticationContextNotAuthenticated extends IAutheticationContext {
  user: undefined;
}

export const AuthenticationContext = React.createContext<
  | IAutheticationContextNotAuthenticated
  | IAutheticationContextAuthenticated
  | undefined
>(undefined);

export const useAuthenticationContext = (): IAutheticationContext => {
  const context = React.useContext(AuthenticationContext);
  if (!context) {
    throw new Error(
      'useAuthenticationContext must be used within a AuthenticationProvider'
    );
  }
  return context;
};

export const useAuthenticationAuthenticatedContext =
  (): IAutheticationContextAuthenticated => {
    const context = React.useContext(AuthenticationContext);
    if (!context) {
      throw new Error(
        'useAuthenticationAuthenticatedContext must be used within a AuthenticationProvider'
      );
    }

    if (!context.user) {
      throw new Error(
        'useAuthenticationAuthenticatedContext must be used within protected routes.'
      );
    }
    return context;
  };

interface AuthenticationProviderProps {
  children: React.ReactNode;
}

export const AuthenticationProvider = ({
  children
}: AuthenticationProviderProps) => {
  const [apiKey, setApiKey] = React.useState<string>('');
  const [apiKeyLocalStorage, setApiKeyLocalStorage] =
    React.useState<boolean>(false);

  React.useEffect(() => {
    const storedApiKey = localStorage.getItem(API_KEY_STORAGE_NAME);

    if (storedApiKey) {
      setApiKey(storedApiKey);
      setApiKeyLocalStorage(true);
    } else {
      setApiKeyLocalStorage(false);
    }
  }, []);

  const { data: user, isLoading } = useQuery<Me>({
    queryKey: ['me'],
    queryFn: getUser
  });

  const handleSetApiKeyLocalStorage = React.useCallback(
    (value: boolean) => {
      if (value) {
        localStorage.setItem(API_KEY_STORAGE_NAME, apiKey);
      } else {
        localStorage.removeItem(API_KEY_STORAGE_NAME);
      }

      setApiKeyLocalStorage(value);
    },
    [setApiKeyLocalStorage]
  );

  const handleSetApiKey = (value: string) => {
    setApiKey(value);

    if (apiKeyLocalStorage) {
      localStorage.setItem(API_KEY_STORAGE_NAME, value);
    }
  };

  const isLoggedIn = React.useMemo(() => user !== undefined, [user]);

  const value = React.useMemo(
    () => ({
      user,
      isLoggedIn,
      isLoading: isLoading,
      apiKey,
      setApiKey: handleSetApiKey,
      apiKeyLocalStorage,
      setApiKeyLocalStorage: handleSetApiKeyLocalStorage
    }),
    [
      user,
      isLoggedIn,
      isLoading,
      apiKey,
      setApiKey,
      apiKeyLocalStorage,
      setApiKeyLocalStorage
    ]
  );

  return (
    <AuthenticationContext.Provider value={value}>
      {children}
    </AuthenticationContext.Provider>
  );
};
