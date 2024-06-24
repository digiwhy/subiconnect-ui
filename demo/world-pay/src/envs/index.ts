const {
  VITE_AUTH0_AUDIENCE,
  VITE_AUTH0_CLIENT_ID,
  VITE_AUTH0_COOKIE_DOMAIN,
  VITE_AUTH0_DOMAIN,
  VITE_BASE_COMPONENTS_API,
  VITE_BASE_PORTAL_API,
  VITE_BASE_PORTAL_URL
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
} = import.meta.env;

if (!VITE_BASE_COMPONENTS_API) {
  throw new Error('Missing VITE_BASE_COMPONENTS_API env');
}

if (!VITE_BASE_PORTAL_API) {
  throw new Error('Missing VITE_BASE_PORTAL_API env');
}

if (!VITE_BASE_PORTAL_URL) {
  throw new Error('Missing VITE_BASE_PORTAL_URL env');
}

if (!VITE_AUTH0_AUDIENCE) {
  throw new Error('Missing VITE_AUTH0_AUDIENCE env');
}

if (!VITE_AUTH0_CLIENT_ID) {
  throw new Error('Missing VITE_AUTH0_CLIENT_ID env');
}

if (!VITE_AUTH0_COOKIE_DOMAIN) {
  throw new Error('Missing VITE_AUTH0_COOKIE_DOMAIN env');
}

if (!VITE_AUTH0_DOMAIN) {
  throw new Error('Missing VITE_AUTH0_DOMAIN env');
}

export {
  VITE_AUTH0_AUDIENCE,
  VITE_AUTH0_CLIENT_ID,
  VITE_AUTH0_COOKIE_DOMAIN,
  VITE_AUTH0_DOMAIN,
  VITE_BASE_COMPONENTS_API,
  VITE_BASE_PORTAL_API,
  VITE_BASE_PORTAL_URL
};
