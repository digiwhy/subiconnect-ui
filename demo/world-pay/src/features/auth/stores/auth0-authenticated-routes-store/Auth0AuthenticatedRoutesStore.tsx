const AUTHENTICATED_ROUTES_KEY =
  'SUBICONNECT_DEMO_AUTHENTICATED_ROUTES_KEY:auth0';

interface ITEM_VALUE {
  pathname: string;
  expiry: number;
}

const TTL_MS = 1800000;

const setLastAuthenticatedRoutes = (pathname: string): void => {
  const now = new Date();
  const itemValueObj: ITEM_VALUE = {
    pathname,
    expiry: now.getTime() + TTL_MS,
  };

  window.localStorage.setItem(
    AUTHENTICATED_ROUTES_KEY,
    JSON.stringify(itemValueObj),
  );
};

const getLastAuthenticatedRoutes = (): string | null => {
  const item = window.localStorage.getItem(AUTHENTICATED_ROUTES_KEY);
  if (!item) return null;

  const now = new Date();
  const itemValueObj: ITEM_VALUE = JSON.parse(item);
  if (itemValueObj.expiry < now.getTime()) return null;

  return itemValueObj.pathname;
};

const clearLastAuthenticatedRoutes = (): void => {
  window.localStorage.removeItem(AUTHENTICATED_ROUTES_KEY);
};

export {
  clearLastAuthenticatedRoutes,
  getLastAuthenticatedRoutes,
  setLastAuthenticatedRoutes,
};
