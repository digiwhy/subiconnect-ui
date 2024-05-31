import { usePayrollIntegrationContext } from '../../context/payroll-integration';
import { cn } from '../../lib/utils';
import { handleOAuth2OnSuccess } from '../../services/auth2.0/auth-window';
import type { AccountPayrollSystemExtended } from '../../types/application';
import { Button } from '../../ui/button';
import { Card } from './card';
import { PayrollSystemProvider } from './context';
import { Loading } from './loading';
import { useQueryClient } from '@tanstack/react-query';
import React from 'react';

export type PayrollIntegrationListGridProps = {
  payrollSystems: Array<AccountPayrollSystemExtended>;
  containerClassName?: string;
};

const PayrollIntegrationListGrid: React.FC<PayrollIntegrationListGridProps> = ({
  payrollSystems,
  containerClassName,
}) => {
  const { isPending, data, setIsPending, setWindowFailed, windowFailed } =
    usePayrollIntegrationContext();
  const queryClient = useQueryClient();

  const handleIntegrateOnSuccess = React.useCallback(() => {
    queryClient.invalidateQueries({
      queryKey: ['subi-connect', 'payroll system', 'list', { connected: true }],
    });
  }, []);

  const handleAuthWindow = async () => {
    if (data) {
      await handleOAuth2OnSuccess(
        undefined,
        data.redirectUri!,
        setIsPending,
        setWindowFailed,
        handleIntegrateOnSuccess,
      );
    }
  };

  return (
    <div
      className={cn(
        'subi-connect sc-relative sc-grid sc-h-full sc-w-full sc-grid-cols-2 sc-gap-4 md:sc-grid-cols-3 xl:sc-grid-cols-4',
        containerClassName,
      )}
    >
      <div
        className={cn(
          'sc-absolute sc-h-full sc-w-full sc-items-center sc-justify-center sc-gap-2 sc-bg-background/50 sc-backdrop-blur-md',
          isPending ? 'sc-z-10 sc-flex' : '-sc-z-10 sc-hidden',
        )}
      >
        <Loading
          title={
            <div>
              Please finish your current integration.{' '}
              {!!data && windowFailed && (
                <div className='sc-flex sc-flex-col'>
                  <span>
                    If you can't see the authenitcation window, please{' '}
                  </span>
                  <Button onClick={handleAuthWindow} variant={'link'}>
                    click here.
                  </Button>
                </div>
              )}
            </div>
          }
        />
      </div>

      {payrollSystems.map((payrollSystem) => {
        return (
          <PayrollSystemProvider
            key={payrollSystem.id}
            payrollSystem={payrollSystem}
          >
            <Card />
          </PayrollSystemProvider>
        );
      })}
    </div>
  );
};

export default PayrollIntegrationListGrid;
