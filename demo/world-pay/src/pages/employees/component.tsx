'use client';

import LiftedComponent from '@/components/lifted';
import { useAuthenticationAuthenticatedContext } from '@/context/authentication';
import {
  SelectableEmployeeColumns,
  EmployeeManagementPage,
} from '@subifinancial/subi-connect';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const EmployeesComponent: React.FC<{
  enabledColumns?: SelectableEmployeeColumns[];
}> = ({ enabledColumns }) => {
  const { apiKey } = useAuthenticationAuthenticatedContext();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!apiKey) {
      navigate('/');
    }
  }, [apiKey]);

  return (
    <LiftedComponent>
      <EmployeeManagementPage enabledColumns={enabledColumns} />
    </LiftedComponent>
  );
};

export default EmployeesComponent;
