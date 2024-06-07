'use client';

import { cn } from '@/lib/utils';
import { useLiftMode } from 'context/lift-mode';
import { ReactNode } from 'react';

const LiftedComponent = ({ children }: { children: ReactNode }) => {
  const { liftMode } = useLiftMode();

  return (
    <div
      className={cn(
        'relative border border-transparent rounded-md shadow-sm transition',
        {
          'border-border z-50 -translate-y-0.5': liftMode
        }
      )}
    >
      {children}
    </div>
  );
};

export default LiftedComponent;
