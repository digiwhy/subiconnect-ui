import { PayrollIntegrationProvider } from '../../context/payroll-integration';
import { usePayrollSystems } from '../../hooks/use-payroll-systems';
import { DataTableError } from './get-error';
import PayrollIntegrationListGrid, {
  type PayrollIntegrationListGridProps,
} from './grid';
import { Loading } from './loading';
import React from 'react';

type OmittedGridProps = keyof Pick<
  PayrollIntegrationListGridProps,
  'payrollSystems'
>;

export type PayrollIntegrationListProps = {
  gridProps?: Omit<PayrollIntegrationListGridProps, OmittedGridProps>;
};
const PayrollIntegrationList: React.FC<PayrollIntegrationListProps> = ({
  gridProps,
}) => {
  const { data: payrollSystems, isLoading, isError } = usePayrollSystems();

  if (isLoading || !payrollSystems) {
    return <Loading title={'Loading Payroll Integrations'} />;
  }

  if (isError) {
    return <DataTableError context='the payroll integrations' />;
  }

  return (
    <PayrollIntegrationProvider>
      <PayrollIntegrationListGrid
        payrollSystems={payrollSystems.results}
        {...gridProps}
      />
    </PayrollIntegrationProvider>
  );
};

export default PayrollIntegrationList;
