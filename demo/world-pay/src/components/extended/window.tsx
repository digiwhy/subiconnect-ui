'use client';

import { cn } from '@/lib/utils';

interface WindowDisplayProps {
  searchBar?: string;
  className?: string;
  children?: React.ReactNode;
}

const WindowDisplay = ({
  searchBar,
  className,
  children
}: WindowDisplayProps) => {
  return (
    <div
      className={cn('transition-colors ease-linear h-fit w-full', className)}
    >
      <div className="p-2 w-full h-12 rounded-t-lg flex justify-between items-center space-x-1.5 px-4 border border-muted-background">
        <div className="flex-1 w-full flex justify-start items-center space-x-1.5">
          <span className="w-3 h-3 border border-transparent dark:border-red-400 rounded-full bg-red-400 dark:bg-transparent"></span>
          <span className="w-3 h-3 border border-transparent dark:border-yellow-400 rounded-full bg-yellow-400 dark:bg-transparent"></span>
          <span className="w-3 h-3 border border-transparent dark:border-green-400 rounded-full bg-green-400 dark:bg-transparent"></span>
        </div>
        <div className="flex-1">
          {searchBar && (
            <div className="rounded-md border border-muted-background w-full h-full text-center text-muted-foreground text-xs p-1">
              {searchBar}
            </div>
          )}
        </div>
        <div className="flex-1"></div>
      </div>
      <div className="rounded-b-lg border-t-0 border border-muted-background min-w-full w-fit h-full overflow-clip">
        {children}
      </div>
    </div>
  );
};
export default WindowDisplay;
