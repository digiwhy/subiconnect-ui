import { cn } from '../lib/utils';
import * as SelectPrimitive from '@radix-ui/react-select';
import { Check, ChevronDown, ChevronUp } from 'lucide-react';
import * as React from 'react';

const Select = SelectPrimitive.Root;

const SelectGroup = SelectPrimitive.Group;

const SelectValue = SelectPrimitive.Value;

const SelectTrigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Trigger
    ref={ref}
    className={cn(
      'sc-flex sc-h-10 sc-w-full sc-items-center sc-justify-between sc-rounded-md sc-border sc-border-input sc-bg-background sc-px-3 sc-py-2 sc-text-sm sc-ring-offset-background placeholder:sc-text-muted-foreground focus:sc-outline-none focus:sc-ring-2 focus:sc-ring-ring focus:sc-ring-offset-2 disabled:sc-cursor-not-allowed disabled:sc-opacity-50 [&>span]:sc-line-clamp-1',
      className,
    )}
    {...props}
  >
    {children}
    <SelectPrimitive.Icon asChild>
      <ChevronDown className='sc-h-4 sc-w-4 sc-opacity-50' />
    </SelectPrimitive.Icon>
  </SelectPrimitive.Trigger>
));
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;

const SelectScrollUpButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollUpButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollUpButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollUpButton
    ref={ref}
    className={cn(
      'sc-flex sc-cursor-default sc-items-center sc-justify-center sc-py-1',
      className,
    )}
    {...props}
  >
    <ChevronUp className='sc-h-4 sc-w-4' />
  </SelectPrimitive.ScrollUpButton>
));
SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName;

const SelectScrollDownButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollDownButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollDownButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollDownButton
    ref={ref}
    className={cn(
      'sc-flex sc-cursor-default sc-items-center sc-justify-center sc-py-1',
      className,
    )}
    {...props}
  >
    <ChevronDown className='sc-h-4 sc-w-4' />
  </SelectPrimitive.ScrollDownButton>
));
SelectScrollDownButton.displayName =
  SelectPrimitive.ScrollDownButton.displayName;

const SelectContent = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ className, children, position = 'popper', ...props }, ref) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      ref={ref}
      className={cn(
        'sc-relative sc-z-50 sc-max-h-96 sc-min-w-[8rem] sc-overflow-hidden sc-rounded-md sc-border sc-bg-popover sc-text-popover-foreground sc-shadow-md data-[state=open]:sc-animate-in data-[state=closed]:sc-animate-out data-[state=closed]:sc-fade-out-0 data-[state=open]:sc-fade-in-0 data-[state=closed]:sc-zoom-out-95 data-[state=open]:sc-zoom-in-95 data-[side=bottom]:sc-slide-in-from-top-2 data-[side=left]:sc-slide-in-from-right-2 data-[side=right]:sc-slide-in-from-left-2 data-[side=top]:sc-slide-in-from-bottom-2',
        position === 'popper' &&
          'data-[side=bottom]:sc-translate-y-1 data-[side=left]:-sc-translate-x-1 data-[side=right]:sc-translate-x-1 data-[side=top]:-sc-translate-y-1',
        className,
      )}
      position={position}
      {...props}
    >
      <SelectScrollUpButton />
      <SelectPrimitive.Viewport
        className={cn(
          'sc-p-1',
          position === 'popper' &&
            'sc-h-[var(--radix-select-trigger-height)] sc-w-full sc-min-w-[var(--radix-select-trigger-width)]',
        )}
      >
        {children}
      </SelectPrimitive.Viewport>
      <SelectScrollDownButton />
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
));
SelectContent.displayName = SelectPrimitive.Content.displayName;

const SelectLabel = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Label
    ref={ref}
    className={cn('sc-py-1.5 sc-pl-8 sc-pr-2 sc-text-sm', className)}
    {...props}
  />
));
SelectLabel.displayName = SelectPrimitive.Label.displayName;

const SelectItem = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    className={cn(
      'sc-relative sc-flex sc-w-full sc-cursor-default sc-select-none sc-items-center sc-rounded-sm sc-py-1.5 sc-pl-8 sc-pr-2 sc-text-sm sc-outline-none focus:sc-bg-accent focus:sc-text-accent-foreground data-[disabled]:sc-pointer-events-none data-[disabled]:sc-opacity-50',
      className,
    )}
    {...props}
  >
    <span className='sc-absolute sc-left-2 sc-flex sc-h-3.5 sc-w-3.5 sc-items-center sc-justify-center'>
      <SelectPrimitive.ItemIndicator>
        <Check className='sc-h-4 sc-w-4' />
      </SelectPrimitive.ItemIndicator>
    </span>

    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
));
SelectItem.displayName = SelectPrimitive.Item.displayName;

const SelectSeparator = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Separator
    ref={ref}
    className={cn('-sc-mx-1 sc-my-1 sc-h-px sc-bg-muted', className)}
    {...props}
  />
));
SelectSeparator.displayName = SelectPrimitive.Separator.displayName;

export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton,
};
