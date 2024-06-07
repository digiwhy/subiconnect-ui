'use client';

import { SubiConnectProvider } from '@subifinancial/subi-connect';
import { useCallback } from 'react';
import { useAuthenticationAuthenticatedContext } from './authentication';
import { connectionFn } from '@/lib/connection-fn';

const SubiConnectProviderWrapper = ({
  children
}: {
  children: React.ReactNode;
}) => {
  const { apiKey } = useAuthenticationAuthenticatedContext();

  const completeConnectionFn = useCallback(async () => {
    return await connectionFn(apiKey);
  }, [apiKey]);

  return (
    <SubiConnectProvider connectionFn={completeConnectionFn}>
      {children}
    </SubiConnectProvider>
  );
};

export default SubiConnectProviderWrapper;
