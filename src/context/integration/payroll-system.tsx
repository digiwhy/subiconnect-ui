import type { AccountPayrollSystemExtended } from '@/types/application';
import React from 'react';

type PayrollSystemProviderProps = {
  payrollSystem: AccountPayrollSystemExtended;
  children: React.ReactNode;
};

type PayrollSystemProviderValues = {
  payrollSystem: AccountPayrollSystemExtended;
};

export const PayrollSystemContext =
  React.createContext<PayrollSystemProviderValues | null>(null);

export const PayrollSystemProvider = ({
  payrollSystem,
  children,
}: PayrollSystemProviderProps) => {
  const values = React.useMemo(
    () => ({ payrollSystem }) satisfies PayrollSystemProviderValues,
    [payrollSystem],
  );
  return (
    <PayrollSystemContext.Provider value={values}>
      {children}
    </PayrollSystemContext.Provider>
  );
};
