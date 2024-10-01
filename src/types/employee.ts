import type { SyncStatus } from './main';
import type { Payroll } from './payroll';

/**
 * Enumeration representing the types of employee calendars for scheduling payroll.
 * It is based on Xero's API: https://central.xero.com/s/article/Add-a-pay-calendar-AU
 * @enum {string}
 */
export enum EmployeeCalendarType {
  WEEKLY = 'WEEKLY',
  MONTHLY = 'MONTHLY',
  FORTNIGHTLY = 'FORTNIGHTLY',
  FOURWEEKLY = 'FOURWEEKLY',
  TWICEMONTHLY = 'TWICEMONTHLY',
  QUARTERLY = 'QUARTERLY',
}

export type EmployeeSalary = {
  /**
   * The id of the salary.
   */
  id: number;

  /**
   * The decimals for the currency.
   */
  decimal: number | null;

  /**
   * The salary of the employee in the currency.
   * E.g., value = 5000000; decimal = 2 => $50,000.00
   */
  value?: number | null;

  /**
   * The calculated hourly rate of the employee based on their yearly salary.
   */
  hourlyRate?: number | null;
};

export type EmployeeCalendar = {
  /**
   * The id of the calendar.
   */
  id: number;

  /**
   * The type of pay cycle for the employee.
   */
  paycycle: EmployeeCalendarType;

  /**
   * The next payment date for the employee.
   */
  nextPaymentDate: string;

  /**
   * The start employment date for the employee.
   */
  startEmploymentDate: string;
};

export type EmployeeSync = {
  lastSyncAt: Date;
  syncedAt?: Date;
  status: SyncStatus;
};

export type EmployeeInfo = {
  firstName: string;
  lastName: string;
  dateOfBirth?: Date;
  tfn?: string;
  emails?: string[];
  salaries?: EmployeeSalary[];
  calendars?: EmployeeCalendar[];
};

export type EmployeePayrollOrganisation = {
  id: number;
  name: string;
  referenceId: string;
};

export type EmployeeMetadata = {
  sync: EmployeeSync;
  createdAt: Date;
  updatedAt?: Date;
};

export type EmployeePayroll = {
  name: Payroll;
  referenceEmployeeId: string;
  organisation: EmployeePayrollOrganisation;
};

export type Employee = {
  id: number;
  active: boolean;
  info: EmployeeInfo;
  metadata: EmployeeMetadata;
  payroll: EmployeePayroll;
};

export enum SelectableEmployeeColumns {
  SALARY = 'salary',
  HOURLY_RATE = 'hourlyRate',
  NEXT_PAYMENT_DATE = 'nextPaymentDate',
  START_EMPLOYMENT_DATE = 'startEmploymentDate',
  PAYCYCLE = 'paycycle',
}
