import { Input } from '../../ui/input';
import React from 'react';

type ApiKeyInputProps = React.InputHTMLAttributes<HTMLInputElement>;

const ApiKeyInput = React.forwardRef<HTMLInputElement, ApiKeyInputProps>(
  (props, ref) => (
    <Input type='text' placeholder='Enter API Key' ref={ref} {...props} />
  ),
);

ApiKeyInput.displayName = 'ApiKeyInput';

export default ApiKeyInput;
