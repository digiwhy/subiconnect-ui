import { usePayrollSystemContext } from '../../context';
import { Banner } from '../banner';
import { BaseCard } from '../base-card';
import { useCompany } from '@/hooks/use-company';
import { getPayrollFriendlyName } from '@/lib/utils';
import { Button } from '@/ui/button';
import { Skeleton } from '@/ui/skeleton';
import React from 'react';

const ComingSoonCardBanner = <Banner>Coming soon</Banner>;

const ComingSoonCardAction = () => {
  const handleClick = () =>
    console.log('[ComingSoonCardAction] [not implemented]');
  return (
    <Button
      variant='outline'
      className='sc-w-full sc-whitespace-normal'
      onClick={handleClick}
    >
      Request integration
    </Button>
  );
};

export const ComingSoonCard = () => {
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
        We are currently working on integrating{' '}
        <span className='sc-font-mainMedium'>
          {getPayrollFriendlyName(payrollSystem)}
        </span>{' '}
        with <span className='sc-font-mainMedium'>{company.account.name}</span>.
        Once enabledm you will be able to automatically add employees to your
        account.
      </p>
    );
  }

  return (
    <BaseCard
      description={description}
      banner={ComingSoonCardBanner}
      action={<ComingSoonCardAction />}
    />
  );
};
