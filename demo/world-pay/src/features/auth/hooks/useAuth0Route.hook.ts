import { SIGN_UP_ROUTES } from '../constants';
import { getLastAuthenticatedRoutes } from '../stores/auth0-authenticated-routes-store/Auth0AuthenticatedRoutesStore';
import { getPathname } from '@/helpers/url-helper';
import type { AppState, User } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';

export interface UseAuth0Route {
  handleOnRedirectCallback: (appState?: AppState, user?: User) => void;
}

function useAuth0Route(): UseAuth0Route {
  const navigate = useNavigate();

  const handleOnRedirectCallback = (
    appState?: AppState,
    _user?: User,
  ): void => {
    const authPathname = getLastAuthenticatedRoutes();
    const pageToRedirect: string =
      authPathname || (appState && appState.returnTo) || getPathname();

    if (SIGN_UP_ROUTES.includes(pageToRedirect)) return;

    navigate(pageToRedirect);
  };

  return {
    handleOnRedirectCallback,
  };
}

export default useAuth0Route;
