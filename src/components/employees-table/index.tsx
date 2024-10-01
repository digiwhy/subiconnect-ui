import { useSubiConnectContext } from '@/context/subi-connect';
import { CalendarProvider } from '@/context/table/columns/calendars/calendar-context';
import { SalaryProvider } from '@/context/table/columns/salaries/salary-context';
import { listAllEmployees } from '@/services/api/employee/actions';
import { listAllOrganisations } from '@/services/api/payroll/actions';
import type { ColumnDef, ListOptions } from '@/types/components/data-table';
import { SelectableEmployeeColumns, type Employee } from '@/types/employee';
import type { DataTableToolbarFilterOptions } from '@/ui/data-table-toolbar';
import GenericTable from '@/ui/extended/table/generic-table';
import React from 'react';

const EmployeesTable: React.FC<{
  columns: ColumnDef<Employee>[];
  enabledColumns?: SelectableEmployeeColumns[];
}> = ({ columns, enabledColumns = [] }) => {
  const { connectionService } = useSubiConnectContext();

  const listAction = React.useCallback(
    (options: ListOptions | undefined) =>
      listAllEmployees(connectionService)({
        ...options,
        params: { fields: enabledColumns, ...options?.params },
      }),
    [enabledColumns, connectionService],
  );

  const filterOptions = [
    {
      columnId: 'organisation',
      title: 'Organisation',
      accessorKey: 'payrollCompanyOrganisationId',
      listAction: listAllOrganisations(connectionService),
    },
  ] satisfies DataTableToolbarFilterOptions<Employee, unknown>;

  const SalaryContext = React.useCallback(
    ({ children }: { children: React.ReactNode }) => {
      const defaultSelector = enabledColumns.includes(
        SelectableEmployeeColumns.SALARY,
      )
        ? SelectableEmployeeColumns.SALARY
        : SelectableEmployeeColumns.HOURLY_RATE;
      return (
        <SalaryProvider defaultSelector={defaultSelector}>
          {children}
        </SalaryProvider>
      );
    },
    [enabledColumns],
  );

  const CalendarContext = React.useCallback(
    ({ children }: { children: React.ReactNode }) => {
      return <CalendarProvider>{children}</CalendarProvider>;
    },
    [enabledColumns],
  );

  const rowContexts = React.useMemo(() => {
    const contexts = [];
    if (
      enabledColumns.some(
        (column) =>
          column === SelectableEmployeeColumns.SALARY ||
          column === SelectableEmployeeColumns.HOURLY_RATE,
      )
    ) {
      contexts.push(SalaryContext);
    }
    if (
      enabledColumns.some(
        (column) =>
          column === SelectableEmployeeColumns.PAYCYCLE ||
          column === SelectableEmployeeColumns.NEXT_PAYMENT_DATE ||
          column === SelectableEmployeeColumns.START_EMPLOYMENT_DATE,
      )
    ) {
      contexts.push(CalendarContext);
    }
    return contexts;
  }, [enabledColumns, SalaryContext, CalendarContext]);

  return (
    <GenericTable
      name='Employee'
      listAction={listAction}
      queryKeyFilters={[{ enabledColumns }]}
      dataTableProps={{
        toolbarProps: { filterOptions, hideSearchBar: false },
        rowContexts: rowContexts,
      }}
      columns={columns}
    />
  );
};

export default EmployeesTable;
