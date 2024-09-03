import { EmployeesTable } from '../../components';
import {
  endColumns,
  startColumns,
} from '../../components/employees-table/columns/company-specific';
import { EMPLOYEES_TABLE_ALLOWED_COLUMNS_MAP } from '../../components/employees-table/consts';
import { useSyncingOrganisations } from '../../hooks/use-organisations';
import { cn } from '../../lib/utils';
import type { SelectableEmployeeColumns } from '../../types/employee';
import {
  HoverCard,
  HoverCardTrigger,
  HoverCardContent,
} from '../../ui/hover-card';
import { Separator } from '../../ui/separator';
import { Skeleton } from '../../ui/skeleton';
import { RefreshCwIcon } from 'lucide-react';
import React from 'react';

const DEFAULT_REFETCH_INTERVAL_TIME = 1000 * 60 * 2;

const OrganisationSyncingComponent = () => {
  const { data, isLoading } = useSyncingOrganisations({
    queryOptions: {
      refetchInterval(q) {
        // Refretch every 2 minutes until all organisations are synced
        return (q.state.data?.count ?? 1) > 0
          ? DEFAULT_REFETCH_INTERVAL_TIME
          : false;
      },
    },
  });

  if (isLoading) return <Skeleton className='sc-h-4 sc-w-32' />;

  if (!data || data.count === 0) return null;

  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <div className='sc-flex sc-items-center sc-justify-between sc-gap-2 sc-text-xs sc-text-muted-foreground/50 hover:sc-cursor-help'>
          <div>
            {data.count > 10 ? 'More than 10' : data.count} Organisation
            {data.count > 1 ? 's ' : ' '}Syncing
          </div>
          <RefreshCwIcon className='sc-h-3 sc-w-3 sc-animate-spin' />
        </div>
      </HoverCardTrigger>
      <HoverCardContent align='end' className='sc-w-fit'>
        <div className='sc-flex sc-flex-col sc-items-end sc-justify-end sc-gap-2 sc-text-right sc-text-xs'>
          <span>
            You might not see some employees because they are syncing.
          </span>
          <Separator />
          {data.organisations.map((organisation) => (
            <div
              key={organisation.id}
              className='sc-flex sc-flex-row sc-items-end sc-justify-end sc-gap-2 sc-text-left'
            >
              <div>{organisation.name}</div>
            </div>
          ))}
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};

const EmployeeManagementPage: React.FC<{
  className?: string;
  enabledColumns?: SelectableEmployeeColumns[];
}> = ({ className, enabledColumns = [] }) => {
  const enabledColumnsComponents = React.useMemo(
    () =>
      enabledColumns.map(
        (enabledColumn) => EMPLOYEES_TABLE_ALLOWED_COLUMNS_MAP[enabledColumn],
      ),
    [enabledColumns],
  );

  const finalColumns = React.useMemo(
    () => [...startColumns, ...enabledColumnsComponents, ...endColumns],
    [enabledColumnsComponents],
  );

  return (
    <div
      className={cn(
        'sc-flex sc-h-full sc-w-full sc-flex-col sc-gap-4 sc-p-4',
        className,
      )}
    >
      <div className='sc-flex sc-w-full sc-items-center sc-justify-between sc-gap-4'>
        <div className='sc-flex sc-w-full sc-flex-row sc-items-center sc-justify-between sc-gap-1'>
          <span className='sc-font-mainMedium sc-text-lg sc-text-secondary'>
            Employees
          </span>

          <OrganisationSyncingComponent />
        </div>
      </div>
      <div className='sc-h-full sc-w-full'>
        <EmployeesTable
          columns={finalColumns}
          enabledColumns={enabledColumns}
        />
      </div>
    </div>
  );
};

export default EmployeeManagementPage;
