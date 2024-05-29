import { cn } from '@/lib/utils';
import * as DialoguePrimitive from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import * as React from 'react';

const Dialogue = DialoguePrimitive.Root;

const DialogueTrigger = DialoguePrimitive.Trigger;

const DialoguePortal = DialoguePrimitive.Portal;

const DialogueClose = DialoguePrimitive.Close;

const DialogueOverlay = React.forwardRef<
  React.ElementRef<typeof DialoguePrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialoguePrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialoguePrimitive.Overlay
    ref={ref}
    className={cn(
      'sc-fixed sc-inset-0 sc-z-50 sc-bg-black/30 data-[state=open]:sc-animate-in data-[state=closed]:sc-animate-out data-[state=closed]:sc-fade-out-0 data-[state=open]:sc-fade-in-0',
      className,
    )}
    {...props}
  />
));
DialogueOverlay.displayName = DialoguePrimitive.Overlay.displayName;

const DialogueContent = React.forwardRef<
  React.ElementRef<typeof DialoguePrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialoguePrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <DialoguePortal>
    <DialogueOverlay />
    <DialoguePrimitive.Content
      ref={ref}
      className={cn(
        'sc-fixed sc-left-[50%] sc-top-[50%] sc-z-50 sc-grid sc-w-full sc-max-w-lg sc-translate-x-[-50%] sc-translate-y-[-50%] sc-gap-4 sc-rounded-lg sc-border sc-bg-background sc-p-6 sc-shadow-lg sc-duration-200 data-[state=open]:sc-animate-in data-[state=closed]:sc-animate-out data-[state=closed]:sc-fade-out-0 data-[state=open]:sc-fade-in-0 data-[state=closed]:sc-zoom-out-95 data-[state=open]:sc-zoom-in-95 data-[state=closed]:sc-slide-out-to-left-1/2 data-[state=closed]:sc-slide-out-to-top-[48%] data-[state=open]:sc-slide-in-from-left-1/2 data-[state=open]:sc-slide-in-from-top-[48%]',
        className,
      )}
      {...props}
    >
      {children}
      <DialoguePrimitive.Close className='sc-absolute sc-right-4 sc-top-4 sc-rounded-sm sc-opacity-70 sc-ring-offset-background sc-transition-opacity hover:sc-opacity-100 focus:sc-outline-none focus:sc-ring-2 focus:sc-ring-ring focus:sc-ring-offset-2 disabled:sc-pointer-events-none data-[state=open]:sc-bg-accent data-[state=open]:sc-text-muted-foreground'>
        <X className='sc-h-4 sc-w-4' />
        <span className='sc-sr-only'>Close</span>
      </DialoguePrimitive.Close>
    </DialoguePrimitive.Content>
  </DialoguePortal>
));
DialogueContent.displayName = DialoguePrimitive.Content.displayName;

const DialogueHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn('sc-flex sc-flex-col sc-space-y-1.5', className)}
    {...props}
  />
);
DialogueHeader.displayName = 'DialogueHeader';

const DialogueFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn('sc-flex sc-flex-row sc-justify-end sc-space-x-2', className)}
    {...props}
  />
);
DialogueFooter.displayName = 'DialogueFooter';

const DialogueTitle = React.forwardRef<
  React.ElementRef<typeof DialoguePrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialoguePrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialoguePrimitive.Title
    ref={ref}
    className={cn('sc-text-lg sc-leading-none sc-tracking-tight', className)}
    {...props}
  />
));
DialogueTitle.displayName = DialoguePrimitive.Title.displayName;

const DialogueDescription = React.forwardRef<
  React.ElementRef<typeof DialoguePrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialoguePrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialoguePrimitive.Description
    ref={ref}
    className={cn('sc-text-sm sc-text-muted-foreground', className)}
    {...props}
  />
));
DialogueDescription.displayName = DialoguePrimitive.Description.displayName;

export {
  Dialogue,
  DialoguePortal,
  DialogueOverlay,
  DialogueClose,
  DialogueTrigger,
  DialogueContent,
  DialogueHeader,
  DialogueFooter,
  DialogueTitle,
  DialogueDescription,
};
