import {
  clearLastAuthenticatedRoutes,
  setLastAuthenticatedRoutes,
} from '../stores/auth0-authenticated-routes-store/Auth0AuthenticatedRoutesStore';
import { useAuth0 } from '@auth0/auth0-react';
import React from 'react';
import { useLocation } from 'react-router-dom';

function useAuth() {
  const { pathname } = useLocation();

  const {
    error,
    isAuthenticated,
    isLoading,
    getAccessTokenSilently,
    loginWithRedirect,
    logout: auth0Logout,
    user,
  } = useAuth0();

  React.useEffect(() => {
    if (!isAuthenticated) return;
    setLastAuthenticatedRoutes(pathname);
  }, [isAuthenticated, pathname]);

  const login = React.useCallback(
    (customParams?: Record<string, unknown>) => {
      if (isAuthenticated || isLoading || error) return;
      loginWithRedirect({ authorizationParams: customParams });
    },
    [error, isAuthenticated, isLoading, loginWithRedirect],
  );

  const logout = React.useCallback(
    async (returnTo?: string) => {
      clearLastAuthenticatedRoutes();
      // TODO: Waiting to add tanstack logout
      // await apiLogout();
      await auth0Logout({
        logoutParams: { returnTo: returnTo || window.location.origin },
      });
    },
    [auth0Logout],
  );

  const getToken = async (): Promise<string> => getAccessTokenSilently();

  return {
    getToken,
    isAuthenticated,
    isLoadingLibrary: isLoading,
    login,
    logout,
    user,
  };
}

export default useAuth;
