import { PayrollIntegrationManagementTable } from '../../components';
import Integrate from '../../components/connect-and-integrate';
import { PayrollSystemProvider } from '../../components/payroll-integration/context';
import { PayrollIntegrationProvider } from '../../context/payroll-integration';
import { BASE_ORGANISATION_QUERY_KEY } from '../../hooks/use-organisations';
import { cn } from '../../lib/utils';
import type { AccountPayrollSystemExtended } from '../../types/application';
import { Button } from '../../ui/button';
import { useQueryClient } from '@tanstack/react-query';
import { PlusIcon } from 'lucide-react';
import React from 'react';

const Trigger = React.forwardRef<
  HTMLButtonElement,
  React.ComponentPropsWithoutRef<typeof Button>
>(({ ...props }, ref) => (
  <Button
    size='sm'
    variant='outline'
    className='sc-flex sc-items-center sc-gap-2'
    {...props}
    ref={ref}
  >
    <PlusIcon className='sc-h-4 sc-w-4' />
    <span>Add another organisation</span>
  </Button>
));

const PayrollIntegrationManagementPage: React.FC<{
  accountPayroll: AccountPayrollSystemExtended;
  className?: string;
}> = ({ accountPayroll: payroll, className }) => {
  const queryClient = useQueryClient();

  const handleIntegrateOnSuccess = React.useCallback(() => {
    queryClient.invalidateQueries({
      queryKey: [...BASE_ORGANISATION_QUERY_KEY, 'list'],
    });
  }, []);

  return (
    <PayrollSystemProvider payrollSystem={payroll}>
      <PayrollIntegrationProvider>
        <div
          className={cn(
            'subi-connect sc-flex sc-h-full sc-w-full sc-flex-col sc-gap-4 sc-p-4',
            className,
          )}
        >
          <div className='sc-flex sc-w-full sc-justify-between sc-gap-4'>
            <div className='sc-flex sc-flex-col sc-gap-1'>
              <span className='sc-font-mainMedium sc-text-lg sc-text-secondary'>
                Connected Integration
              </span>
              <span className='sc-font-mainMedium sc-text-xs sc-text-secondary/50'>
                {payroll.name}
              </span>
            </div>

            <Integrate Trigger={Trigger} onSuccess={handleIntegrateOnSuccess} />
          </div>
          <div className='sc-h-full sc-w-full'>
            <PayrollIntegrationManagementTable accountPayrollId={payroll.id} />
          </div>
        </div>
      </PayrollIntegrationProvider>
    </PayrollSystemProvider>
  );
};

export default PayrollIntegrationManagementPage;
