import { cn } from '@/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

const badgeVariants = cva(
  'sc-inline-flex sc-items-center sc-rounded-full sc-border sc-px-2.5 sc-py-0.5 sc-text-xs sc-font-semibold sc-transition-colors focus:sc-outline-none focus:sc-ring-2 focus:sc-ring-ring focus:sc-ring-offset-2',
  {
    variants: {
      variant: {
        default:
          'sc-border-transparent sc-bg-primary sc-text-primary-foreground hover:sc-bg-primary/80',
        secondary:
          'sc-border-transparent sc-bg-secondary sc-text-secondary-foreground hover:sc-bg-secondary/80',
        destructive:
          'sc-border-transparent sc-bg-destructive sc-text-destructive-foreground hover:sc-bg-destructive/80',
        outline: 'sc-text-foreground',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
