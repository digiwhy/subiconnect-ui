import type { ListOptions } from '../../../types/components/data-table';
import type { Employee } from '../../../types/employee';
import type { DeepPartial } from '../../../types/main';

export enum EmployeeAllowedSelectProps {
  SALARY = 'salary',
}

export type GetEmployeesResponse = Employee[];

export type EmployeeFilterFields = Pick<
  Employee['info'],
  'firstName' | 'lastName' | 'tfn' | 'email'
>;

export type ListAllEmployeesOptions = ListOptions &
  Partial<EmployeeFilterFields> & {
    params?: ListOptions['params'] &
      DeepPartial<EmployeeFilterFields> & {
        fields?: EmployeeAllowedSelectProps[];
      };
  };
