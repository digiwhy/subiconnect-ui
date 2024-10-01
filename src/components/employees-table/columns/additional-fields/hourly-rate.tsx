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

const HourlyRateCell: React.FC<CellContext<Employee, unknown>> = ({ row }) => {
  const { defaultSelector, selectedSalaryId, setSelectedSalaryId } =
    useSalary();

  const disabled = defaultSelector !== SelectableEmployeeColumns.HOURLY_RATE;

  React.useEffect(() => {
    if (!selectedSalaryId && !disabled) {
      setSelectedSalaryId(row.original.info.salaries?.[0]?.id.toString());
    }
  }, [selectedSalaryId, row.original.info.salaries, disabled]);

  if (selectedSalaryId && disabled) {
    const hourlyRate = row.original.info.salaries?.find(
      (salary) => salary.id === Number(selectedSalaryId),
    )?.hourlyRate;
    return hourlyRate ? getMoneyFromDecimals(hourlyRate) : '';
  }

  if (!row.original.info.salaries || row.original.info.salaries.length === 0)
    return '';

  if (row.original.info.salaries.length === 1) {
    if (!row.original.info.salaries[0]?.hourlyRate) return '';
    if (!disabled)
      setSelectedSalaryId(row.original.info.salaries[0]!.id.toString());
    return getMoneyFromDecimals(row.original.info.salaries[0].hourlyRate);
  }

  return (
    <Select
      disabled={disabled}
      value={selectedSalaryId}
      onValueChange={setSelectedSalaryId}
    >
      <SelectTrigger>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {row.original.info.salaries.map((salary) => {
          if (!salary.hourlyRate) return null;
          return (
            <SelectItem key={salary.id} value={salary.id.toString()}>
              {getMoneyFromDecimals(salary.hourlyRate)}
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
};

export const hourlyRateColumn: ColumnDef<Employee> = {
  id: 'hourlyRate',
  accessorKey: 'info.salaries',
  header: ({ column }) => (
    <DataTableColumnHeader column={column} title={'Hourly Rate'} />
  ),
  cell: HourlyRateCell,
};
