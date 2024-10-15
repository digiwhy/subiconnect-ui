import { cn } from '@/lib/utils';
import React from 'react';

export type CardProps = {
  bannerSrc: string;
  title: string;
  description: React.ReactNode | undefined;
  banner: React.ReactNode | undefined;
  action: React.ReactNode | undefined;
};

export const BaseCard: React.FC<CardProps> = ({
  bannerSrc,
  title,
  description,
  banner,
  action,
}) => {
  return (
    <div
      className={cn(
        'sc-mx-auto sc-flex sc-h-auto sc-min-h-full sc-w-full sc-min-w-80 sc-max-w-md sc-flex-col sc-justify-between sc-overflow-hidden sc-rounded-md sc-border sc-border-border/20 sc-shadow-[0_0px_32px_hsl(var(--sc-foreground)/.15)]',
      )}
    >
      <div className='sc-relative sc-h-28 sc-w-full sc-overflow-hidden sc-border-b sc-p-6'>
        <img
          alt={`${title} Logo`}
          src={bannerSrc}
          className='sc-h-full sc-w-full sc-object-contain'
          draggable={false}
        ></img>

        <div className='sc-absolute sc-right-4 sc-top-4'>{banner}</div>
      </div>

      <div className='sc-flex sc-flex-1 sc-flex-col sc-justify-between sc-p-4'>
        <div className='sc-flex sc-flex-col sc-gap-1'>
          <h2 className='sc-font-mainMedium sc-text-base sc-text-secondary'>
            {title}
          </h2>
          <div className='sc-text-sm sc-font-light'>{description}</div>
        </div>
        <div className='sc-mt-6 sc-w-full'>{action}</div>
      </div>
    </div>
  );
};
