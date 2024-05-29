import PayrollIntegrationManagementPage from '../payroll-integration-management';
import { PayrollIntegrationList } from '@/components';
import { useCompany } from '@/hooks/company/use-company';
import { usePayrollSystems } from '@/hooks/use-payroll-systems';
import { cn } from '@/lib/utils';
import { Skeleton } from '@/ui/skeleton';
import React from 'react';

const PayrollIntegrationsListPage: React.FC<{ className?: string }> = ({
  className,
}) => {
  const { data: company } = useCompany();
  const { data: connectedPayrolls } = usePayrollSystems();

  const connectedPayroll = React.useMemo(() => {
    return (
      connectedPayrolls?.results?.find((item) => item.isConnected) || undefined
    );
  }, [connectedPayrolls]);

  // TODO: migrate to multi payroll management
  if (connectedPayrolls && connectedPayroll) {
    return <PayrollIntegrationManagementPage payroll={connectedPayroll} />;
  }

  return (
    <div
      className={cn(
        'sc-flex sc-h-full sc-w-full sc-flex-col sc-gap-4 sc-p-4',
        className,
      )}
    >
      <div className='sc-flex sc-flex-col sc-gap-1'>
        <span className='sc-font-mainMedium sc-text-lg sc-text-secondary'>
          Integrations
        </span>
        {company ? (
          <span className='sc-text-xs sc-text-secondary/50'>
            Connect {company?.account.name} with your payroll tool.
          </span>
        ) : (
          <Skeleton className='sc-h-5 sc-w-64' />
        )}
      </div>
      <div className='sc-h-full sc-w-full'>
        <PayrollIntegrationList />
      </div>
    </div>
  );
};

export default PayrollIntegrationsListPage;
