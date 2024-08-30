import { cn } from '../../lib/utils';
import { Input } from '../../ui/input';
import React from 'react';

type ApiKeyInputProps = React.InputHTMLAttributes<HTMLInputElement>;

const ApiKeyInput = React.forwardRef<HTMLInputElement, ApiKeyInputProps>(
  ({ value = '', onChange, className, ...props }, ref) => {
    const [internalValue, setInternalValue] = React.useState(value);
    const [isHovered, setIsHovered] = React.useState(false);

    const inputType: 'text' | 'password' = React.useMemo(() => {
      return isHovered ? 'text' : 'password';
    }, [isHovered]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setInternalValue(e.target.value);
      onChange?.(e);
    };

    return (
      <Input
        {...props}
        type={inputType}
        value={internalValue}
        onChange={handleChange}
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
