import { cn } from '../lib/utils';
import React from 'react';

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('sc-animate-pulse sc-rounded-md sc-bg-muted', className)}
      {...props}
    />
  );
}

export { Skeleton };
