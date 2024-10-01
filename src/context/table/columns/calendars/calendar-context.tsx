import { SelectableEmployeeColumns } from '@/types/employee';
import React from 'react';

type CalendarContextType = {
  defaultSelector:
    | SelectableEmployeeColumns.PAYCYCLE
    | SelectableEmployeeColumns.NEXT_PAYMENT_DATE
    | SelectableEmployeeColumns.START_EMPLOYMENT_DATE;
  selectedCalendarId: string | undefined;
  setSelectedCalendarId: (id: string | undefined) => void;
};

const CalendarContext = React.createContext<CalendarContextType | null>(null);

export const CalendarProvider: React.FC<{
  defaultSelector?: CalendarContextType['defaultSelector'];
  children: React.ReactNode;
}> = ({ defaultSelector = SelectableEmployeeColumns.PAYCYCLE, children }) => {
  const [selectedCalendarId, setSelectedCalendarId] = React.useState<
    string | undefined
  >('');

  const contextValue = React.useMemo(
    () =>
      ({
        defaultSelector,
        selectedCalendarId,
        setSelectedCalendarId,
      }) satisfies CalendarContextType,
    [selectedCalendarId, setSelectedCalendarId, defaultSelector],
  );

  return (
    <CalendarContext.Provider value={contextValue}>
      {children}
    </CalendarContext.Provider>
  );
};

export const useCalendar = () => {
  const context = React.useContext(CalendarContext);
  if (!context) {
    throw new Error('useCalendar must be used within a CalendarProvider');
  }
  return context;
};
