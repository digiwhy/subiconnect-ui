import { ROOT_ROUTE, UNAUTHORISED_TO_REDIRECT_TO_LOGIN } from '../constants';
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export interface UseRouteProps {
  hasUser: boolean;
  getToken: () => Promise<string>;
  isAuthenticated: boolean;
  isLoadingLibrary: boolean;
  login: (customParams?: Record<string, unknown>) => void;
}

function useRoute({
  isAuthenticated,
  isLoadingLibrary,
  login,
  hasUser,
}: UseRouteProps): void {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (isAuthenticated || isLoadingLibrary) return;
    if (UNAUTHORISED_TO_REDIRECT_TO_LOGIN.includes(pathname)) return;

    login();
  }, [isAuthenticated, isLoadingLibrary, login, pathname, hasUser]);

  React.useEffect(() => {
    if (
      !isAuthenticated ||
      isLoadingLibrary ||
      !hasUser ||
      UNAUTHORISED_TO_REDIRECT_TO_LOGIN.includes(pathname)
    ) {
      return;
    }
    if (pathname !== ROOT_ROUTE) return;

    navigate('/dashboard');
  }, [isLoadingLibrary, isAuthenticated, navigate, hasUser, pathname]);
}

export default useRoute;
