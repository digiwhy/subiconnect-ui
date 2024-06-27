import useAuth0Route from '../../hooks/useAuth0Route.hook';
import {
  VITE_AUTH0_AUDIENCE,
  VITE_AUTH0_CLIENT_ID,
  VITE_AUTH0_COOKIE_DOMAIN,
  VITE_AUTH0_DOMAIN
} from '@/envs';
import { getOrigin } from '@/helpers/url-helper';
import { Auth0Provider as Auth0ProviderLibrary } from '@auth0/auth0-react';
import { Auth0ProviderOptions } from '@auth0/auth0-react/src/auth0-provider';

export type Auth0ProviderProps = Pick<Auth0ProviderOptions, 'children'>;

function Auth0Provider({ children }: Auth0ProviderProps) {
  const { handleOnRedirectCallback } = useAuth0Route();

  return (
    <Auth0ProviderLibrary
      authorizationParams={{
        audience: VITE_AUTH0_AUDIENCE,
        redirect_uri: getOrigin()
      }}
      clientId={VITE_AUTH0_CLIENT_ID}
      cookieDomain={VITE_AUTH0_COOKIE_DOMAIN}
      domain={VITE_AUTH0_DOMAIN}
      onRedirectCallback={handleOnRedirectCallback}
    >
      {children}
    </Auth0ProviderLibrary>
  );
}

export default Auth0Provider;
