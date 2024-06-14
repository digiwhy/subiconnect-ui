import { EmployeesTable } from '../../components';
import { columns } from '../../components/employees-table/columns/company-specific';
import { cn } from '../../lib/utils';
import { EmployeeAllowedSelectProps } from '../../services/api/employee/types';
import React from 'react';

const EmployeeManagementPage: React.FC<{
  className?: string;
  enabledColumns?: EmployeeAllowedSelectProps[];
}> = ({ className, enabledColumns = [] }) => {
  // TODO:

  // const {} = useOrganisations;

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
        <EmployeesTable columns={columns} enabledColumns={enabledColumns} />
      </div>
    </div>
  );
};

export default EmployeeManagementPage;
