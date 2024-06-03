'use client';

import { SubiConnectProvider } from '@subifinancial/subi-connect';

const connectionFn = async () => {
  const response = await fetch(
    'http://localhost:8082/subi-connect/authentication/company-access-token',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.NEXT_PUBLIC_DRAFT_API_KEY as string
      },
      // headers: {
      //   'Content-Type': 'application/json',
      //   'x-api-key': process.env.NEXT_PUBLIC_DRAFT_API_KEY
      // },
      body: JSON.stringify({
        company: { referenceId: 'abc', name: 'sample company' }
      })
    }
  );
  const result = await response.json();
  return result.accessToken;
};

const SubiConnectProviderWrapper = ({
  children
}: {
  children: React.ReactNode;
}) => {
  return (
    <SubiConnectProvider connectionFn={connectionFn}>
      {children}
    </SubiConnectProvider>
  );
};

export default SubiConnectProviderWrapper;
