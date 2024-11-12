---
'@subifinancial/subi-connect': patch
---

### Bug Fixes

- Fixed dependency array in `SubiConnectProvider` by removing duplicate `initialised` dependency
- Updated `DataTableProvider` to use `useSubiConnectQuery` instead of raw `useQuery`
- Removed unnecessary `async` wrapper in `useAccountPayrollSystem` query function
- Improved code formatting and readability in hooks with consistent spacing

### Internal Changes

- Refactored query implementation in table context to use `useSubiConnectQuery`
- Added proper type handling for query options in `useSubiConnectQuery`
- Enhanced query key organisation in company-related hooks


