import type { Organisation } from '@/types/organisation';
import React from 'react';

type OrganisationsContext = {
  organisations: Array<Organisation>;
  isLoading: boolean;
};

export const OrganisationsContext = React.createContext<
  OrganisationsContext | undefined
>(undefined);

export const useOrganisationsContext = (): OrganisationsContext => {
  const context = React.useContext(OrganisationsContext);
  if (!context) {
    throw new Error(
      'useOrganisationsContext must be used within a OrganisationsProvider',
    );
  }
  return context;
};

type OrganisationsProviderProps = {
  children: React.ReactNode;
};

export const OrganisationsProvider = ({
  children,
}: OrganisationsProviderProps) => {
  const organisations = [] as Array<Organisation>;
  const isLoading = false;

  const value = React.useMemo(
    () => ({
      organisations,
      isLoading,
    }),
    [organisations, isLoading],
  );

  return (
    <OrganisationsContext.Provider value={value}>
      {children}
    </OrganisationsContext.Provider>
  );
};
