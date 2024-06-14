import type { OrganisationSyncStatus } from './organisation';
import type { Payroll } from './payroll';

export interface EmployeeSalary {
  value: number | null;
  decimal: number | null;
}

export interface EmployeeSync {
  lastSyncAt: Date;
  syncedAt?: Date;
  status: OrganisationSyncStatus;
}

export interface EmployeeInfo {
  firstName: string;
  lastName: string;
  dateOfBirth?: Date;
  tfn?: string;
  email?: string;
  salary?: EmployeeSalary;
}
export interface EmployeePayrollOrganization {
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
  organisation: EmployeePayrollOrganization;
}

export type Employee = {
  id: number;
  active: boolean;
  info: EmployeeInfo;
  metadata: EmployeeMetadata;
  payroll: EmployeePayroll;
};
