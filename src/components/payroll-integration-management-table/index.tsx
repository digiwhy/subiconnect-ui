import { columns } from './columns';
import { listOrganisationsFromPayroll } from '@/services/api/payroll/actions';
import GenericTable from '@/ui/extended/table/generic-table';
import React from 'react';

const PayrollIntegrationManagementTable: React.FC<{ payrollId: number }> = ({
  payrollId,
}) => {
  const listAction = React.useCallback(
    async () => await listOrganisationsFromPayroll(payrollId),
    [payrollId],
  );
  return (
    <GenericTable
      name={'Organisation'}
      listAction={listAction}
      columns={columns}
      queryKeyFilters={[{ payrollId }]}
    />
  );
};

export default PayrollIntegrationManagementTable;
