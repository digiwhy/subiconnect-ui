---
'@subifinancial/subi-connect': patch
---

Optimise `SubiConnect` provider initialisation and cleanup:
- Set `initialised` state immediately when loading starts
- Remove redundant `initialised` check and set
- Memoise cleanup function with `useCallback` to prevent unnecessary rerenders
- Update dependency array in value memo to include cleanup function 
