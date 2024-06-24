'use client';

import React from 'react';

const API_KEY_STORAGE_NAME = 'sc-api-key';

interface IAutheticationContext {
  apiKey: string;
  setApiKey: (value: string) => void;
  apiKeyLocalStorage: boolean;
  setApiKeyLocalStorage: (value: boolean) => void;
}

export const AuthenticationContext = React.createContext<
  IAutheticationContext | undefined
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
  (): IAutheticationContext => {
    const context = React.useContext(AuthenticationContext);
    if (!context) {
      throw new Error(
        'useAuthenticationAuthenticatedContext must be used within a AuthenticationProvider'
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

  const value = React.useMemo(
    () => ({
      apiKey,
      setApiKey: handleSetApiKey,
      apiKeyLocalStorage,
      setApiKeyLocalStorage: handleSetApiKeyLocalStorage
    }),
    [apiKey, setApiKey, apiKeyLocalStorage, setApiKeyLocalStorage]
  );

  return (
    <AuthenticationContext.Provider value={value}>
      {children}
    </AuthenticationContext.Provider>
  );
};
