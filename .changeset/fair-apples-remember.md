---
'@subifinancial/subi-connect': patch
---

Introduced a new getPayrollFriendlyName function to display user-friendly payroll system names throughout the application.

- Added a `getPayrollFriendlyName` utility function in `src/lib/utils.ts`
- Updated various components to use the new function for displaying payroll system names
- Added a `friendlyName` property to the `AccountPayrollSystemExtended` type
- Replaced direct references to `payrollSystem.name` with `getPayrollFriendlyName(payrollSystem)`
