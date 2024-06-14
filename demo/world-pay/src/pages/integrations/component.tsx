'use client';

import LiftedComponent from '@/components/lifted';
import { useAuthenticationAuthenticatedContext } from '@/context/authentication';
import { PayrollIntegrationsPage } from '@subifinancial/subi-connect';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const IntegrationsComponent = () => {
  const { apiKey } = useAuthenticationAuthenticatedContext();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!apiKey) {
      navigate('/');
    }
  }, [apiKey]);

  return (
    <LiftedComponent>
      <PayrollIntegrationsPage />
    </LiftedComponent>
  );
};

export default IntegrationsComponent;
