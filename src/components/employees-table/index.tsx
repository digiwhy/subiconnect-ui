import { listAllEmployees } from '../../services/api/employee/actions';
import type { ColumnDef, ListOptions } from '../../types/components/data-table';
import type { Employee, SelectableEmployeeColumns } from '../../types/employee';
import GenericTable from '../../ui/extended/table/generic-table';
import React from 'react';

const EmployeesTable: React.FC<{
  columns: ColumnDef<Employee>[];
  enabledColumns?: SelectableEmployeeColumns[];
}> = ({ columns, enabledColumns = [] }) => {
  const listAction = React.useCallback(
    (options: ListOptions | undefined) =>
      listAllEmployees({
        ...options,
        params: { fields: enabledColumns, ...options?.params },
      }),
    [enabledColumns],
  );

  return (
    <GenericTable
      name='Employee'
      listAction={listAction}
      queryKeyFilters={[{ enabledColumns }]}
      columns={columns}
    />
  );
};

export default EmployeesTable;
