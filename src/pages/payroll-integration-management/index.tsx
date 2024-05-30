import { PayrollIntegrationManagementTable } from '../../components';
import Integrate from '../../components/connect-and-integrate';
import { PayrollSystemProvider } from '../../components/payroll-integration/context';
import { PayrollIntegrationProvider } from '../../context/payroll-integration';
import { cn } from '../../lib/utils';
import type { AccountPayrollSystemExtended } from '../../types/application';
import { Button } from '../../ui/button';
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
  payroll: AccountPayrollSystemExtended;
  className?: string;
}> = ({ payroll, className }) => {
  const handleIntegrateOnSuccess = React.useCallback(() => {
    console.log('on success!');
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
                Integrations
              </span>
              <span className='sc-font-mainMedium sc-text-xs sc-text-secondary/50'>
                {payroll.name}
              </span>
            </div>

            <Integrate Trigger={Trigger} onSuccess={handleIntegrateOnSuccess} />
          </div>
          <div className='sc-h-full sc-w-full'>
            <PayrollIntegrationManagementTable payrollId={payroll.id} />
          </div>
        </div>
      </PayrollIntegrationProvider>
    </PayrollSystemProvider>
  );
};

export default PayrollIntegrationManagementPage;
