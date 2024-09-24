import { useSubiConnectContext } from '@/context/subi-connect';
import { useSubiConnectMutation } from '@/hooks/use-subi-connect-query';
import {
  connectPayroll,
  integratePayroll,
} from '@/services/api/payroll/actions';
import type { Payroll } from '@/types/payroll';
import type { AxiosRequestConfig } from 'axios';

type PostPayrollIntegration = {
  [key: string]: string;
};

export type UsePostPayrollIntegrationProps = {
  payrollSystem: string;
  integrationParams: PostPayrollIntegration;
};

export const usePostPayrollIntegration = () => {
  const { connectionService } = useSubiConnectContext();

  return useSubiConnectMutation({
    mutationFn: ({
      payrollSystem,
      integrationParams,
    }: UsePostPayrollIntegrationProps) => {
      return integratePayroll(connectionService)({
        payrollSystem,
        integrationParams,
      });
    },
  });
};

export type UsePostConnectPayrollProps = {
  payroll: Payroll;
  options?: AxiosRequestConfig<Payroll> & {
    params: { authWindow: boolean | undefined };
  };
};

export const usePostConnectPayroll = () => {
  const { connectionService } = useSubiConnectContext();

  return useSubiConnectMutation({
    mutationFn: ({ payroll }: UsePostConnectPayrollProps) => {
      return connectPayroll(connectionService)({
        payroll,
        options: { params: { authWindow: true } },
      });
    },
  });
};
