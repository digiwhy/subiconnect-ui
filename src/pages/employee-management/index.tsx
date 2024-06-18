import { EmployeesTable } from '../../components';
import {
  endColumns,
  startColumns,
} from '../../components/employees-table/columns/company-specific';
import { EMPLOYEES_TABLE_ALLOWED_COLUMNS_MAP } from '../../components/employees-table/consts';
import { cn } from '../../lib/utils';
import type { SelectableEmployeeColumns } from '../../types/employee';
import React from 'react';

const EmployeeManagementPage: React.FC<{
  className?: string;
  enabledColumns?: SelectableEmployeeColumns[];
}> = ({ className, enabledColumns = [] }) => {
  const enabledColumnsComponents = React.useMemo(
    () =>
      enabledColumns.map(
        (enabledColumn) => EMPLOYEES_TABLE_ALLOWED_COLUMNS_MAP[enabledColumn],
      ),
    [enabledColumns],
  );

  const finalColumns = React.useMemo(
    () => [...startColumns, ...enabledColumnsComponents, ...endColumns],
    [enabledColumnsComponents],
  );

  return (
    <div
      className={cn(
        'subi-connect sc-flex sc-h-full sc-w-full sc-flex-col sc-gap-4 sc-p-4',
        className,
      )}
    >
      <div className='sc-flex sc-w-full sc-justify-between sc-gap-4'>
        <div className='sc-flex sc-flex-col sc-gap-1'>
          <span className='sc-font-mainMedium sc-text-lg sc-text-secondary'>
            Employees
          </span>
        </div>
      </div>
      <div className='sc-h-full sc-w-full'>
        <EmployeesTable
          columns={finalColumns}
          enabledColumns={enabledColumns}
        />
      </div>
    </div>
  );
};

export default EmployeeManagementPage;
