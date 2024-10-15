import { useSubiConnectContext } from '@/context/subi-connect';
import { useSubiConnectMutation } from '@/hooks/use-subi-connect-query';
import { integrateManualPayroll } from '@/services/api/payroll/actions';
import type { UseIntegrateManualPayrollMutationProps } from '@/types/integration';

export const useIntegrateManualPayrollMutation = () => {
  const { connectionService } = useSubiConnectContext();

  return useSubiConnectMutation({
    mutationFn: ({ payrollName }: UseIntegrateManualPayrollMutationProps) => {
      return integrateManualPayroll(connectionService)({
        payrollName,
      });
    },
  });
};
