import { listAllEmployees } from '../../services/api/employee/actions';
import type { EmployeeAllowedSelectProps } from '../../services/api/employee/types';
import type { ColumnDef } from '../../types/components/data-table';
import type { Employee } from '../../types/employee';
import GenericTable from '../../ui/extended/table/generic-table';
import { EMPLOYEES_TABLE_ALLOWED_COLUMNS_MAP } from './consts';
import React from 'react';

const EmployeesTable: React.FC<{
  columns: ColumnDef<Employee>[];
  enabledColumns?: EmployeeAllowedSelectProps[];
}> = ({ columns, enabledColumns = [] }) => {
  const enabledColumnsComponents = enabledColumns.map(
    (enabledColumn) => EMPLOYEES_TABLE_ALLOWED_COLUMNS_MAP[enabledColumn],
  );

  return (
    <GenericTable
      name='Employee'
      listAction={listAllEmployees}
      columns={[...columns, ...enabledColumnsComponents]}
    />
  );
};

export default EmployeesTable;
