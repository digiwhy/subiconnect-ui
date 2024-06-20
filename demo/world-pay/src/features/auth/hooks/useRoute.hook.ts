/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ROOT_ROUTE, UNAUTHORISED_TO_REDIRECT_TO_LOGIN } from '../constants';

export interface UseRouteProps {
  hasUser: boolean;
  getToken: () => Promise<string>;
  isAuthenticated: boolean;
  isLoadingLibrary: boolean;
  login: (customParams?: Record<string, any>) => void;
}

function useRoute({
  // getToken,
  isAuthenticated,
  isLoadingLibrary,
  login,
  hasUser,
}: UseRouteProps): void {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated || isLoadingLibrary) return;
    if (UNAUTHORISED_TO_REDIRECT_TO_LOGIN.includes(pathname)) return;

    login();
  }, [isAuthenticated, isLoadingLibrary, login, pathname, hasUser]);

  useEffect(() => {
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

  /**
   * Axios auth header
   */
  // useEffect(() => {
  //   (async () => {
  //     if (isLoadingLibrary) return;

  //     if (isAuthenticated) {
  //       const accessToken = await getToken();
  //       axiosClient.defaults.headers['authorization'] = `Bearer ${accessToken}`;
  //       prodAxiosClient.defaults.headers['authorization'] =
  //         `Bearer ${accessToken}`;
  //     } else {
  //       delete axiosClient.defaults.headers.common['authorization'];
  //       delete prodAxiosClient.defaults.headers.common['authorization'];
  //     }
  //   })();

  //   return () => {
  //     delete axiosClient.defaults.headers.common['authorization'];
  //     delete prodAxiosClient.defaults.headers.common['authorization'];
  //   };
  // }, [getToken, isAuthenticated, isLoadingLibrary]);
}

export default useRoute;
