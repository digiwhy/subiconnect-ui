import { Card, ManualCard } from './card';
import { ManualPayrollSystemProvider } from '@/context/integration/manual-payroll-system';
import { PayrollSystemProvider } from '@/context/integration/payroll-system';
import { PayrollIntegrationProvider } from '@/context/payroll-integration';
import { cn } from '@/lib/utils';
import { PayrollConnectionTypeEnum } from '@/services/api/payroll/types';
import type {
  AccountPayrollSystemExtended,
  ManualIntegrationAccountPayrollSystemExtended,
} from '@/types/application';
import React from 'react';

export type PayrollIntegrationListGridProps = {
  /**
   * The payroll systems to display.
   */
  payrollSystems: Array<AccountPayrollSystemExtended>;

  /**
   * A function to call when an integration is successful.
   * @param payrollSystem The payroll system that was integrated.
   * @returns A promise that resolves when the integration is successful.
   */
  onIntegrationSuccess?: (
    payrollSystem:
      | AccountPayrollSystemExtended
      | ManualIntegrationAccountPayrollSystemExtended,
  ) => Promise<void>;

  /**
   * The manual integrations to display alongside the payroll systems.
   */
  manualIntegrations?: Array<ManualIntegrationAccountPayrollSystemExtended>;

  /**
   * The custom class name to apply to the container.
   */
  containerClassName?: string;

  /**
   * Whether to show the manual connection types returned from Subi Connect.
   */
  showManualConnectionTypes?: boolean;
};

const PayrollIntegrationListGrid: React.FC<PayrollIntegrationListGridProps> = ({
  payrollSystems = [],
  containerClassName,
  onIntegrationSuccess,
  manualIntegrations = [],
  showManualConnectionTypes = false,
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
        if (
          !showManualConnectionTypes &&
          payrollSystem.payrollConnectionType ===
            PayrollConnectionTypeEnum.MANUALLY
        ) {
          return null;
        }

        return (
          <PayrollSystemProvider
            key={payrollSystem.id}
            payrollSystem={payrollSystem}
          >
            <PayrollIntegrationProvider
              payrollSystem={payrollSystem}
              onIntegrationSuccess={onIntegrationSuccess}
            >
              <Card />
            </PayrollIntegrationProvider>
          </PayrollSystemProvider>
        );
      })}

      {manualIntegrations?.map((manualIntegration) => {
        return (
          <ManualPayrollSystemProvider
            key={manualIntegration.friendlyName}
            payrollSystem={manualIntegration}
          >
            <PayrollIntegrationProvider
              payrollSystem={manualIntegration}
              onIntegrationSuccess={onIntegrationSuccess}
            >
              <ManualCard />
            </PayrollIntegrationProvider>
          </ManualPayrollSystemProvider>
        );
      })}
    </div>
  );
};

export default PayrollIntegrationListGrid;
