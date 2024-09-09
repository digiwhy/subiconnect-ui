import {
  connectPayroll,
  integratePayroll,
} from '@/services/api/payroll/actions';
import type { Payroll } from '@/types/payroll';
import { useMutation } from '@tanstack/react-query';
import type { AxiosRequestConfig } from 'axios';

type PostPayrollIntegration = {
  [key: string]: string;
};

export type UsePostPayrollIntegrationProps = {
  payrollSystem: string;
  integrationParams: PostPayrollIntegration;
};

export const usePostPayrollIntegration = () => {
  return useMutation({
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
  return useMutation({
    mutationFn: ({ payroll }: UsePostConnectPayrollProps) => {
      return connectPayroll({
        payroll,
        options: { params: { authWindow: true } },
      });
    },
  });
};
