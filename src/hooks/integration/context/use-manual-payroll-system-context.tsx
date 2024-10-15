import { ManualPayrollSystemContext } from '@/context/integration/manual-payroll-system';
import React from 'react';

export const useManualPayrollSystemContext = () => {
  const context = React.useContext(ManualPayrollSystemContext);

  if (!context) {
    throw new Error(
      'useManualPayrollSystemContext must be used in ManualPayrollSystemProvider',
    );
  }
  return context;
};
