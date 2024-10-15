import { useSubiConnectContext } from '@/context/subi-connect';
import { useSubiConnectMutation } from '@/hooks/use-subi-connect-query';
import { integratePayroll } from '@/services/api/payroll/actions';
import type { UseIntegrateCustomPayrollMutationProps } from '@/types/integration';

export const useIntegrateCustomPayrollMutation = () => {
  const { connectionService } = useSubiConnectContext();

  return useSubiConnectMutation({
    mutationFn: (props: UseIntegrateCustomPayrollMutationProps) => {
      return integratePayroll(connectionService)(props);
    },
  });
};
