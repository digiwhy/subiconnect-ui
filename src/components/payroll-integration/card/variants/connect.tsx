import { BaseCard } from '../base-card';
import ConnectAndIntegrate from '@/components/connect-and-integrate';
import { usePayrollSystemContext } from '@/hooks/integration/context/use-payroll-system-context';
import { useCompany } from '@/hooks/use-company';
import { getPayrollBannerImgUrl, getPayrollFriendlyName } from '@/lib/utils';
import { Button } from '@/ui/button';
import { Skeleton } from '@/ui/skeleton';
import React from 'react';

const Trigger = React.forwardRef<
  HTMLButtonElement,
  React.ComponentPropsWithoutRef<typeof Button>
>(({ ...props }, ref) => (
  <Button
    ref={ref}
    size={'sm'}
    className='sc-flex sc-w-fit sc-items-center sc-gap-2 sc-whitespace-normal'
    {...props}
  >
    Connect
  </Button>
));

Trigger.displayName = 'Trigger';

const ConnectAction: React.FC = () => {
  return <ConnectAndIntegrate Trigger={Trigger} />;
};

export const ConnectCard: React.FC = () => {
  const { payrollSystem } = usePayrollSystemContext();
  const { data: company } = useCompany();

  let description: React.ReactNode;

  if (!company) {
    description = (
      <div className='sc-flex sc-flex-col sc-gap-[0.4rem]'>
        <Skeleton className='sc-h-5 sc-w-full' />
        <Skeleton className='sc-h-5 sc-w-full' />
        <Skeleton className='sc-h-5 sc-w-full' />
      </div>
    );
  } else {
    description = `Connect ${getPayrollFriendlyName(payrollSystem)} to automatically sync your payroll data with ${company.account.name}.`;
  }

  return (
    <BaseCard
      title={getPayrollFriendlyName(payrollSystem)}
      bannerSrc={getPayrollBannerImgUrl(payrollSystem.name)}
      description={description}
      banner={undefined}
      action={<ConnectAction />}
    />
  );
};
