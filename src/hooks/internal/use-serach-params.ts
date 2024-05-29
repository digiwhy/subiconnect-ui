import React from 'react';

const SUBI_CONNECT_QUERY_PREFIX = 'sc_';

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
    return getQuery().get(`${SUBI_CONNECT_QUERY_PREFIX}${param}`);
  };

  const updateSearchParams = (param: string, value: string | undefined) => {
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
    }
  };

  return [getSearchParam, updateSearchParams] as const;
};

export default useSearchParams;
