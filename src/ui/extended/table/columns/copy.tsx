import { cn } from '@/lib/utils';
import { Button } from '@/ui/button';
import { CheckIcon, CopyIcon } from 'lucide-react';
import React from 'react';

interface ClipboardButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  getValue: (event: React.MouseEvent<HTMLButtonElement>) => string | undefined;
  children?: React.ReactNode;
}

const ClipboardButton = ({
  getValue,
  children,
  ...props
}: ClipboardButtonProps) => {
  const [showCheckmark, setShowCheckmark] = React.useState<boolean>(false);
  const [showIcon, setShowIcon] = React.useState<boolean>(false);
  const [clipboard, setClipboard] = React.useState<boolean>(false);

  React.useEffect(() => {
    setClipboard(navigator.clipboard !== undefined);
  }, [clipboard]);

  const handleCopyClick = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    event.preventDefault();
    event.stopPropagation();
    event.currentTarget.blur();
    const value = getValue(event);
    if (!value) return;
    try {
      await navigator.clipboard.writeText(value);
      setShowCheckmark(true);

      setTimeout(() => {
        setShowCheckmark(false); // Reset the checkmark icon after 1 second
        // closeTooltip();
      }, 1000);
    } catch (error) {
      alert(`Error copying to clipboard: ${error}`);
      console.error('Error copying to clipboard:', error);
    }
  };

  const onMouseOver = () => {
    setShowIcon(true);
  };

  const onMouseLeave = () => {
    setShowIcon(false);
  };

  if (!clipboard) {
    if (children) {
      return <div className='sc-truncate'>{children}</div>;
    }
    return;
  }

  const Icon = showCheckmark ? CheckIcon : CopyIcon;

  return (
    <Button
      variant={'none'}
      size={children ? 'sm' : 'icon'}
      className={cn('sc-content-center sc-align-middle', {
        'sc-w-fit sc-gap-4 sc-p-0': children,
      })}
      onClick={handleCopyClick}
      onMouseOver={onMouseOver}
      onMouseLeave={onMouseLeave}
      type='button'
      {...props}
    >
      {children}
      {
        <Icon
          className={cn('sc-h-4 sc-w-4', {
            'sc-opacity-0': !showIcon && !showCheckmark,
          })}
        />
      }
    </Button>
  );
};

export default ClipboardButton;
