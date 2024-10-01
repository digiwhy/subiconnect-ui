import { useCalendar } from '@/context/table/columns/calendars/calendar-context';
import type { ColumnDef } from '@/types/components/data-table';
import type { Employee } from '@/types/employee';
import { DataTableColumnHeader } from '@/ui/data-table-column-header';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/ui/select';
import type { CellContext } from '@tanstack/react-table';
import React from 'react';

const PayCycleCell: React.FC<CellContext<Employee, unknown>> = ({ row }) => {
  const { selectedCalendarId, setSelectedCalendarId } = useCalendar();

  const id =
    selectedCalendarId ?? row.original.info?.calendars?.[0]?.id?.toString();

  React.useEffect(() => {
    if (!selectedCalendarId) {
      setSelectedCalendarId(row.original.info?.calendars?.[0]?.id?.toString());
    }
  }, [selectedCalendarId]);

  if (!row.original.info.calendars || row.original.info.calendars.length === 0)
    return '';

  if (row.original.info.calendars.length === 1) {
    if (!row.original.info.calendars[0]?.paycycle) return '';

    if (!selectedCalendarId)
      setSelectedCalendarId(row.original.info.calendars[0]!.id.toString());

    return row.original.info.calendars[0]?.paycycle;
  }

  return (
    <Select value={id} onValueChange={setSelectedCalendarId}>
      <SelectTrigger>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {row.original.info.calendars.map((calendar) => {
          if (!calendar.paycycle) return null;
          return (
            <SelectItem key={calendar.id} value={calendar.id.toString()}>
              {calendar.paycycle}
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
};

export const payCycleColumn: ColumnDef<Employee> = {
  id: 'paycycle',
  accessorKey: 'info.calendars',
  header: ({ column }) => (
    <DataTableColumnHeader column={column} title={'Pay Cycle'} />
  ),
  cell: PayCycleCell,
};
