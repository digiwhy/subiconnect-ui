import { columns } from './columns';
import { useSubiConnectContext } from '@/context/subi-connect';
import { listOrganisationsFromPayroll } from '@/services/api/payroll/actions';
import type { ListOptions } from '@/types/components/data-table';
import GenericTable from '@/ui/extended/table/generic-table';
import React from 'react';

const PayrollIntegrationManagementTable: React.FC<{
  accountPayrollId: number;
}> = ({ accountPayrollId }) => {
  const { connectionService } = useSubiConnectContext();

  const listAction = React.useCallback(
    (options: ListOptions | undefined) =>
      listOrganisationsFromPayroll(connectionService)(
        accountPayrollId,
        options,
      ),
    [accountPayrollId, connectionService],
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
