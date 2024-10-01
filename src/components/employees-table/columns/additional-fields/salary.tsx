import { useSalary } from '@/context/table/columns/salaries/salary-context';
import { getMoneyFromDecimals } from '@/lib/utils';
import type { ColumnDef } from '@/types/components/data-table';
import { SelectableEmployeeColumns, type Employee } from '@/types/employee';
import { DataTableColumnHeader } from '@/ui/data-table-column-header';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/ui/select';
import type { CellContext } from '@tanstack/react-table';
import React from 'react';

const SalaryColumnCell: React.FC<CellContext<Employee, unknown>> = ({
  row,
}) => {
  const { defaultSelector, selectedSalaryId, setSelectedSalaryId } =
    useSalary();

  const disabled = defaultSelector !== SelectableEmployeeColumns.SALARY;

  React.useEffect(() => {
    if (!selectedSalaryId && !disabled) {
      setSelectedSalaryId(row.original.info.salaries?.[0]?.id.toString());
    }
  }, [selectedSalaryId, row.original.info.salaries, disabled]);

  if (!row.original.info.salaries || row.original.info.salaries.length === 0)
    return '';

  if (row.original.info.salaries.length === 1) {
    if (!row.original.info.salaries[0]?.value) return '';
    if (!disabled)
      setSelectedSalaryId(row.original.info.salaries[0]!.id.toString());
    return getMoneyFromDecimals(row.original.info.salaries[0].value);
  }

  return (
    <Select
      disabled={disabled}
      value={selectedSalaryId ?? row.original.info.salaries?.[0]?.id.toString()}
      onValueChange={setSelectedSalaryId}
    >
      <SelectTrigger>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {row.original.info.salaries.map((salary) => {
          if (!salary.value) return null;
          return (
            <SelectItem key={salary.id} value={salary.id.toString()}>
              {getMoneyFromDecimals(salary.value)}
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
};

export const salaryColumn: ColumnDef<Employee> = {
  id: 'salary',
  accessorKey: 'info.salaries',
  header: ({ column }) => (
    <DataTableColumnHeader column={column} title={'Salary'} />
  ),
  cell: SalaryColumnCell,
};
