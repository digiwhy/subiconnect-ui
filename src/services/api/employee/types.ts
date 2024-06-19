import type { ListOptions } from '../../../types/components/data-table';
import type {
  Employee,
  SelectableEmployeeColumns,
} from '../../../types/employee';
import type { DeepPartial } from '../../../types/utils';

export type GetEmployeesResponse = Employee[];

export type EmployeeFilterFields = Pick<
  Employee['info'],
  'firstName' | 'lastName' | 'tfn' | 'email'
>;

export type ListAllEmployeesOptions = ListOptions &
  Partial<EmployeeFilterFields> & {
    params?: ListOptions['params'] &
      DeepPartial<EmployeeFilterFields> & {
        fields?: SelectableEmployeeColumns[];
      };
  };
