import { Input } from '../../ui/input';
import React from 'react';

type DomainInputProps = React.InputHTMLAttributes<HTMLInputElement>;

const DomainInput = React.forwardRef<HTMLInputElement, DomainInputProps>(
  (props, ref) => (
    <Input type='text' placeholder='Enter Domain' ref={ref} {...props} />
  ),
);

DomainInput.displayName = 'DomainInput';

export default DomainInput;
