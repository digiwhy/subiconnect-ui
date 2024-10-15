import type { ManualIntegrationAccountPayrollSystemExtended } from '@/types/application';
import React from 'react';

type ManualPayrollSystemProviderProps = {
  payrollSystem: ManualIntegrationAccountPayrollSystemExtended;
  children: React.ReactNode;
};

type ManualPayrollSystemProviderValues = {
  payrollSystem: ManualIntegrationAccountPayrollSystemExtended;
};

export const ManualPayrollSystemContext =
  React.createContext<ManualPayrollSystemProviderValues | null>(null);

export const ManualPayrollSystemProvider = ({
  payrollSystem,
  children,
}: ManualPayrollSystemProviderProps) => {
  const values = React.useMemo(
    () => ({ payrollSystem }) satisfies ManualPayrollSystemProviderValues,
    [payrollSystem],
  );
  return (
    <ManualPayrollSystemContext.Provider value={values}>
      {children}
    </ManualPayrollSystemContext.Provider>
  );
};
