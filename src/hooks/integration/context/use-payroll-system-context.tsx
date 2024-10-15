import { PayrollSystemContext } from '@/context/integration/payroll-system';
import React from 'react';

export const usePayrollSystemContext = () => {
  const context = React.useContext(PayrollSystemContext);

  if (!context) {
    throw new Error(
      'usePayrollSystemContext must be used in PayrollSystemProvider',
    );
  }
  return context;
};
