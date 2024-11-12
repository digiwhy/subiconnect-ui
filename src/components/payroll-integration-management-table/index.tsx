import { columns } from './columns';
import { useSubiConnectContext } from '@/context/subi-connect';
import { listOrganisationsFromPayroll } from '@/services/api/payroll/actions';
import type { ListOptions } from '@/types/components/data-table';
import GenericTable from '@/ui/extended/table/generic-table';
import React from 'react';

const PayrollIntegrationManagementTable: React.FC<{
  payrollSystemId: number;
}> = ({ payrollSystemId }) => {
  const { connectionService } = useSubiConnectContext();

  const listAction = React.useCallback(
    (options: ListOptions | undefined) =>
      listOrganisationsFromPayroll(connectionService)(payrollSystemId, options),
    [payrollSystemId, connectionService],
  );

  return (
    <GenericTable
      name={'Organisation'}
      listAction={listAction}
      columns={columns}
      queryKeyFilters={{ payrollSystemId }}
    />
  );
};

export default PayrollIntegrationManagementTable;
