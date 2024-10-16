import { BASE_COMPANY_QUERY_KEY } from '../use-company';
import { BASE_PAYROLL_APPLICATION_QUERY_KEY } from '../use-payroll-systems';
import { useSubiConnectContext } from '@/context/subi-connect';
import { useSubiConnectMutation } from '@/hooks/use-subi-connect-query';
import { integrateManualPayroll } from '@/services/api/payroll/actions';
import type { UseIntegrateManualPayrollMutationProps } from '@/types/integration';
import { SUBI_CONNECT_QUERY_KEY } from '@/types/main';
import { useQueryClient } from '@tanstack/react-query';

export const useIntegrateManualPayrollMutation = () => {
  const { connectionService } = useSubiConnectContext();
  const queryClient = useQueryClient();

  return useSubiConnectMutation({
    mutationFn: ({ payrollName }: UseIntegrateManualPayrollMutationProps) => {
      return integrateManualPayroll(connectionService)({
        payrollName,
      });
    },
    onSuccess: (_, { payrollName }) => {
      /**
       * Invalidates the list and all details of the payroll application.
       * Invalidates the company details.
       */
      Promise.all([
        queryClient.invalidateQueries({
          queryKey: [
            SUBI_CONNECT_QUERY_KEY,
            { context: connectionService.getContext() },
            BASE_PAYROLL_APPLICATION_QUERY_KEY,
            'list',
          ],
        }),

        queryClient.invalidateQueries({
          queryKey: [
            SUBI_CONNECT_QUERY_KEY,
            { context: connectionService.getContext() },
            BASE_PAYROLL_APPLICATION_QUERY_KEY,
            'detail',
            `MANUAL (${payrollName})`,
          ],
        }),

        queryClient.invalidateQueries({
          queryKey: [
            SUBI_CONNECT_QUERY_KEY,
            { context: connectionService.getContext() },
            BASE_COMPANY_QUERY_KEY,
            'detail',
          ],
        }),
      ]);
    },
  });
};
