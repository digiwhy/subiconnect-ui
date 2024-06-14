import type { Employee } from '../../../types/employee';

export enum EmployeeAllowedSelectProps {
  SALARY = 'salary',
}

export type GetEmployeesResponse = Employee[];
