import { usePayrollSystemContext } from '../context';
import {
  cn,
  getPayrollBannerImgUrl,
  getPayrollFriendlyName,
} from '@/lib/utils';
import React from 'react';

export type CardProps = {
  description: React.ReactNode | undefined;
  banner: React.ReactNode | undefined;
  action: React.ReactNode | undefined;
};
export const BaseCard: React.FC<CardProps> = ({
  description,
  banner,
  action,
}) => {
  const { payrollSystem } = usePayrollSystemContext();
  const bannerSrc = getPayrollBannerImgUrl(payrollSystem.name);
  return (
    <div
      className={cn(
        'sc-flex sc-h-auto sc-w-auto sc-min-w-80 sc-max-w-md sc-flex-col sc-overflow-hidden sc-rounded-md sc-border sc-shadow-sm',
      )}
    >
      <div
        className='sc-relative sc-h-40 sc-w-full sc-overflow-hidden sc-border-b sc-p-6'
        style={{ backgroundColor: payrollSystem.backgroundColour }}
      >
        <img
          alt={`${getPayrollFriendlyName(payrollSystem)} Logo`}
          src={bannerSrc}
          className='sc-h-full sc-w-full sc-object-contain'
          draggable={false}
        ></img>

        <div className='sc-absolute sc-right-4 sc-top-4'>{banner}</div>
      </div>
      <div className='sc-flex sc-h-full sc-flex-col sc-justify-between sc-gap-2 sc-p-4'>
        <div className='sc-flex sc-flex-col sc-gap-2'>
          <h2 className='sc-font-mainMedium sc-text-2xl sc-text-secondary'>
            {getPayrollFriendlyName(payrollSystem)}
          </h2>
          {description}
        </div>
        {action}
      </div>
    </div>
  );
};
