import { usePayrollSystemContext } from '../context';
import { ConnectCard } from './variants/connect';
import { ConnectedCard } from './variants/connected';
import React from 'react';

export const Card: React.FC = () => {
  const { payrollSystem } = usePayrollSystemContext();

  if (payrollSystem.isConnected) {
    return <ConnectedCard />;
  }

  return <ConnectCard />;
};
