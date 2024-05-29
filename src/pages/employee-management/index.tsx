import { EmployeesTable } from '@/components';
import { columns } from '@/components/employees-table/columns/company-specific';
import { cn } from '@/lib/utils';
import { Button } from '@/ui/button';
import { PlusIcon } from 'lucide-react';
import React from 'react';

const Trigger = React.forwardRef<
  HTMLButtonElement,
  React.ComponentPropsWithoutRef<typeof Button>
>(({ ...props }, ref) => (
  <Button
    size='sm'
    variant='outline'
    className='sc-flex sc-items-center sc-gap-2'
    {...props}
    ref={ref}
  >
    <PlusIcon className='sc-h-4 sc-w-4' />
    <span>Add another organisation</span>
  </Button>
));

const EmployeeManagementPage: React.FC<{
  className?: string;
}> = ({ className }) => {
  return (
    <div
      className={cn(
        'sc-flex sc-h-full sc-w-full sc-flex-col sc-gap-4 sc-p-4',
        className,
      )}
    >
      <div className='sc-flex sc-w-full sc-justify-between sc-gap-4'>
        <div className='sc-flex sc-flex-col sc-gap-1'>
          <span className='sc-font-mainMedium sc-text-lg sc-text-secondary'>
            Employees
          </span>
        </div>
      </div>
      <div className='sc-h-full sc-w-full'>
        <EmployeesTable columns={columns} />
      </div>
    </div>
  );
};

export default EmployeeManagementPage;
