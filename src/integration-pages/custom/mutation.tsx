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
  return useSubiConnectMutation({
    mutationFn: ({
      payrollSystem,
      integrationParams,
    }: UsePostPayrollIntegrationProps) => {
      return integratePayroll({ payrollSystem, integrationParams });
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
  return useSubiConnectMutation({
    mutationFn: ({ payroll }: UsePostConnectPayrollProps) => {
      return connectPayroll({
        payroll,
        options: { params: { authWindow: true } },
      });
    },
  });
};
