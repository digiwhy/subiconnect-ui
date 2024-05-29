import {
  connectPayroll,
  integratePayroll,
} from '@/services/api/payroll/actions';
import { useMutation } from '@tanstack/react-query';

type PostPayrollIntegration = {
  [key: string]: string;
};

export type UsePostPayrollIntegrationProps = {
  payrollSystemId: number;
  integrationParams: PostPayrollIntegration;
};

export const usePostPayrollIntegration = () => {
  return useMutation({
    mutationFn: ({
      payrollSystemId,
      integrationParams,
    }: UsePostPayrollIntegrationProps) => {
      return integratePayroll({ payrollSystemId, integrationParams });
    },
  });
};

export type UsePostConnectPayrollProps = {
  payrollSystemId: number;
};

export const usePostConnectPayroll = () => {
  return useMutation({
    mutationFn: ({ payrollSystemId }: UsePostConnectPayrollProps) => {
      return connectPayroll({ payrollSystemId });
    },
  });
};
