import { listAllEmployees } from '../../services/api/employee/actions';
import type { ColumnDef } from '../../types/components/data-table';
import type { Employee } from '../../types/employee';
import GenericTable from '../../ui/extended/table/generic-table';
import React from 'react';

const EmployeesTable: React.FC<{ columns: ColumnDef<Employee>[] }> = ({
  columns,
}) => {
  return (
    <GenericTable
      name='Employee'
      listAction={listAllEmployees}
      columns={columns}
    />
  );
};

export default EmployeesTable;
