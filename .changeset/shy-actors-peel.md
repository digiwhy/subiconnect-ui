---
'@subifinancial/subi-connect': patch
---

Improved initialisation and configuration handling:

- Changed `initialised` state to use `useRef` instead of `useState` for better state management
- Moved provider options handling into `ConnectionService` constructor
- Simplified provider options handling by passing `httpClient` directly instead of `ConnectionService`
- Fixed dependency array in `SubiConnectProvider`'s `useMemo`
- Removed redundant initialisation code and improved initialisation flow
- Added `providerOptions` to `ConnectionService` constructor parameters


