import { Portal as BasePortal } from './portal';
import { usePayrollIntegrationContext } from '@/context/payroll-integration';
import { useManualPayrollSystemContext } from '@/hooks/integration/context/use-manual-payroll-system-context';
import { useIntegrateManualPayrollMutation } from '@/hooks/integration/use-integrate-manual-payroll-mutation';
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

  /**
   * Handle the success of the integration workflow. Triggered when the integration
   * workflow is completed.
   */
  const onSuccessCallback = React.useCallback(async () => {
    await mutateAsync({
      payrollName: payrollSystem.friendlyName,
    });

    await onIntegrationSuccess();

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
