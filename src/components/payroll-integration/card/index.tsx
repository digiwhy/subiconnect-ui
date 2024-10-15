import { ConnectCard } from './variants/connect';
import { ConnectedCard } from './variants/connected';
import { ManualConnectCard } from './variants/manual-connect';
import { usePayrollSystemContext } from '@/hooks/integration/context/use-payroll-system-context';
import React from 'react';

export const Card: React.FC = () => {
  const { payrollSystem } = usePayrollSystemContext();

  if (payrollSystem.isConnected) {
    return <ConnectedCard />;
  }

  return <ConnectCard />;
};

export const ManualCard: React.FC = () => {
  return <ManualConnectCard />;
};
