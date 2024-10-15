import { Loading } from '../payroll-integration/loading';
import { usePayrollIntegrationContext } from '@/context/payroll-integration';
import { cn } from '@/lib/utils';
import React from 'react';
import ReactDOM from 'react-dom';

export const Portal = ({ children }: { children?: React.ReactNode }) => {
  const { isPending } = usePayrollIntegrationContext();

  const container = document.getElementById(
    'subi-connect-payroll-integration-grid',
  );

  if (!isPending || !container) {
    return null;
  }

  return ReactDOM.createPortal(
    <div
      className={cn(
        'sc-absolute sc-z-50 sc-flex sc-h-full sc-w-full sc-items-center sc-justify-center sc-gap-2 sc-bg-background/50 sc-backdrop-blur-md',
      )}
    >
      <Loading
        title={
          <div className='sc-flex sc-flex-col sc-items-center sc-gap-2 sc-text-center'>
            <p>Please finish your current integration.</p>
            {children}
          </div>
        }
      />
    </div>,
    container ?? document.body,
  );
};
