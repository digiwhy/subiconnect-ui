import { Loader2Icon } from 'lucide-react';
import React from 'react';

export const Loading: React.FC<{ title: React.ReactNode }> = ({ title }) => {
  return (
    <div className='sc-flex sc-h-full sc-w-full sc-items-center sc-justify-center sc-p-4'>
      <div className='sc-flex sc-flex-col sc-items-center sc-gap-2 sc-text-center sc-font-mainMedium'>
        {title}
        <Loader2Icon size={'1em'} className='sc-animate-spin' />
      </div>
    </div>
  );
};
