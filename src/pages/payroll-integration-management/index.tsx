'use client';

import { PayrollIntegrationManagementTable } from '../../components';
import Integrate from '../../components/connect-and-integrate';
import { PayrollSystemProvider } from '../../components/payroll-integration/context';
import { Loading } from '../../components/payroll-integration/loading';
import { PayrollIntegrationProvider } from '../../context/payroll-integration';
import useSearchParams from '../../hooks/internal/use-serach-params';
import { useAccountPayrollSystem } from '../../hooks/use-account-payroll';
import { BASE_ORGANISATION_QUERY_KEY } from '../../hooks/use-organisations';
import { cn } from '../../lib/utils';
import type { Payroll } from '../../types/payroll';
import { SearchParam } from '../../types/query';
import { Button } from '../../ui/button';
import { useQueryClient } from '@tanstack/react-query';
import { ChevronLeftIcon, PlusIcon } from 'lucide-react';
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
  payroll: Payroll;
  className?: string;
}> = ({ payroll, className }) => {
  const queryClient = useQueryClient();
  const [_, setSearchParam] = useSearchParams();
  const {
    data: accountPayroll,
    isLoading,
    isError,
  } = useAccountPayrollSystem(payroll);

  const handleBack = () => {
    setSearchParam(SearchParam.PAYROLL_SYSTEM, undefined);
  };

  const handleIntegrateOnSuccess = React.useCallback(() => {
    queryClient.invalidateQueries({
      queryKey: [...BASE_ORGANISATION_QUERY_KEY, 'list'],
    });
  }, []);

  if (isLoading || !accountPayroll) {
    return <Loading title={'Loading Organisations'} />;
  }

  if (isError) {
    // TODO
    setSearchParam(SearchParam.PAYROLL_SYSTEM, undefined);
    return null;
  }

  return (
    <PayrollSystemProvider payrollSystem={accountPayroll}>
      <PayrollIntegrationProvider>
        <div
          className={cn(
            'subi-connect sc-flex sc-h-full sc-w-full sc-flex-col sc-gap-4 sc-p-4',
            className,
          )}
        >
          <div className='sc-flex sc-w-full sc-justify-between sc-gap-4'>
            <div className='sc-flex sc-flex-col sc-gap-1'>
              <div
                onClick={handleBack}
                className='sc-flex sc-cursor-pointer sc-flex-row sc-items-center sc-gap-2'
              >
                <ChevronLeftIcon className='sc-h-4 sc-w-4' />
                <span className='sc-font-mainMedium sc-text-lg sc-text-secondary'>
                  Connected Integration
                </span>
              </div>
              <span className='sc-font-mainMedium sc-text-xs sc-text-secondary/50'>
                {accountPayroll.name}
              </span>
            </div>

            <Integrate Trigger={Trigger} onSuccess={handleIntegrateOnSuccess} />
          </div>
          <div className='sc-h-full sc-w-full'>
            <PayrollIntegrationManagementTable
              accountPayrollId={accountPayroll.id}
            />
          </div>
        </div>
      </PayrollIntegrationProvider>
    </PayrollSystemProvider>
  );
};

export default PayrollIntegrationManagementPage;
