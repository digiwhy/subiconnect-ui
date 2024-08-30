import { cn } from '../../lib/utils';
import { Input } from '../../ui/input';
import React from 'react';

/**
 * Extracts the subdomain from a given domain input.
 * @param input - The domain input string.
 * @returns The subdomain.
 */
const extractSubdomain = (input: string): string => {
  const withoutProtocol = input.replace(/^(https?:\/\/)/, '');
  const regex = /^([^.]+)(?:\.bamboohr\.com)?.*$/;
  const match = regex.exec(withoutProtocol);
  return match?.[1] ?? input;
};

type DomainInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  domainContext: string;
};

const DomainInput = React.forwardRef<HTMLInputElement, DomainInputProps>(
  ({ domainContext, onChange, ...props }, ref) => {
    const [subDomain, setSubDomain] = React.useState(props.value);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const input = e.target.value;
      const subdomain = extractSubdomain(input);

      e.target.value = subdomain;
      setSubDomain(subdomain);

      onChange?.(e);
    };

    return (
      <div className='sc-relative sc-flex sc-w-full sc-overflow-clip'>
        <Input
          {...props}
          placeholder='Enter Subdomain'
          ref={ref}
          onChange={handleInputChange}
          autoCorrect='off'
          autoComplete='off'
          autoCapitalize='off'
        />
        <div
          className={cn(
            'sc-absolute sc-right-2 sc-top-1/2 sc-ml-1 sc-hidden sc-h-4 -sc-translate-y-1/2 sc-items-center sc-justify-center sc-bg-background sc-px-1 sc-text-xs sc-text-gray-500 sm:sc-flex',
            {
              'sc-hidden sm:sc-hidden': !subDomain || !domainContext,
            },
          )}
        >
          https://{/* */}
          <span className='sc-whitespace-nowrap sc-rounded-md sc-bg-input sc-px-1 sc-py-[1.5px]'>
            {subDomain}
          </span>
          {/* */}.{domainContext}
        </div>
      </div>
    );
  },
);

DomainInput.displayName = 'DomainInput';

export default DomainInput;
