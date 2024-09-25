---
'@subifinancial/subi-connect': minor
---

- Removed all global instances of axios and connection service for better performance on multi-tenant workflows.
- Updated the authentication window process.
- Introduced a new `cleanupAll` function to clear all access tokens and optionally invalidate the SubiConnect query cache.
- **Removed Singleton Pattern**: Removed the singleton instance and static `getInstance` method, allowing for instantiation via the constructor.
- **Constructor Changes**: 
  - Introduced constructor to initialise `connectionFn` and `context`.
  - Initialised `httpClient` using the `httpClient` function from the index module.
- **Updated Storage Key Method**: Simplified `getStorageKey()` by removing base URL dependency.
- **HTTP Client Creation**: Replaced direct Axios client creation with a new `httpClient` function that accepts a `ConnectionService` instance.
- **Interceptors Setup**: Moved the request and response interceptor setup to the new `httpClient` function.
- **Auth Window Handling**: Improved handling of the auth window, including better error handling and cleanup.
- **Connection Service**: Simplified the `ConnectionService` class, removing unnecessary methods and properties.

