import { Portal as BasePortal } from './portal';
import { usePayrollIntegrationContext } from '@/context/payroll-integration';
import { useSubiConnectContext } from '@/context/subi-connect';
import { useManualPayrollSystemContext } from '@/hooks/integration/context/use-manual-payroll-system-context';
import { useIntegrateManualPayrollMutation } from '@/hooks/integration/use-integrate-manual-payroll-mutation';
import { BASE_COMPANY_QUERY_KEY } from '@/hooks/use-company';
import { BASE_PAYROLL_APPLICATION_QUERY_KEY } from '@/hooks/use-payroll-systems';
import { SUBI_CONNECT_QUERY_KEY } from '@/types/main';
import { Button } from '@/ui/button';
import { useQueryClient } from '@tanstack/react-query';
import React from 'react';

const ManualConnectAndIntegrate: React.FC<{
  Trigger: React.ForwardRefExoticComponent<
    React.ComponentPropsWithoutRef<typeof Button>
  >;
}> = React.memo(({ Trigger }) => {
  const { payrollSystem } = useManualPayrollSystemContext();

  const { mutateAsync, isPending: isConnecting } =
    useIntegrateManualPayrollMutation();

  const { setIsPending, onIntegrationSuccess } = usePayrollIntegrationContext();
  const queryClient = useQueryClient();
  const { connectionService } = useSubiConnectContext();

  /**
   * Handle the success of the integration workflow. Triggered when the integration
   * workflow is completed.
   */
  const onSuccessCallback = React.useCallback(async () => {
    // Integrate
    await mutateAsync({
      payrollName: payrollSystem.friendlyName,
    });

    await onIntegrationSuccess();

    /**
     * Invalidates the list and all details of the payroll application.
     * Invalidates the company details.
     */
    await queryClient.invalidateQueries({
      queryKey: [
        SUBI_CONNECT_QUERY_KEY,
        { context: connectionService.getContext() },
        BASE_PAYROLL_APPLICATION_QUERY_KEY,
        'list',
      ],
    });

    await queryClient.invalidateQueries({
      queryKey: [
        SUBI_CONNECT_QUERY_KEY,
        { context: connectionService.getContext() },
        BASE_PAYROLL_APPLICATION_QUERY_KEY,
        'detail',
        `MANUAL (${payrollSystem.friendlyName})`,
      ],
    });

    await queryClient.invalidateQueries({
      queryKey: [
        SUBI_CONNECT_QUERY_KEY,
        { context: connectionService.getContext() },
        BASE_COMPANY_QUERY_KEY,
        'detail',
      ],
    });

    setIsPending(false);
  }, [setIsPending, onIntegrationSuccess, payrollSystem, queryClient]);

  const onCancelCallback = React.useCallback(async () => {
    setIsPending(false);
  }, [setIsPending]);

  const handleConnect = React.useCallback(
    async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      event.preventDefault();
      event.stopPropagation();

      setIsPending(true);

      payrollSystem.onConnect({
        payrollSystem,
        onSuccessCallback: onSuccessCallback,
        onCancelCallback: onCancelCallback,
      });
    },
    [setIsPending, onSuccessCallback, onCancelCallback, payrollSystem],
  );

  return (
    <React.Fragment>
      <Trigger onClick={handleConnect} disabled={isConnecting} />
      <BasePortal />
    </React.Fragment>
  );
});

ManualConnectAndIntegrate.displayName = 'ManualConnectAndIntegrate';

export default ManualConnectAndIntegrate;
