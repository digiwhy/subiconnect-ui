import type { AccountPayrollSystemExtended } from '../../types/application';
import React from 'react';

const PayrollSystemContext = React.createContext<{
  payrollSystem: AccountPayrollSystemExtended;
} | null>(null);

export const usePayrollSystemContext = () => {
  const context = React.useContext(PayrollSystemContext);

  if (!context) {
    throw new Error(
      'usePayrollSystemContext must be used in PayrollSystemProvider',
    );
  }
  return context;
};

type PayrollSystemProviderProps = {
  payrollSystem: AccountPayrollSystemExtended;
  children: React.ReactNode;
};

export const PayrollSystemProvider = ({
  payrollSystem,
  children,
}: PayrollSystemProviderProps) => {
  const values = React.useMemo(() => ({ payrollSystem }), [payrollSystem]);
  return (
    <PayrollSystemContext.Provider value={values}>
      {children}
    </PayrollSystemContext.Provider>
  );
};
