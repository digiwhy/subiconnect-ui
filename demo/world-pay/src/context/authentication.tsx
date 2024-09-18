'use client';

import { CompanPayload, CompanyA } from '@/types/company';
import React from 'react';

const API_KEY_STORAGE_NAME = 'sc-api-key';

type AutheticationContext = {
  apiKey: string;
  setApiKey: (value: string) => void;
  apiKeyLocalStorage: boolean;
  setApiKeyLocalStorage: (value: boolean) => void;
  company: CompanPayload;
  setCompany: (value: CompanPayload) => void;
};

export const AuthenticationContext = React.createContext<
  AutheticationContext | undefined
>(undefined);

export const useAuthenticationContext = (): AutheticationContext => {
  const context = React.useContext(AuthenticationContext);
  if (!context) {
    throw new Error(
      'useAuthenticationContext must be used within a AuthenticationProvider'
    );
  }
  return context;
};

export const useAuthenticationAuthenticatedContext =
  (): AutheticationContext => {
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
  const [company, setCompany] = React.useState<CompanPayload>(CompanyA);

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
    () =>
      ({
        apiKey,
        setApiKey: handleSetApiKey,
        apiKeyLocalStorage,
        setApiKeyLocalStorage: handleSetApiKeyLocalStorage,
        company,
        setCompany
      }) satisfies AutheticationContext,
    [
      apiKey,
      setApiKey,
      apiKeyLocalStorage,
      setApiKeyLocalStorage,
      company,
      setCompany
    ]
  );

  return (
    <AuthenticationContext.Provider value={value}>
      {children}
    </AuthenticationContext.Provider>
  );
};
