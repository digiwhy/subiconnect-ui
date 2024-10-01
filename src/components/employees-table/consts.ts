import { nextPaymentDateColumn } from './columns/additional-fields/calendar/next-payment-date';
import { payCycleColumn } from './columns/additional-fields/calendar/paycycle';
import { startEmploymentDateColumn } from './columns/additional-fields/calendar/start-employment-date';
import { hourlyRateColumn } from './columns/additional-fields/hourly-rate';
import { salaryColumn } from './columns/additional-fields/salary';
import { type EmployeesTableAllowedColumnsMap } from './types';
import { SelectableEmployeeColumns } from '@/types/employee';

export const EMPLOYEES_TABLE_ALLOWED_COLUMNS_MAP: EmployeesTableAllowedColumnsMap =
  {
    [SelectableEmployeeColumns.SALARY]: salaryColumn,
    [SelectableEmployeeColumns.HOURLY_RATE]: hourlyRateColumn,
    [SelectableEmployeeColumns.NEXT_PAYMENT_DATE]: nextPaymentDateColumn,
    [SelectableEmployeeColumns.START_EMPLOYMENT_DATE]:
      startEmploymentDateColumn,
    [SelectableEmployeeColumns.PAYCYCLE]: payCycleColumn,
  };
