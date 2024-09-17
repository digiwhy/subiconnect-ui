---
'@subifinancial/subi-connect': major
---

# Breaking Changes

- The `SubiConnectProvider` now requires a `companyContext` prop, which is a string that uniquely identifies the organization (e.g., company ID or name).
- Removed the `context` option from `SubiConnectOptions`.

# New Features

- Added type safety for the `companyContext` prop in `SubiConnectProvider`.

# Improvements

- Updated the `ACCESS_TOKEN_NAME` constant to use a shorter name: 'sc-cat'.
- Enhanced the `ConnectionService` to handle context changes and update stored access tokens accordingly.
- Improved type definitions for the connection function and related types.

# Internal Changes

- Updated demos, stories, and examples to use the new `companyContext` prop.
- Refactored `ConnectionService` to use the new `companyContext` approach.
- Updated `getAccessToken` function to use the new `SubiConnectConnectionFn` type.

# Documentation

- Added comments to `SubiConnectContext` and `SubiConnectProviderProps` for better documentation.

This major version change requires users to update their `SubiConnectProvider` usage by adding the `companyContext` prop and removing any `context` option from `SubiConnectOptions`.
