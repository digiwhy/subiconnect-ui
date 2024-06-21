import React from 'react';

export const SUBI_CONNECT_QUERY_PREFIX = 'sc_';
export const SEARCH_PARAM_UPDATE_EVENT = 'sc-search-param-update';
export const FILTER_SEARCH_PARAM_PREFIX = 'f_';
export const FILTER_SEARCH_PARAM_SPLITTER = ',';

const handleParam = (key: string, value: string) => {
  if (key.startsWith(FILTER_SEARCH_PARAM_PREFIX)) {
    return value.split(FILTER_SEARCH_PARAM_SPLITTER);
  } else {
    return value;
  }
};

const getQuery = () => {
  if (typeof window !== 'undefined') {
    return new URLSearchParams(window.location.search);
  }
  return new URLSearchParams();
};

const useSearchParams = () => {
  const [_, setSearchParams] = React.useState<URLSearchParams>(getQuery());

  React.useEffect(() => {
    const handlePopState = () => {
      setSearchParams(getQuery());
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  const getSearchParam = (param: string) => {
    const value = getQuery().get(`${SUBI_CONNECT_QUERY_PREFIX}${param}`);

    if (!value) return null;

    return handleParam(param, value);
  };

  const getAllParams = () => {
    const allQueries: Record<string, string | string[]> = {};

    for (const [key, value] of getQuery().entries()) {
      if (key.startsWith(SUBI_CONNECT_QUERY_PREFIX)) {
        const _key = key.substring(SUBI_CONNECT_QUERY_PREFIX.length);
        allQueries[_key] = handleParam(_key, value);
      }
    }

    return allQueries;
  };

  const setSearchParam = (param: string, value: string | undefined) => {
    const query = getQuery();
    const prefixedParam = `${SUBI_CONNECT_QUERY_PREFIX}${param}`;

    if (!value) {
      query.delete(prefixedParam);
    } else {
      query.set(prefixedParam, value);
    }

    if (typeof window !== 'undefined') {
      const { protocol, pathname, host } = window.location;
      const newUrl = `${protocol}//${host}${pathname}?${query.toString()}`;
      window.history.pushState({}, '', newUrl);
      setSearchParams(query);

      // A hack to allow you to listen to changes
      const _queryStringChange = new Event(SEARCH_PARAM_UPDATE_EVENT);
      window.dispatchEvent(_queryStringChange);
    }
  };

  return {
    getSearchParam,
    setSearchParam,
    getAllParams,
    getQuery,
  } as const;
};

export default useSearchParams;
