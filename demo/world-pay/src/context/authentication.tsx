'use client';

import { getUser } from '@/services/api/authentication/actions';
import { Me } from '../../types/user';
import { useQuery } from '@tanstack/react-query';
import React from 'react';

interface IAutheticationContext {
  isLoading: boolean;
  isLoggedIn: boolean;
  apiKey: string;
  setApiKey: (value: string) => void;
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

  const { data: user, isLoading } = useQuery<Me>({
    queryKey: ['me'],
    queryFn: getUser
  });

  const isLoggedIn = React.useMemo(() => user !== undefined, [user]);

  const value = React.useMemo(
    () => ({
      user,
      isLoggedIn,
      isLoading: isLoading,
      apiKey,
      setApiKey
    }),
    [user, isLoggedIn, isLoading, apiKey, setApiKey]
  );

  return (
    <AuthenticationContext.Provider value={value}>
      {children}
    </AuthenticationContext.Provider>
  );
};
