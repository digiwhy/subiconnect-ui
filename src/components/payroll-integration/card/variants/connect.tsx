import { useCompany } from '../../../../hooks/use-company';
import { getPayrollFriendlyName } from '../../../../lib/utils';
import { Button } from '../../../../ui/button';
import { Skeleton } from '../../../../ui/skeleton';
import Integrate from '../../../connect-and-integrate';
import { usePayrollSystemContext } from '../../context';
import { BaseCard } from '../base-card';
import { useQueryClient } from '@tanstack/react-query';
import React from 'react';

const Trigger = React.forwardRef<
  HTMLButtonElement,
  React.ComponentPropsWithoutRef<typeof Button>
>(({ ...props }, ref) => (
  <Button
    ref={ref}
    className='sc-flex sc-w-full sc-items-center sc-gap-2 sc-whitespace-normal'
    {...props}
  >
    Connect
  </Button>
));

Trigger.displayName = 'Trigger';

const ConnectAction: React.FC = () => {
  const queryClient = useQueryClient();

  const handleIntegrateOnSuccess = React.useCallback(() => {
    queryClient.invalidateQueries({
      queryKey: ['subi-connect', 'payroll system', 'list'],
    });
  }, []);

  return <Integrate Trigger={Trigger} onSuccess={handleIntegrateOnSuccess} />;
};

export const ConnectCard: React.FC = () => {
  const { payrollSystem } = usePayrollSystemContext();
  const { data: company } = useCompany();

  let description;

  if (!company) {
    description = (
      <div className='sc-flex sc-flex-col sc-gap-[0.4rem]'>
        <Skeleton className='sc-h-5 sc-w-full' />
        <Skeleton className='sc-h-5 sc-w-full' />
        <Skeleton className='sc-h-5 sc-w-full' />
      </div>
    );
  } else {
    description = (
      <p className='sc-font-light'>
        Connect{' '}
        <span className='sc-font-mainMedium'>
          {getPayrollFriendlyName(payrollSystem)}
        </span>{' '}
        to automatically add employees to your{' '}
        <span className='sc-font-mainMedium'>{company?.account.name}</span>{' '}
        account.
      </p>
    );
  }

  return (
    <BaseCard
      description={description}
      banner={undefined}
      action={<ConnectAction />}
    />
  );
};
