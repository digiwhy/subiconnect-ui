import { cn } from '../lib/utils';
import * as PopoverPrimitive from '@radix-ui/react-popover';
import * as React from 'react';

const Popover = PopoverPrimitive.Root;

const PopoverTrigger = PopoverPrimitive.Trigger;

const PopoverContent = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>
>(({ className, align = 'center', sideOffset = 4, ...props }, ref) => (
  <PopoverPrimitive.Portal>
    <PopoverPrimitive.Content
      ref={ref}
      align={align}
      sideOffset={sideOffset}
      className={cn(
        'sc-z-50 sc-w-72 sc-rounded-md sc-border sc-bg-popover sc-p-4 sc-text-popover-foreground sc-shadow-md sc-outline-none data-[state=open]:sc-animate-in data-[state=closed]:sc-animate-out data-[state=closed]:sc-fade-out-0 data-[state=open]:sc-fade-in-0 data-[state=closed]:sc-zoom-out-95 data-[state=open]:sc-zoom-in-95 data-[side=bottom]:sc-slide-in-from-top-2 data-[side=left]:sc-slide-in-from-right-2 data-[side=right]:sc-slide-in-from-left-2 data-[side=top]:sc-slide-in-from-bottom-2',
        className,
      )}
      {...props}
    />
  </PopoverPrimitive.Portal>
));
PopoverContent.displayName = PopoverPrimitive.Content.displayName;

export { Popover, PopoverTrigger, PopoverContent };
