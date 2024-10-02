---
'@subifinancial/subi-connect': patch
---

Added a `updateAccessToken` method in `connection-service.ts` to update the access token in storage, and set the Authorization header with the new token—the error interceptor now uses this method to update the token.

