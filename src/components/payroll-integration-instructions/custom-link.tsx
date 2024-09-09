import type { TypedOmit } from '@/types/utils';
import React from 'react';

type CustomLinkProps = TypedOmit<
  React.ComponentPropsWithoutRef<'a'>,
  'rel' | 'target'
>;

const CustomLink: React.FC<CustomLinkProps> = ({ children, ...props }) => {
  return (
    <a {...props} rel='noopener noreferrer' target='_blank'>
      {children}
    </a>
  );
};

export default CustomLink;
