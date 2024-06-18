import { SelectableEmployeeColumns } from '../../types/employee';
import { salaryColumn } from './columns/core';
import { type EmployeesTableAllowedColumnsMap } from './types';

export const EMPLOYEES_TABLE_ALLOWED_COLUMNS_MAP: EmployeesTableAllowedColumnsMap =
  {
    [SelectableEmployeeColumns.SALARY]: salaryColumn,
  };
