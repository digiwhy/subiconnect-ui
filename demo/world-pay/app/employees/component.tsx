'use client';

import LiftedComponent from '@/components/lifted';
import { useAuthenticationAuthenticatedContext } from '@/context/authentication';
import { EmployeeManagementPage } from '@subifinancial/subi-connect';
import { useRouter } from 'next/navigation';
import React from 'react';

const EmployeesComponent = () => {
  const { apiKey } = useAuthenticationAuthenticatedContext();
  const router = useRouter();

  React.useEffect(() => {
    if (!apiKey) {
      router.push('/');
    }
  }, [apiKey]);

  return (
    <LiftedComponent>
      <EmployeeManagementPage />
    </LiftedComponent>
  );
};

export default EmployeesComponent;
