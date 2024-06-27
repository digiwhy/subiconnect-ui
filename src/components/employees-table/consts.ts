import { SelectableEmployeeColumns } from '../../types/employee';
import { hourlyRateColumn } from './columns/additional-fields/hourly-rate';
import { salaryColumn } from './columns/additional-fields/salary';
import { type EmployeesTableAllowedColumnsMap } from './types';

export const EMPLOYEES_TABLE_ALLOWED_COLUMNS_MAP: EmployeesTableAllowedColumnsMap =
  {
    [SelectableEmployeeColumns.SALARY]: salaryColumn,

    [SelectableEmployeeColumns.HOURLY_RATE]: hourlyRateColumn,
  };
