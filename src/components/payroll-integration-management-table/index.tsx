import { columns } from './columns';
import { listOrganisationsFromPayroll } from '@/services/api/payroll/actions';
import type { ListOptions } from '@/types/components/data-table';
import GenericTable from '@/ui/extended/table/generic-table';
import React from 'react';

const PayrollIntegrationManagementTable: React.FC<{
  accountPayrollId: number;
}> = ({ accountPayrollId }) => {
  const listAction = React.useCallback(
    async (options: ListOptions | undefined) =>
      await listOrganisationsFromPayroll(accountPayrollId, options),
    [accountPayrollId],
  );

  return (
    <GenericTable
      name={'Organisation'}
      listAction={listAction}
      columns={columns}
      queryKeyFilters={[{ accountPayrollId }]}
    />
  );
};

export default PayrollIntegrationManagementTable;
