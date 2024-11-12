'use client';

import { PayrollIntegrationManagementTable } from '@/components';
import ConnectAndIntegrate from '@/components/connect-and-integrate';
import { Loading } from '@/components/payroll-integration/loading';
import { PayrollSystemProvider } from '@/context/integration/payroll-system';
import { PayrollIntegrationProvider } from '@/context/payroll-integration';
import { useSubiConnectContext } from '@/context/subi-connect';
import useSearchParams from '@/hooks/internal/use-serach-params';
import { useAccountPayrollSystem } from '@/hooks/use-account-payroll';
import { BASE_ORGANISATION_QUERY_KEY } from '@/hooks/use-organisations';
import { cn, getPayrollFriendlyName } from '@/lib/utils';
import type {
  AccountPayrollSystemExtended,
  ManualIntegrationAccountPayrollSystemExtended,
} from '@/types/application';
import { SUBI_CONNECT_QUERY_KEY } from '@/types/main';
import type { Payroll } from '@/types/payroll';
import { SearchParam } from '@/types/query';
import { Button } from '@/ui/button';
import { Skeleton } from '@/ui/skeleton';
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
    <span className='sc-hidden sm:sc-block'>Add another organisation</span>
  </Button>
));

Trigger.displayName = 'Trigger';

const BackLeftChevrons = () => {
  return (
    <div className='pr-2 sc-absolute sc-h-4 sc-w-4 sc-opacity-0 sc-duration-200 group-hover:sc-opacity-100 group-hover:sc-delay-100 max-sm:sc-opacity-100'>
      <ChevronLeftIcon className='sc-absolute sc-left-1 sc-top-0 sc-my-auto sc-h-4 sc-w-4 group-hover:sc-delay-100 max-sm:-sc-translate-x-1 sm:group-hover:-sc-translate-x-1' />
      <ChevronLeftIcon className='sc-absolute sc-left-1 sc-h-4 sc-w-4 group-hover:sc-delay-100 max-sm:-sc-translate-x-2 sm:group-hover:-sc-translate-x-2' />
    </div>
  );
};

const Header: React.FC<{
  disableBack?: boolean;
  accountPayroll: AccountPayrollSystemExtended | undefined;
}> = ({ accountPayroll, disableBack = false }) => {
  const { setSearchParam } = useSearchParams();

  const handleBack = () => {
    if (disableBack) return;
    setSearchParam(SearchParam.PAYROLL_SYSTEM, undefined);
  };

  return (
    <div className='sc-flex sc-w-full sc-justify-between sc-gap-4'>
      <div className='sc-flex sc-flex-col sc-gap-1'>
        <div
          onClick={handleBack}
          className={cn(
            'sc-group sc-relative sc-flex sc-flex-row sc-items-center [&_*]:sc-transition [&_*]:sc-duration-300 [&_*]:sc-ease-in-out',
            { 'sc-cursor-pointer': !disableBack },
          )}
        >
          {!disableBack && <BackLeftChevrons />}
          <span
            className={cn(
              'sc-font-mainMedium sc-text-lg sc-text-secondary sc-delay-100 max-sm:sc-translate-x-4',
              {
                'sm:group-hover:sc-translate-x-4 sm:group-hover:sc-delay-0':
                  !disableBack,
              },
            )}
          >
            Connected Integration
          </span>
        </div>
        {!accountPayroll ? (
          <Skeleton className='sc-h-4 sc-w-10' />
        ) : (
          <span className='sc-font-mainMedium sc-text-xs sc-text-secondary/50'>
            {getPayrollFriendlyName(accountPayroll)}
          </span>
        )}
      </div>

      {!!accountPayroll && <ConnectAndIntegrate Trigger={Trigger} />}
    </div>
  );
};

const PayrollIntegrationManagementPage: React.FC<{
  payroll: Payroll;
  onIntegrationSuccess?: (
    payrollSystem:
      | AccountPayrollSystemExtended
      | ManualIntegrationAccountPayrollSystemExtended,
  ) => Promise<void>;
  disableBack?: boolean;
  className?: string;
}> = ({ payroll, onIntegrationSuccess, disableBack = false, className }) => {
  const queryClient = useQueryClient();
  const { connectionService } = useSubiConnectContext();
  const { setSearchParam } = useSearchParams();
  const {
    data: accountPayroll,
    isLoading,
    isError,
  } = useAccountPayrollSystem(payroll);

  const handleIntegrationSuccess = React.useCallback(
    async (
      accountPayroll:
        | AccountPayrollSystemExtended
        | ManualIntegrationAccountPayrollSystemExtended,
    ) => {
      await queryClient.invalidateQueries({
        queryKey: [
          SUBI_CONNECT_QUERY_KEY,
          { context: connectionService.getContext() },
          BASE_ORGANISATION_QUERY_KEY,
          'list',
        ],
      });

      await onIntegrationSuccess?.(accountPayroll);
    },
    [onIntegrationSuccess, queryClient, connectionService],
  );

  if (isLoading || !accountPayroll) {
    return (
      <div
        className={cn(
          'sc-flex sc-h-full sc-w-full sc-flex-col sc-gap-4 sc-p-4',
          className,
        )}
      >
        <Header disableBack={disableBack} accountPayroll={accountPayroll} />
        <div className='sc-h-full sc-w-full'>
          <Loading title={'Loading Organisations'} />
        </div>
      </div>
    );
  }

  if (isError) {
    setSearchParam(SearchParam.PAYROLL_SYSTEM, undefined);
    return null;
  }

  return (
    <PayrollSystemProvider payrollSystem={accountPayroll}>
      <PayrollIntegrationProvider
        payrollSystem={accountPayroll}
        onIntegrationSuccess={handleIntegrationSuccess}
      >
        <div
          className={cn(
            'sc-flex sc-h-full sc-w-full sc-flex-col sc-gap-4 sc-p-4',
            className,
          )}
        >
          <Header disableBack={disableBack} accountPayroll={accountPayroll} />

          <div className='sc-h-full sc-w-full'>
            <PayrollIntegrationManagementTable
              payrollSystemId={accountPayroll.payrollId}
            />
          </div>
        </div>
      </PayrollIntegrationProvider>
    </PayrollSystemProvider>
  );
};

export default PayrollIntegrationManagementPage;
