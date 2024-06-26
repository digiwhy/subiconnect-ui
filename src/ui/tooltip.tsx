'use client';

import { cn } from '../lib/utils';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import React from 'react';

const TooltipProvider = TooltipPrimitive.Provider;

const Tooltip = TooltipPrimitive.Root;

const TooltipTrigger = TooltipPrimitive.Trigger;

const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <TooltipPrimitive.Content
    ref={ref}
    sideOffset={sideOffset}
    className={cn(
      'sc-z-50 sc-overflow-hidden sc-whitespace-normal sc-rounded-md sc-border sc-bg-popover sc-px-3 sc-py-1.5 sc-text-sm sc-text-popover-foreground sc-shadow-md sc-animate-in sc-fade-in-0 sc-zoom-in-95 data-[state=closed]:sc-animate-out data-[state=closed]:sc-fade-out-0 data-[state=closed]:sc-zoom-out-95 data-[side=bottom]:sc-slide-in-from-top-2 data-[side=left]:sc-slide-in-from-right-2 data-[side=right]:sc-slide-in-from-left-2 data-[side=top]:sc-slide-in-from-bottom-2',
      className,
    )}
    {...props}
  />
));
TooltipContent.displayName = TooltipPrimitive.Content.displayName;

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider };
