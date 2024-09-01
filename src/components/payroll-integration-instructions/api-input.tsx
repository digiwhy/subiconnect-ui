import { cn } from '../../lib/utils';
import { Input } from '../../ui/input';
import React from 'react';

type ApiKeyInputProps = React.InputHTMLAttributes<HTMLInputElement>;

const ApiKeyInput = React.forwardRef<HTMLInputElement, ApiKeyInputProps>(
  ({ className, ...props }, ref) => {
    const [isHovered, setIsHovered] = React.useState(false);

    return (
      <Input
        {...props}
        type={isHovered ? 'text' : 'password'}
        placeholder='Enter API Key'
        ref={ref}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        autoComplete='off'
        autoCorrect='off'
        autoCapitalize='off'
        className={cn('sc-font-mono placeholder:sc-font-main', className)}
      />
    );
  },
);

ApiKeyInput.displayName = 'ApiKeyInput';

export default ApiKeyInput;
