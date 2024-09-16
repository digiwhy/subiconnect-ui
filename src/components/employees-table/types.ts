import type { ColumnDef } from '@/types/components/data-table';
import type { Employee, SelectableEmployeeColumns } from '@/types/employee';

export type EmployeesTableAllowedColumnsMap = Record<
  SelectableEmployeeColumns,
  ColumnDef<Employee>
>;
