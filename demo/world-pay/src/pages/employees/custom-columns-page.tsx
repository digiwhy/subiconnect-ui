'use client';

import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useAuthenticationAuthenticatedContext } from '@/context/authentication';
import { SelectableEmployeeColumns } from '@subifinancial/subi-connect';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import EmployeesComponent from './component';

const CustomColumnsEmployeesComponent = () => {
  const { apiKey } = useAuthenticationAuthenticatedContext();
  const navigate = useNavigate();
  const [selectedColumns, setSelectedColumns] = React.useState<
    SelectableEmployeeColumns[]
  >([]);

  React.useEffect(() => {
    if (!apiKey) {
      navigate('/');
    }
  }, [apiKey]);

  const handleToggle = (column: SelectableEmployeeColumns) => {
    setSelectedColumns((prevSelectedColumns) =>
      prevSelectedColumns.includes(column)
        ? prevSelectedColumns.filter((col) => col !== column)
        : [...prevSelectedColumns, column]
    );
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <h3>Select columns</h3>
        <div className="flex flex-row gap-2">
          {Object.values(SelectableEmployeeColumns).map((column) => (
            <div
              key={column}
              className="flex flex-row gap-2 justify-between items-center"
            >
              <Switch
                id={`employee-custom-column-${column}`}
                checked={selectedColumns.includes(column)}
                onCheckedChange={() => handleToggle(column)}
              />
              <Label htmlFor={`employee-custom-column-${column}`}>
                {column.toUpperCase()}
              </Label>
            </div>
          ))}
        </div>
      </div>
      <EmployeesComponent enabledColumns={selectedColumns} />
    </div>
  );
};

export default function CustomColumnsEmployeesPage() {
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
      <div className="flex flex-col gap-2 justify-start items-start text-left">
        <h1 className="font-semibold text-lg md:text-2xl">
          WorldPay - Employees
        </h1>
        <h2>Custom Columns</h2>
      </div>
      <CustomColumnsEmployeesComponent />
    </main>
  );
}
