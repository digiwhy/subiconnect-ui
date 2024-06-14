import type { EmployeeAllowedSelectProps } from '../../services/api/employee/types';
import type { ColumnDef } from '../../types/components/data-table';
import type { Employee } from '../../types/employee';

export type EmployeesTableAllowedColumnsMap = Record<
  EmployeeAllowedSelectProps,
  ColumnDef<Employee>
>;
