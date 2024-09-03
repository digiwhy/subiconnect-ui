'use client';

import { PayrollIntegrationList } from '../../components';
import { usePayrollSystems } from '../../hooks';
import useSearchParams, {
  SEARCH_PARAM_UPDATE_EVENT,
} from '../../hooks/internal/use-serach-params';
import { useCompany } from '../../hooks/use-company';
import { cn } from '../../lib/utils';
import type { Payroll } from '../../types/payroll';
import { SearchParam } from '../../types/query';
import { Skeleton } from '../../ui/skeleton';
import PayrollIntegrationManagementPage from '../payroll-integration-management';
import { RefreshCwIcon } from 'lucide-react';
import React from 'react';

const PayrollIntegrationsPage: React.FC<{ className?: string }> = ({
  className,
}) => {
  const { data: company } = useCompany();
  const { isFetching } = usePayrollSystems();
  const { getSearchParam } = useSearchParams();
  const [payroll, setPayroll] = React.useState<Payroll | null>(null);

  React.useEffect(() => {
    const handleSearchChange = () => {
      const newPayroll = getSearchParam(
        SearchParam.PAYROLL_SYSTEM,
      ) as Payroll | null;
      setPayroll(newPayroll);
    };

    // Set initial value
    handleSearchChange();

    // Listen for changes to the search parameters
    window.addEventListener(SEARCH_PARAM_UPDATE_EVENT, handleSearchChange);

    return () => {
      window.removeEventListener(SEARCH_PARAM_UPDATE_EVENT, handleSearchChange);
    };
  }, [getSearchParam]);

  if (payroll) {
    return <PayrollIntegrationManagementPage payroll={payroll} />;
  }

  return (
    <div
      className={cn(
        'sc-flex sc-h-full sc-w-full sc-flex-col sc-gap-4 sc-p-4',
        className,
      )}
    >
      <div className='sc-flex sc-items-start sc-justify-between'>
        <div className='sc-flex sc-flex-col sc-gap-1'>
          <span className='sc-font-mainMedium sc-text-lg sc-text-secondary'>
            Integrations
          </span>
          {company ? (
            <span className='sc-text-xs sc-text-secondary/50'>
              Connect your payroll tool to your {company?.account?.name}{' '}
              account.
            </span>
          ) : (
            <Skeleton className='sc-h-5 sc-w-64' />
          )}
        </div>

        {isFetching && (
          <div className='sc-flex sc-flex-row sc-items-center sc-justify-between sc-gap-2 sc-text-xs sc-text-muted-foreground/50'>
            <span>Refreshing</span>
            <RefreshCwIcon className='sc-h-3 sc-w-3 sc-animate-spin' />
          </div>
        )}
      </div>
      <div className='sc-h-full sc-w-full'>
        <PayrollIntegrationList />
      </div>
    </div>
  );
};

export default PayrollIntegrationsPage;
