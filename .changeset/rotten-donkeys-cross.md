---
'@subifinancial/subi-connect': patch
---


Added `connectionService` context to dependency arrays in React hooks to ensure proper cache invalidation when the connection context changes. Updated hooks include:
- `useAccountPayrollSystem`
- `useEmployees`
- `useOrganisations`
- `useAllOrganisations`
- `useOrganisation`
- `usePayrollSystems`
