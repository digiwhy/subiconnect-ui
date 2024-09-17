import { DataTableError } from './get-error';
import PayrollIntegrationListGrid, {
  type PayrollIntegrationListGridProps,
} from './grid';
import { Loading } from './loading';
import { PayrollIntegrationProvider } from '@/context/payroll-integration';
import { usePayrollSystems } from '@/hooks/use-payroll-systems';
import type { AccountPayrollSystemExtended } from '@/types';
import React from 'react';

type OmittedGridProps = keyof Pick<
  PayrollIntegrationListGridProps,
  'payrollSystems'
>;

export type PayrollIntegrationListProps = {
  onIntegrationSuccess?: (
    payrollSystem: AccountPayrollSystemExtended,
  ) => Promise<void>;
  gridProps?: Omit<PayrollIntegrationListGridProps, OmittedGridProps>;
  hideError?: boolean;
};

const PayrollIntegrationList: React.FC<PayrollIntegrationListProps> = ({
  onIntegrationSuccess,
  gridProps,
  hideError = false,
}) => {
  const { data: payrollSystems, isLoading, isError } = usePayrollSystems();

  if (isLoading || !payrollSystems) {
    return <Loading title={'Loading Payroll Integrations'} />;
  }

  if (isError && !hideError) {
    return <DataTableError context='the payroll integrations' />;
  }

  if (payrollSystems.count === 0) {
    return (
      <div className='sc-flex sc-h-full sc-w-full sc-items-center sc-justify-center'>
        No Payroll Integrations
      </div>
    );
  }

  return (
    <PayrollIntegrationProvider onIntegrationSuccess={onIntegrationSuccess}>
      <PayrollIntegrationListGrid
        payrollSystems={payrollSystems.results}
        {...gridProps}
      />
    </PayrollIntegrationProvider>
  );
};

export default PayrollIntegrationList;
