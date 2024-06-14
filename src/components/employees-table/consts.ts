import { EmployeeAllowedSelectProps } from '../../services/api/employee/types';
import { salaryColumn } from './columns/core';
import { type EmployeesTableAllowedColumnsMap } from './types';

export const EMPLOYEES_TABLE_ALLOWED_COLUMNS_MAP: EmployeesTableAllowedColumnsMap =
  {
    [EmployeeAllowedSelectProps.SALARY]: salaryColumn,
  };
