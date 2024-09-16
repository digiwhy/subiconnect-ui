import { usePayrollSystemContext } from '../../context';
import { BaseCard } from '../base-card';
import useSearchParams from '@/hooks/internal/use-serach-params';
import { useCompany } from '@/hooks/use-company';
import { getPayrollFriendlyName } from '@/lib/utils';
import { SearchParam } from '@/types/query';
import { Button } from '@/ui/button';
import { Skeleton } from '@/ui/skeleton';
import { MoveRightIcon } from 'lucide-react';
import React from 'react';

const ConnectedAction = () => {
  const { payrollSystem } = usePayrollSystemContext();
  const { setSearchParam } = useSearchParams();

  const handleClick = () => {
    setSearchParam(SearchParam.PAYROLL_SYSTEM, payrollSystem.name);
  };

  return (
    <Button
      onClick={handleClick}
      variant={'outline'}
      className='sc-group sc-flex sc-w-full sc-items-center sc-gap-2 sc-whitespace-normal'
    >
      Manage
      <MoveRightIcon className='sc-h-4 sc-w-4 sc-transition-transform group-hover:sc-translate-x-1' />
    </Button>
  );
};

export const ConnectedCard = () => {
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
        You have successfully connected{' '}
        <span className='sc-font-mainMedium'>
          {getPayrollFriendlyName(payrollSystem)}
        </span>{' '}
        to your{' '}
        <span className='sc-font-mainMedium'>{company?.account.name}</span>{' '}
        account.
      </p>
    );
  }

  return (
    <BaseCard
      description={description}
      banner={undefined}
      action={<ConnectedAction />}
    />
  );
};
