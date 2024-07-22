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

export interface EmployeeSalary {
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
}

export interface EmployeeCalendar {
  paycycle?: EmployeeCalendarType;
  nextPaymentDate?: string;
  startEmploymentDate?: string;
}

export interface EmployeeSync {
  lastSyncAt: Date;
  syncedAt?: Date;
  status: SyncStatus;
}

export interface EmployeeInfo {
  firstName: string;
  lastName: string;
  dateOfBirth?: Date;
  tfn?: string;
  email?: string;
  salary?: EmployeeSalary;
  calendar?: EmployeeCalendar;
}
export interface EmployeePayrollOrganisation {
  id: number;
  name: string;
  referenceId: string;
}

export interface EmployeeMetadata {
  sync: EmployeeSync;
  createdAt: Date;
  updatedAt?: Date;
}

export interface EmployeePayroll {
  name: Payroll;
  referenceEmployeeId: string;
  organisation: EmployeePayrollOrganisation;
}

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
  START_EMPLOYEMENT_DATE = 'startEmploymentDate',
  PAYCYCLE = 'paycycle',
}
