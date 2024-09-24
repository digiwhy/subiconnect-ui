import { DataTableError } from './get-error';
import PayrollIntegrationListGrid, {
  type PayrollIntegrationListGridProps,
} from './grid';
import { Loading } from './loading';
import { usePayrollSystems } from '@/hooks/use-payroll-systems';
import type { AccountPayrollSystemExtended } from '@/types';
import React from 'react';

type OmittedGridProps = keyof Pick<
  PayrollIntegrationListGridProps,
  'payrollSystems'
>;

export type PayrollIntegrationListProps = {
  /**
   * A function to call when an integration is successful.
   * @param payrollSystem The payroll system that was integrated.
   * @returns A promise that resolves when the integration is successful.
   */
  onIntegrationSuccess?: (
    payrollSystem: AccountPayrollSystemExtended,
  ) => Promise<void>;

  /**
   * The custom error to display if there is an error.
   */
  error?: React.ReactNode;

  /**
   * The props to pass to the grid.
   */
  gridProps?: Omit<PayrollIntegrationListGridProps, OmittedGridProps>;
};

const PayrollIntegrationList: React.FC<PayrollIntegrationListProps> = ({
  onIntegrationSuccess,
  gridProps,
  error,
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
      onIntegrationSuccess={onIntegrationSuccess}
      {...gridProps}
    />
  );
};

export default PayrollIntegrationList;
