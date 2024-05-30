import { cn } from '../lib/utils';
import * as React from 'react';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          'sc-flex sc-h-10 sc-w-full sc-rounded-md sc-border sc-border-input sc-bg-background sc-px-3 sc-py-2 sc-text-sm sc-ring-offset-background file:sc-border-0 file:sc-bg-transparent file:sc-font-mainMedium file:sc-text-sm placeholder:sc-text-muted-foreground focus-visible:sc-outline-none focus-visible:sc-ring-2 focus-visible:sc-ring-ring focus-visible:sc-ring-offset-2 disabled:sc-cursor-not-allowed disabled:sc-opacity-50',
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = 'Input';

export { Input };
