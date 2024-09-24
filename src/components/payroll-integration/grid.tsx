import { Card } from './card';
import { PayrollSystemProvider } from './context';
import { PayrollIntegrationProvider } from '@/context/payroll-integration';
import { cn } from '@/lib/utils';
import type { AccountPayrollSystemExtended } from '@/types/application';
import React from 'react';

export type PayrollIntegrationListGridProps = {
  payrollSystems: Array<AccountPayrollSystemExtended>;
  onIntegrationSuccess?: (
    payrollSystem: AccountPayrollSystemExtended,
  ) => Promise<void>;
  containerClassName?: string;
};

const PayrollIntegrationListGrid: React.FC<PayrollIntegrationListGridProps> = ({
  payrollSystems = [],
  containerClassName,
  onIntegrationSuccess,
}) => {
  return (
    <div
      id='subi-connect-payroll-integration-grid'
      className={cn(
        'sc-relative sc-grid sc-w-full sc-grid-cols-[repeat(auto-fill,_minmax(20rem,1fr))] sc-gap-4',
        containerClassName,
      )}
    >
      {payrollSystems?.map((payrollSystem) => {
        return (
          <PayrollSystemProvider
            key={payrollSystem.id}
            payrollSystem={payrollSystem}
          >
            <PayrollIntegrationProvider
              onIntegrationSuccess={onIntegrationSuccess}
            >
              <Card />
            </PayrollIntegrationProvider>
          </PayrollSystemProvider>
        );
      })}
    </div>
  );
};

export default PayrollIntegrationListGrid;
