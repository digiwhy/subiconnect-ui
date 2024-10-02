---
'@subifinancial/subi-connect': patch
---

This change updates the `SubiConnectProvider` and `useSubiConnectQuery` components to improve dependency management and query execution control. The changes address potential issues with stale closures and ensure that queries are only executed when the SubiConnect context is properly initialised.

- **Query Execution Control**: The `useSubiConnectQuery` hook now checks the `initialised` state of the SubiConnect context before executing a query. This ensures that queries are not executed prematurely.
