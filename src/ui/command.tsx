import { cn } from '../lib/utils';
import { Dialogue, DialogueContent } from './dialogue';
import { type DialogProps } from '@radix-ui/react-dialog';
import { Command as CommandPrimitive } from 'cmdk';
import { Search } from 'lucide-react';
import * as React from 'react';

const Command = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive>
>(({ className, ...props }, ref) => (
  <CommandPrimitive
    ref={ref}
    className={cn(
      'sc-flex sc-h-full sc-w-full sc-flex-col sc-overflow-hidden sc-rounded-md sc-bg-popover sc-text-popover-foreground',
      className,
    )}
    {...props}
  />
));
Command.displayName = CommandPrimitive.displayName;

interface CommandDialogProps extends DialogProps {
  children: React.ReactNode;
}

const CommandDialog = ({ children, ...props }: CommandDialogProps) => {
  return (
    <Dialogue {...props}>
      <DialogueContent className='sc-overflow-hidden sc-p-0 sc-shadow-lg'>
        <Command className='[&_[cmdk-group-heading]]:sc-px-2 [&_[cmdk-group-heading]]:sc-font-medium [&_[cmdk-group-heading]]:sc-text-muted-foreground [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:sc-pt-0 [&_[cmdk-group]]:sc-px-2 [&_[cmdk-input-wrapper]_svg]:sc-h-5 [&_[cmdk-input-wrapper]_svg]:sc-w-5 [&_[cmdk-input]]:sc-h-12 [&_[cmdk-item]]:sc-px-2 [&_[cmdk-item]]:sc-py-3 [&_[cmdk-item]_svg]:sc-h-5 [&_[cmdk-item]_svg]:sc-w-5'>
          {children}
        </Command>
      </DialogueContent>
    </Dialogue>
  );
};

const CommandInput = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Input>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Input>
>(({ className, ...props }, ref) => (
  <div
    className='sc-flex sc-items-center sc-border-b sc-px-3'
    /* eslint-disable react/no-unknown-property */
    cmdk-input-wrapper=''
  >
    <Search className='sc-mr-2 sc-h-4 sc-w-4 sc-shrink-0 sc-opacity-50' />
    <CommandPrimitive.Input
      ref={ref}
      className={cn(
        'sc-flex sc-h-11 sc-w-full sc-rounded-md sc-bg-transparent sc-py-3 sc-text-sm sc-outline-none placeholder:sc-text-muted-foreground disabled:sc-cursor-not-allowed disabled:sc-opacity-50',
        className,
      )}
      {...props}
    />
  </div>
));

CommandInput.displayName = CommandPrimitive.Input.displayName;

const CommandList = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.List>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.List
    ref={ref}
    className={cn(
      'sc-max-h-[300px] sc-overflow-y-auto sc-overflow-x-hidden',
      className,
    )}
    {...props}
  />
));

CommandList.displayName = CommandPrimitive.List.displayName;

const CommandEmpty = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Empty>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Empty>
>((props, ref) => (
  <CommandPrimitive.Empty
    ref={ref}
    className='sc-py-6 sc-text-center sc-text-sm'
    {...props}
  />
));

CommandEmpty.displayName = CommandPrimitive.Empty.displayName;

const CommandGroup = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Group>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Group>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Group
    ref={ref}
    className={cn(
      'sc-overflow-hidden sc-p-1 sc-text-foreground [&_[cmdk-group-heading]]:sc-px-2 [&_[cmdk-group-heading]]:sc-py-1.5 [&_[cmdk-group-heading]]:sc-text-xs [&_[cmdk-group-heading]]:sc-font-medium [&_[cmdk-group-heading]]:sc-text-muted-foreground',
      className,
    )}
    {...props}
  />
));

CommandGroup.displayName = CommandPrimitive.Group.displayName;

const CommandSeparator = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Separator
    ref={ref}
    className={cn('-sc-mx-1 sc-h-px sc-bg-border', className)}
    {...props}
  />
));
CommandSeparator.displayName = CommandPrimitive.Separator.displayName;

const CommandItem = React.forwardRef<
  React.ElementRef<typeof CommandPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof CommandPrimitive.Item>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Item
    ref={ref}
    className={cn(
      'sc-relative sc-flex sc-cursor-default sc-select-none sc-items-center sc-rounded-sm sc-px-2 sc-py-1.5 sc-text-sm sc-outline-none aria-selected:sc-bg-accent aria-selected:sc-text-accent-foreground data-[disabled=true]:sc-pointer-events-none data-[disabled=true]:sc-opacity-50',
      className,
    )}
    {...props}
  />
));

CommandItem.displayName = CommandPrimitive.Item.displayName;

const CommandShortcut = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      className={cn(
        'sc-ml-auto sc-text-xs sc-tracking-widest sc-text-muted-foreground',
        className,
      )}
      {...props}
    />
  );
};
CommandShortcut.displayName = 'CommandShortcut';

export {
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut,
  CommandSeparator,
};
