---
'@subifinancial/subi-connect': patch
---

## Changes

- Modified the `EmployeesTable` component to return `undefined` when the `contexts` array is empty, instead of returning an empty array. This ensures that when no columns are added, an empty context array isn't provided, so rows show correctly.

