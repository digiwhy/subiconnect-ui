'use client';

import LiftedComponent from '@/components/lifted';
import { useAuthenticationAuthenticatedContext } from '@/context/authentication';
import { PayrollIntegrationsPage } from '@subifinancial/subi-connect';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const IntegrationsComponent = () => {
  const { apiKey } = useAuthenticationAuthenticatedContext();
  const router = useRouter();

  useEffect(() => {
    if (!apiKey) {
      router.push('/');
    }
  }, [apiKey]);

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
      <div className="flex items-center">
        <h1 className="font-semibold text-lg md:text-2xl">
          WorldPay - Integrations
        </h1>
      </div>
      <LiftedComponent>
        <PayrollIntegrationsPage />
      </LiftedComponent>
    </main>
  );
};

export default IntegrationsComponent;
