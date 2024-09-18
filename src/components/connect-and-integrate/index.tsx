import { usePayrollSystemContext } from '../payroll-integration/context';
import { usePayrollIntegrationContext } from '@/context/payroll-integration';
import { BASE_PAYROLL_APPLICATION_QUERY_KEY } from '@/hooks/use-payroll-systems';
import { CustomPayrollIntegrationWorkflow } from '@/integration-pages/custom';
import { usePostConnectPayroll } from '@/integration-pages/custom/mutation';
import { getPayrollFriendlyName } from '@/lib/utils';
import {
  type ConnectPayrollResponse,
  PayrollConnectionTypeEnum,
} from '@/services/api/payroll/types';
import { handleOAuth2OnSuccess } from '@/services/auth2.0/auth-window';
import { Button } from '@/ui/button';
import {
  Dialogue,
  DialogueTrigger,
  DialogueContent,
  DialogueTitle,
} from '@/ui/dialogue';
import { useQueryClient } from '@tanstack/react-query';
import React from 'react';

const Integrate: React.FC<{
  Trigger: React.ForwardRefExoticComponent<
    React.ComponentPropsWithoutRef<typeof Button>
  >;
  onSuccess: () => Promise<void>;
}> = React.memo(({ Trigger, onSuccess }) => {
  const { payrollSystem } = usePayrollSystemContext();
  const [open, setOpen] = React.useState<boolean>(false);
  const { mutateAsync, isPending } = usePostConnectPayroll();
  const { setIsPending, setData, setWindowFailed, onIntegrationSuccess } =
    usePayrollIntegrationContext();
  const queryClient = useQueryClient();

  const handleSetPending = React.useCallback(
    async (pending: React.SetStateAction<boolean>) => {
      setIsPending(pending);

      /**
       * Invalidate query after setting the pending state.
       * Invalidates the list, and all details.
       */
      await queryClient.invalidateQueries({
        queryKey: [...BASE_PAYROLL_APPLICATION_QUERY_KEY, 'list'],
      });

      await queryClient.invalidateQueries({
        queryKey: [
          ...BASE_PAYROLL_APPLICATION_QUERY_KEY,
          'detail',
          payrollSystem.name,
        ],
      });
    },
    [setIsPending],
  );

  /**
   * Handle the success of the integration workflow. Triggered when the integration
   * workflow is completed.
   */
  const handleWorkflowOnSuccess = React.useCallback(async () => {
    await onSuccess();
    await onIntegrationSuccess?.(payrollSystem);
    setOpen(false);
    setIsPending(false);
  }, [setOpen, setIsPending, onIntegrationSuccess, payrollSystem]);

  /**
   * Handle the open state of the dialogue.
   */
  const handleOnOpenChange = React.useCallback(
    (open: boolean) => {
      if (open) {
        setOpen(true);
      } else {
        setOpen(false);
        setIsPending(false);
      }
    },
    [setOpen, setIsPending],
  );

  /**
   * Handle the success of the post mutation to connect the payroll.
   */
  const handleConnectOnSuccess = React.useCallback(
    async (authWindow: Window | null, data: ConnectPayrollResponse) => {
      switch (data.type) {
        case PayrollConnectionTypeEnum.OAUTH2:
          await handleOAuth2OnSuccess(
            authWindow,
            data.redirectUri,
            handleSetPending,
            setWindowFailed,
            onSuccess,
          );
          break;

        case PayrollConnectionTypeEnum.CUSTOM:
          setOpen(true);
          break;

        case PayrollConnectionTypeEnum.OAUTH2_AND_COMPANY_MANUALLY:
          await handleOAuth2OnSuccess(
            authWindow,
            data.redirectUri,
            setIsPending,
            setWindowFailed,
            onSuccess,
          );
          setOpen(true);
          break;
      }
    },
    [setOpen, setIsPending, setWindowFailed],
  );

  const handleConnect = React.useCallback(
    async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      event.preventDefault();
      event.stopPropagation();

      setIsPending(true);

      // Open auth window on click to avoid pop up blocking
      let authWindow: Window | null = null;
      if (
        payrollSystem.payrollConnectionType !== PayrollConnectionTypeEnum.CUSTOM
      ) {
        const width = 600,
          height = 600;
        const left = window.innerWidth / 2 - width / 2;
        const top = window.innerHeight / 2 - height / 2;

        authWindow = window.open(
          undefined,
          '',
          `toolbar=no, location=no, directories=no, status=no, menubar=no, 
        scrollbars=no, copyhistory=no, width=${width}, 
        height=${height}, top=${top}, left=${left}`,
        );
      }

      await mutateAsync(
        {
          payroll: payrollSystem.name,
        },
        {
          onSuccess: (data) => {
            setData(data);

            handleConnectOnSuccess(authWindow, data);
          },
          onError: () => {
            // TODO: add error handling
            setIsPending(false);
          },
        },
      );
    },
    [setIsPending, handleConnectOnSuccess, mutateAsync, setData, setIsPending],
  );

  return (
    <Dialogue modal open={open} onOpenChange={handleOnOpenChange}>
      <DialogueTrigger asChild>
        <Trigger onClick={handleConnect} disabled={isPending} />
      </DialogueTrigger>
      <DialogueContent
        aria-describedby='A dialogue to connect and integrate with a payroll system'
        className='sc-flex sc-h-auto sc-max-h-[80%] sc-w-10/12 sc-max-w-xl sc-flex-col sc-overflow-y-auto md:sc-max-w-4xl'
      >
        <DialogueTitle className='sc-sr-only'>
          Connect and Integrate {getPayrollFriendlyName(payrollSystem)}
        </DialogueTitle>
        <CustomPayrollIntegrationWorkflow onSuccess={handleWorkflowOnSuccess} />
      </DialogueContent>
    </Dialogue>
  );
});

Integrate.displayName = 'Integrate';

export default Integrate;
