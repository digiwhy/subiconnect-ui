import { ServerCrashIcon } from 'lucide-react';
import React from 'react';

export const DataTableError: React.FC<{ context: string }> = ({ context }) => {
  return (
    <div className='sc-flex sc-h-full sc-w-full sc-items-center sc-justify-center sc-p-4'>
      <div className='sc-flex sc-flex-col sc-items-center sc-gap-2 sc-text-center sc-text-red-500'>
        <span>There was an error while loading {context}</span>
        <ServerCrashIcon size={'1em'} className='sc-text-red-500' />
      </div>
    </div>
  );
};
