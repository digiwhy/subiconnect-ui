import { useAuthenticationAuthenticatedContext } from './authentication';
import { connectionFn } from '@/lib/connection-fn';
import { SubiConnectProvider } from '@subifinancial/subi-connect';
import React from 'react';

const SubiConnectProviderWrapper = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { apiKey, company } = useAuthenticationAuthenticatedContext();

  const completeConnectionFn = React.useCallback(async () => {
    return await connectionFn(apiKey, company);
  }, [apiKey, company]);

  return (
    <SubiConnectProvider
      connectionFn={completeConnectionFn}
      companyContext={company.referenceId}
    >
      {children}
    </SubiConnectProvider>
  );
};

export default SubiConnectProviderWrapper;
