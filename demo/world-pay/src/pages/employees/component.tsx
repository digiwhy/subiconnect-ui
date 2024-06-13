'use client';

import LiftedComponent from '@/components/lifted';
import { useAuthenticationAuthenticatedContext } from '@/context/authentication';
import { EmployeeManagementPage } from '@subifinancial/subi-connect';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const EmployeesComponent = () => {
  const { apiKey } = useAuthenticationAuthenticatedContext();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!apiKey) {
      navigate('/');
    }
  }, [apiKey]);

  return (
    <LiftedComponent>
      <EmployeeManagementPage />
    </LiftedComponent>
  );
};

export default EmployeesComponent;
