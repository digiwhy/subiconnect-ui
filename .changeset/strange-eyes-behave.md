---
'@subifinancial/subi-connect': major
---

### Breaking Changes

#### Query Key Filters Structure Change
- Changed `queryKeyFilters` type from array to object structure across all table components
- Updated `DataTableProviderProps` interface to use `Record<string, unknown>` instead of `QueryKey`
- This affects all components using `GenericTable` and `DataTableProvider`

#### Payroll Integration Parameter Changes
- Changed `accountPayrollId` to `payrollSystemId` throughout the codebase
- This affects:
  - `PayrollIntegrationManagementTable` component
  - `useOrganisations` hook
  - `listOrganisationsFromPayroll` action
  - `getOrganisationsFromPayrollURL` path helper

### Migration Guide

#### Query Key Filters
Before:
```tsx
queryKeyFilters={[{ enabledColumns }]}
```

After:
```tsx
queryKeyFilters={{ enabledColumns }}
```

#### Payroll System ID
Before:
```tsx
const App = () => {
    const { data: accountPayroll } = useAccountPayrollSystem(payroll);
    const { data: organisations } = useOrganisations(accountPayroll.id);

    return <PayrollIntegrationManagementTable accountPayrollId={accountPayroll.id} />
}
```

After:
```tsx
const App = () => {
    const { data: accountPayroll } = useAccountPayrollSystem(payroll);
    const { data: organisations } = useOrganisations(accountPayroll.payrollId);
    
    return <PayrollIntegrationManagementTable payrollSystemId={accountPayroll.payrollId} />
}
```


