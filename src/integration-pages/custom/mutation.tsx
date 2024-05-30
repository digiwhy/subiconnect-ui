import {
  connectPayroll,
  integratePayroll,
} from '../../services/api/payroll/actions';
import { useMutation } from '@tanstack/react-query';

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
  payroll: string;
};

export const usePostConnectPayroll = () => {
  return useMutation({
    mutationFn: ({ payroll }: UsePostConnectPayrollProps) => {
      return connectPayroll({ payroll });
    },
  });
};
