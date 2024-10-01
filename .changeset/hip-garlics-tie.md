---
'@subifinancial/subi-connect': major
---

# Major Changes

1. **Employee Table Columns Update:**
   - Updated the employee table columns to support multiple calendars, salaries, and emails.
   - Modified components to use new context providers for handling calendar and salary data.

2. **Components Updated:**
   - **`next-payment-date.tsx`**:
     - Added `useCalendar` hook to manage selected calendar ID.
     - Updated rendering logic to handle multiple calendars.
   - **`paycycle.tsx`**:
     - Added `useCalendar` hook to manage selected calendar ID.
     - Updated rendering logic to handle multiple calendars.
   - **`start-employment-date.tsx`**:
     - Added `useCalendar` hook to manage selected calendar ID.
     - Updated rendering logic to handle multiple calendars.
   - **`hourly-rate.tsx`**:
     - Added `useSalary` hook to manage selected salary ID.
     - Updated rendering logic to handle multiple salaries.
   - **`salary.tsx`**:
     - Added `useSalary` hook to manage selected salary ID.
     - Updated rendering logic to handle multiple salaries.
   - **`core.tsx`**:
     - Updated email column to handle multiple email addresses.
   - **`consts.ts`**:
     - Fixed typo in `startEmploymentDateColumn` export.
   - **`index.tsx`**:
     - Added `CalendarProvider` and `SalaryProvider` to manage context for calendar and salary data.
     - Updated `EmployeesTable` component to use new context providers.

3. **New Context Providers:**
   - **`calendar-context.tsx`**:
     - Created `CalendarProvider` and `useCalendar` hook to manage calendar-related state.
   - **`salary-context.tsx`**:
     - Created `SalaryProvider` and `useSalary` hook to manage salary-related state.

4. **Storybook Updates:**
   - **`live.stories.tsx`**:
     - Added new stories for `PayCycle`, `NextPaymentDate`, `StartEmploymentDate`, `AllCalendars`, and `AllSalaries`.

5. **Type Definitions Updated:**
   - **`types.ts`**:
     - Updated `Employee` type to support multiple emails, salaries, and calendars.
     - Fixed typo in `SelectableEmployeeColumns`.

6. **API Types Updated:**
   - **`types.ts`**:
     - Updated `EmployeeFilterFields` to include `email` as a required field.

7. **Data Table Component Updated:**
   - **`data-table.tsx`**:
     - Added support for `rowContexts` to wrap table rows with context providers.

8. **Employee Info Structure**: 
  - `salary` field changed to `salaries` (array of `EmployeeSalary`).
  - `calendar` field changed to `calendars` (array of `EmployeeCalendar`).
  - `email` field changed to `emails` (array of strings).

These changes introduce significant improvements to the handling of employee data, allowing for more flexible and robust management of multiple calendars, salaries, and emails.
