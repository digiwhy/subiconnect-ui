const getCurrentPageUrl = (): string => window.location.href;

const getHost = (): string =>
  `${window.location.protocol}//${window.location.host}`;

const getQueryParams = (): Record<string, string> => {
  const urlQueryParams = new URLSearchParams(window.location.search);
  const paramObj: Record<string, string> = {};
  for (const value of urlQueryParams.keys()) {
    paramObj[value] = urlQueryParams.get(value) ?? '';
  }

  return paramObj;
};

const getQueryParam = (queryParamName: string): string | undefined => {
  const queryParams: Record<string, string> = getQueryParams();
  return queryParams[queryParamName] ?? undefined;
};

const getPathname = (): string => window.location.pathname;

const getOrigin = (): string => window.location.origin;

const redirectToRoot = (): void => window.location.replace(getHost());

const reloadCurrentPage = (): void => window.location.reload();

const redirectToExternalPage = (url: string): void => {
  window.location.href = url;
};

const getQueryParamsStr = (paramObj: object): string =>
  Object.entries(paramObj)
    .map(([key, value]) => `${key}=${value}`)
    .join('&');

export {
    getCurrentPageUrl,
    getHost,
    getOrigin,
    getPathname,
    getQueryParam,
    getQueryParams,
    getQueryParamsStr,
    redirectToExternalPage,
    redirectToRoot,
    reloadCurrentPage
};

