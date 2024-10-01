import { SelectableEmployeeColumns } from '@/types/employee';
import React from 'react';

type SalaryContextType = {
  defaultSelector:
    | SelectableEmployeeColumns.SALARY
    | SelectableEmployeeColumns.HOURLY_RATE;
  selectedSalaryId: string | undefined;
  setSelectedSalaryId: (id: string | undefined) => void;
};

const SalaryContext = React.createContext<SalaryContextType | null>(null);

export const SalaryProvider: React.FC<{
  defaultSelector?: SalaryContextType['defaultSelector'];
  children: React.ReactNode;
}> = ({ defaultSelector = SelectableEmployeeColumns.SALARY, children }) => {
  const [selectedSalaryId, setSelectedSalaryId] = React.useState<
    string | undefined
  >('');

  const contextValue = React.useMemo(
    () =>
      ({
        defaultSelector,
        selectedSalaryId,
        setSelectedSalaryId,
      }) satisfies SalaryContextType,
    [selectedSalaryId, setSelectedSalaryId, defaultSelector],
  );

  return (
    <SalaryContext.Provider value={contextValue}>
      {children}
    </SalaryContext.Provider>
  );
};

export const useSalary = () => {
  const context = React.useContext(SalaryContext);
  if (!context) {
    throw new Error('useSalary must be used within a SalaryProvider');
  }
  return context;
};
