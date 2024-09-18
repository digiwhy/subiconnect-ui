import { SubiConnectProvider } from '@subifinancial/subi-connect';
import React from 'react';
import { useAuthenticationAuthenticatedContext } from './authentication';
import { connectionFn } from '@/lib/connection-fn';

const SubiConnectProviderWrapper = ({
  children
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
