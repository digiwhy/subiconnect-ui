import type { Employee } from '../types/employee';
import React from 'react';

type EmployeesContext = {
  employees: Array<Employee>;
  isLoading: boolean;
};

export const EmployeesContext = React.createContext<
  EmployeesContext | undefined
>(undefined);

export const useEmployeesContext = (): EmployeesContext => {
  const context = React.useContext(EmployeesContext);
  if (!context) {
    throw new Error(
      'useEmployeesContext must be used within a EmployeesProvider',
    );
  }
  return context;
};

type EmployeesProviderProps = {
  children: React.ReactNode;
};

export const EmployeesProvider = ({ children }: EmployeesProviderProps) => {
  const employees = [] as Array<Employee>;
  const isLoading = false;

  const value = React.useMemo(
    () => ({
      employees,
      isLoading,
    }),
    [employees, isLoading],
  );

  return (
    <EmployeesContext.Provider value={value}>
      {children}
    </EmployeesContext.Provider>
  );
};
