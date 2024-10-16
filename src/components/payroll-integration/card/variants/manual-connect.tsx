import { BaseCard } from '../base-card';
import ManualConnectAndIntegrate from '@/components/connect-and-integrate/manual';
import { useManualPayrollSystemContext } from '@/hooks/integration/context/use-manual-payroll-system-context';
import { getPayrollFriendlyName } from '@/lib/utils';
import { Button } from '@/ui/button';
import React from 'react';

const manualConnectTrigger = ({ title }: { title: string }) => {
  const Trigger = React.forwardRef<
    HTMLButtonElement,
    React.ComponentPropsWithoutRef<typeof Button>
  >(({ ...props }, ref) => (
    <Button
      ref={ref}
      className='sc-flex sc-w-fit sc-items-center sc-gap-2 sc-whitespace-normal'
      {...props}
    >
      {title}
    </Button>
  ));

  Trigger.displayName = 'ManualConnectTrigger';

  return Trigger;
};

const ManualConnectAction: React.FC<{ title: string }> = ({ title }) => {
  const Trigger = React.useMemo(() => manualConnectTrigger({ title }), [title]);
  return <ManualConnectAndIntegrate Trigger={Trigger} />;
};

export const ManualConnectCard: React.FC = () => {
  const { payrollSystem } = useManualPayrollSystemContext();

  return (
    <BaseCard
      title={getPayrollFriendlyName({
        name: 'MANUAL',
        friendlyName: payrollSystem.friendlyName,
      })}
      bannerSrc={payrollSystem.bannerImgUrl}
      description={payrollSystem.description}
      banner={undefined}
      action={<ManualConnectAction title={payrollSystem.actionButtonText} />}
    />
  );
};
