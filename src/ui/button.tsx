import { cn, tw } from '../lib/utils';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

const buttonVariants = cva(
  'sc-inline-flex sc-items-center sc-justify-center sc-whitespace-nowrap sc-rounded-lg sc-text-sm sc-ring-offset-background sc-transition-colors focus-visible:sc-outline-none focus-visible:sc-ring-2 focus-visible:sc-ring-ring focus-visible:sc-ring-offset-2 disabled:sc-pointer-events-none disabled:sc-opacity-50',
  {
    variants: {
      variant: {
        default: tw`sc-bg-secondary sc-text-secondary-foreground hover:sc-bg-secondary/90`,
        destructive: tw`sc-bg-destructive sc-text-destructive-foreground hover:sc-bg-destructive/90`,
        outline: tw`sc-border sc-border-secondary sc-bg-background hover:sc-bg-accent hover:sc-text-accent-foreground`,
        secondary: tw`sc-bg-secondary sc-text-secondary-foreground hover:sc-bg-secondary/80`,
        ghost: tw`hover:sc-bg-accent hover:sc-text-accent-foreground`,
        none: tw`hover:sc-bg-transparent hover:sc-text-accent-foreground`,
        link: tw`sc-text-secondary sc-underline-offset-4 hover:sc-underline`,
      },
      size: {
        default: tw`sc-h-10 sc-px-4 sc-py-2`,
        sm: tw`sc-h-9 sc-rounded-md sc-px-3`,
        lg: tw`sc-h-11 sc-rounded-md sc-px-8`,
        icon: tw`sc-h-10 sc-w-10`,
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = 'Button';

export { Button, buttonVariants };
