'use client';

import LiftedComponent from '@/components/lifted';
import { useAuthenticationAuthenticatedContext } from '@/context/authentication';
import { EmployeeManagementPage } from '@subifinancial/subi-connect';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const EmployeesComponent = () => {
  const { apiKey } = useAuthenticationAuthenticatedContext();
  const router = useRouter();

  useEffect(() => {
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
