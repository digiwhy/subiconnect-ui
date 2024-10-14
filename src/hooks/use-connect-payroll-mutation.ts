import { useSubiConnectContext } from '@/context/subi-connect';
import { useSubiConnectMutation } from '@/hooks/use-subi-connect-query';
import { connectPayroll } from '@/services/api/payroll/actions';
import type { UseConnectPayrollMutationProps } from '@/types/integration';

export const useConnectPayrollMutation = () => {
  const { connectionService } = useSubiConnectContext();

  return useSubiConnectMutation({
    mutationFn: ({ payroll, options }: UseConnectPayrollMutationProps) => {
      return connectPayroll(connectionService)({
        payroll,
        options: {
          ...options,
          params: { authWindow: true, ...options?.params },
        },
      });
    },
  });
};
