import React from 'react';

type BannerProps = {
  children: string;
};
export const Banner: React.FC<BannerProps> = ({ children }) => {
  return (
    <div className='sc-rounded-lg sc-bg-secondary sc-p-3 sc-text-background'>
      {children}
    </div>
  );
};
