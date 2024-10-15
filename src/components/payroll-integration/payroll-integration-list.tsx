import { DataTableError } from './get-error';
import PayrollIntegrationListGrid, {
  type PayrollIntegrationListGridProps,
} from './grid';
import { Loading } from './loading';
import { usePayrollSystems } from '@/hooks/use-payroll-systems';
import type { TypedOmit } from '@/types/utils';
import React from 'react';

export type PayrollIntegrationListProps = {
  /**
   * The custom error to display if there is an error.
   */
  error?: React.ReactNode;
} & TypedOmit<PayrollIntegrationListGridProps, 'payrollSystems'>;

const PayrollIntegrationList: React.FC<PayrollIntegrationListProps> = ({
  error,
  ...gridProps
}) => {
  const { data: payrollSystems, isLoading, isError } = usePayrollSystems();

  if (isLoading || !payrollSystems) {
    return <Loading title={'Loading Payroll Integrations'} />;
  }

  if (isError) {
    return error ?? <DataTableError context='the payroll integrations' />;
  }

  if (payrollSystems.count === 0) {
    return (
      <div className='sc-flex sc-h-full sc-w-full sc-items-center sc-justify-center'>
        No Payroll Integrations
      </div>
    );
  }

  return (
    <PayrollIntegrationListGrid
      payrollSystems={payrollSystems.results}
      {...gridProps}
    />
  );
};

export default PayrollIntegrationList;
