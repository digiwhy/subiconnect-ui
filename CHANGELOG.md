# @subifinancial/subi-connect

## 5.0.0

### Major Changes

- [#175](https://github.com/subifinancial/subi-connect/pull/175)
  [`cd73808`](https://github.com/subifinancial/subi-connect/commit/cd73808eafde4a7e603933929d908dc71d05ed7a)
  Thanks [@keeganpotgieter](https://github.com/keeganpotgieter)! - # Major
  refactor and enhancement of payroll integration functionality:

  - Refactored `ConnectAndIntegrate` component:
    - Improved error handling and user feedback
    - Enhanced OAuth2 authentication flow
    - Added support for manual payroll integrations
  - Added new `ManualConnectAndIntegrate` component for manual payroll systems
  - Introduced `Portal` component for consistent integration UI across different
    payroll types
  - Updated `PayrollIntegrationListGrid` to support both automatic and manual
    payroll systems
  - Refactored and improved hooks:
    - Added `useConnectPayrollMutation`
    - Added `useIntegrateCustomPayrollMutation`
    - Added `useIntegrateManualPayrollMutation`
  - Enhanced context providers:
    - Added `ManualPayrollSystemProvider`
    - Updated `PayrollSystemProvider`
    - Improved `PayrollIntegrationProvider`
  - Updated types and interfaces:
    - Added `ManualIntegrationAccountPayrollSystemExtended`
    - Enhanced `AccountPayrollSystemExtended`
    - Added new types for integration params and mutation props
  - Improved utility functions:
    - Enhanced `removeUndefinedValues`
    - Added `tw` function for tagged template literals with Tailwind classes
  - Updated API service layer:
    - Added support for manual payroll integration
    - Improved typing and error handling
  - Enhanced UI components:
    - Updated `BaseCard` for better flexibility
    - Improved `Button` component with new variants
  - Updated Tailwind configuration:
    - Added new utility classes
    - Improved type safety

  These changes significantly improve the flexibility, maintainability, and user
  experience of the payroll integration system, allowing for both automatic and
  manual integrations with enhanced error handling and UI consistency.

  # Manual payroll integration

  - Added new `ManualConnectAndIntegrate` component for manual payroll systems
  - Added new `ManualPayrollSystemProvider` context provider for manual payroll
    systems
  - Added new `ManualIntegrationAccountPayrollSystemExtended` type for manual
    payroll systems

  ## Example usage

  ```tsx
  const manualIntegrations: [
    {
      onConnect: ({ payrollSystem, onSuccessCallback, onCancelCallback }) => {
        setTimeout(() => {
          const result = window.confirm('Are you sure you want to connect?');
          if (result) {
            console.log('Connected', { payrollSystem });
            onSuccessCallback(); // Call this to complete the integration workflow
          } else {
            console.log('Cancelled', { payrollSystem });
            onCancelCallback(); // Call this to cancel the integration workflow
          }
        }, 200);
      },
      friendlyName: 'ADP',
      bannerImgUrl:
        'https://au.adp.com/-/media/adp/redesign2018/ui/logo-adp-fy19.svg?rev=0769ecbf84a9412a93e2cd52b7319a13&hash=C2451A542096BF16BC40698417D5A6FD',
      description:
        'Import from ADP to securely share your payroll data with Your Company.',
      actionButtonText: 'Upload',
    },
  ];

  const Component = () => {
    const onIntegrationSuccess = () => {
      console.log('Integration successful');
    };

    return (
      <PayrollIntegrationList
      manualIntegrations={manualIntegrations}
      onIntegrationSuccess={onIntegrationSuccess}
      />
    );
  };
  ```

### Minor Changes

- [#173](https://github.com/subifinancial/subi-connect/pull/173)
  [`e6fc1dd`](https://github.com/subifinancial/subi-connect/commit/e6fc1dd5094110562abcd7ccce89e7376ac89474)
  Thanks [@keeganpotgieter](https://github.com/keeganpotgieter)! - Expose
  connect and integrate mutations.

- [#176](https://github.com/subifinancial/subi-connect/pull/176)
  [`eca5919`](https://github.com/subifinancial/subi-connect/commit/eca59191808d73a9aae3385b9759a847aa3aeaa7)
  Thanks [@keeganpotgieter](https://github.com/keeganpotgieter)! - # Changeset:
  Minor Update for Payroll Integration

  ## Overview

  This changeset introduces improvements to the handling of manual payroll
  connections and enhances the display of payroll integration options. The main
  goal is to provide flexibility in how connection types are presented to users,
  ensuring consistency across the application.

  ## Key Changes

  1. **Enum Update**: The payroll connection type for manual systems has been
     changed from `MANUAL` to `MANUALLY`. This change improves clarity by
     aligning the naming convention with the action (connecting manually).
  2. **New Prop for Visibility Control**:
     - Added a new optional prop, `showManualConnectionTypes`, to the
       `PayrollIntegrationListGrid` component. This prop allows developers to
       control the visibility of manual payroll connection types based on the
       application's context.
  3. **Conditional Rendering of Manual Connections**:
     - In the `PayrollIntegrationListGrid` component, added logic to
       conditionally render payroll systems based on the new
       `showManualConnectionTypes` prop. If set to `false`, manual payroll
       systems will not be displayed, enhancing user experience by reducing
       clutter in the UI.
  4. **Refactoring of Manual Connect Card**:
     - Updated the `ManualConnectCard` component to use the new `Payroll` enum
       for the name display, ensuring consistent references throughout the
       application.

  ## Detailed Changes

  ### 1. Update to `PayrollConnectionTypeEnum`

  **File**: `src/services/api/payroll/types.ts`

  ```diff
   export enum PayrollConnectionTypeEnum {
  -  MANUAL = 'MANUAL',
  +  MANUALLY = 'MANUALLY',
     CUSTOM = 'CUSTOM',
     OAUTH2 = 'OAUTH2',
     OAUTH2_AND_COMPANY_MANUALLY = 'OAUTH2_AND_COMPANY_MANUALLY',
  ```

## 4.0.3

### Patch Changes

- [#170](https://github.com/subifinancial/subi-connect/pull/170)
  [`57b9156`](https://github.com/subifinancial/subi-connect/commit/57b9156784f2699457cdf5fe58ad7da11885a8d5)
  Thanks [@keeganpotgieter](https://github.com/keeganpotgieter)! - This change
  updates the `SubiConnectProvider` and `useSubiConnectQuery` components to
  improve dependency management and query execution control. The changes address
  potential issues with stale closures and ensure that queries are only executed
  when the SubiConnect context is properly initialised.

  - **Query Execution Control**: The `useSubiConnectQuery` hook now checks the
    `initialised` state of the SubiConnect context before executing a query.
    This ensures that queries are not executed prematurely.

- [#171](https://github.com/subifinancial/subi-connect/pull/171)
  [`a322ebb`](https://github.com/subifinancial/subi-connect/commit/a322ebbd3d56b6c932c930aeb48e2ab64d8b6d62)
  Thanks [@keeganpotgieter](https://github.com/keeganpotgieter)! - Added a
  `updateAccessToken` method in `connection-service.ts` to update the access
  token in storage, and set the Authorization header with the new token—the
  error interceptor now uses this method to update the token.

## 4.0.2

### Patch Changes

- [#168](https://github.com/subifinancial/subi-connect/pull/168)
  [`d9496b6`](https://github.com/subifinancial/subi-connect/commit/d9496b6f9ca0eafe6960528329665b8f6bc0ec5e)
  Thanks [@keeganpotgieter](https://github.com/keeganpotgieter)! - This update
  refactors the logger implementation and improves dependency injection
  throughout the codebase. It introduces a new `Logger` class that can be
  instantiated and passed to other services, enhancing testability and
  flexibility.

  The changes address potential issues with global state and improve the overall
  architecture by:

  1. Replacing the global logger instance with a class-based approach
  2. Implementing dependency injection for the logger in various services
  3. Enhancing error handling in the connection service
  4. Improving the structure of interceptors by passing necessary dependencies

## 4.0.1

### Patch Changes

- [#165](https://github.com/subifinancial/subi-connect/pull/165)
  [`d77786f`](https://github.com/subifinancial/subi-connect/commit/d77786f70221e5263353c8432d7b959d06bd094c)
  Thanks [@keeganpotgieter](https://github.com/keeganpotgieter)! - ## Changes

  - Modified the `EmployeesTable` component to return `undefined` when the
    `contexts` array is empty, instead of returning an empty array. This ensures
    that when no columns are added, an empty context array isn't provided, so
    rows show correctly.

## 4.0.0

### Major Changes

- [#163](https://github.com/subifinancial/subi-connect/pull/163)
  [`40d8daf`](https://github.com/subifinancial/subi-connect/commit/40d8dafcc7770180a30981f924614830df82ac83)
  Thanks [@keeganpotgieter](https://github.com/keeganpotgieter)! - # Major
  Changes

  1. **Employee Table Columns Update:**
     - Updated the employee table columns to support multiple calendars,
       salaries, and emails.
     - Modified components to use new context providers for handling calendar
       and salary data.
  2. **Components Updated:**
     - **`next-payment-date.tsx`**:
       - Added `useCalendar` hook to manage selected calendar ID.
       - Updated rendering logic to handle multiple calendars.
     - **`paycycle.tsx`**:
       - Added `useCalendar` hook to manage selected calendar ID.
       - Updated rendering logic to handle multiple calendars.
     - **`start-employment-date.tsx`**:
       - Added `useCalendar` hook to manage selected calendar ID.
       - Updated rendering logic to handle multiple calendars.
     - **`hourly-rate.tsx`**:
       - Added `useSalary` hook to manage selected salary ID.
       - Updated rendering logic to handle multiple salaries.
     - **`salary.tsx`**:
       - Added `useSalary` hook to manage selected salary ID.
       - Updated rendering logic to handle multiple salaries.
     - **`core.tsx`**:
       - Updated email column to handle multiple email addresses.
     - **`consts.ts`**:
       - Fixed typo in `startEmploymentDateColumn` export.
     - **`index.tsx`**:
       - Added `CalendarProvider` and `SalaryProvider` to manage context for
         calendar and salary data.
       - Updated `EmployeesTable` component to use new context providers.
  3. **New Context Providers:**
     - **`calendar-context.tsx`**:
       - Created `CalendarProvider` and `useCalendar` hook to manage
         calendar-related state.
     - **`salary-context.tsx`**:
       - Created `SalaryProvider` and `useSalary` hook to manage salary-related
         state.
  4. **Storybook Updates:**
     - **`live.stories.tsx`**:
       - Added new stories for `PayCycle`, `NextPaymentDate`,
         `StartEmploymentDate`, `AllCalendars`, and `AllSalaries`.
  5. **Type Definitions Updated:**
     - **`types.ts`**:
       - Updated `Employee` type to support multiple emails, salaries, and
         calendars.
       - Fixed typo in `SelectableEmployeeColumns`.
  6. **API Types Updated:**
     - **`types.ts`**:
       - Updated `EmployeeFilterFields` to include `email` as a required field.
  7. **Data Table Component Updated:**
     - **`data-table.tsx`**:
       - Added support for `rowContexts` to wrap table rows with context
         providers.
  8. **Employee Info Structure**:

  - `salary` field changed to `salaries` (array of `EmployeeSalary`).
  - `calendar` field changed to `calendars` (array of `EmployeeCalendar`).
  - `email` field changed to `emails` (array of strings).

  These changes introduce significant improvements to the handling of employee
  data, allowing for more flexible and robust management of multiple calendars,
  salaries, and emails.

## 3.1.1

### Patch Changes

- [#160](https://github.com/subifinancial/subi-connect/pull/160)
  [`11ec1a5`](https://github.com/subifinancial/subi-connect/commit/11ec1a5a479d9800da94336f995e05d50ed6dc3a)
  Thanks [@keeganpotgieter](https://github.com/keeganpotgieter)! - ## Purpose

  This PR refactors the OAuth2 authentication flow and improves the handling of
  authentication windows. It introduces a new utility function for generating
  auth window options and updates the connect and integrate component to use
  this new approach.

  ## Problem Solved

  The changes aim to enhance the reliability and consistency of the OAuth2
  authentication process, particularly in handling authentication windows across
  different scenarios. It also improves code reusability by extracting common
  logic into a separate utility function.

## 3.1.0

### Minor Changes

- [#155](https://github.com/subifinancial/subi-connect/pull/155)
  [`427f161`](https://github.com/subifinancial/subi-connect/commit/427f1615c5be2f6a8e6560e199318ecdc10ac876)
  Thanks [@keeganpotgieter](https://github.com/keeganpotgieter)! - - Removed all
  global instances of axios and connection service for better performance on
  multi-tenant workflows.
  - Updated the authentication window process.
  - Introduced a new `cleanupAll` function to clear all access tokens and
    optionally invalidate the SubiConnect query cache.
  - **Removed Singleton Pattern**: Removed the singleton instance and static
    `getInstance` method, allowing for instantiation via the constructor.
  - **Constructor Changes**:
    - Introduced constructor to initialise `connectionFn` and `context`.
    - Initialised `httpClient` using the `httpClient` function from the index
      module.
  - **Updated Storage Key Method**: Simplified `getStorageKey()` by removing
    base URL dependency.
  - **HTTP Client Creation**: Replaced direct Axios client creation with a new
    `httpClient` function that accepts a `ConnectionService` instance.
  - **Interceptors Setup**: Moved the request and response interceptor setup to
    the new `httpClient` function.
  - **Auth Window Handling**: Improved handling of the auth window, including
    better error handling and cleanup.
  - **Connection Service**: Simplified the `ConnectionService` class, removing
    unnecessary methods and properties.

## 3.0.2

### Patch Changes

- [#151](https://github.com/subifinancial/subi-connect/pull/151)
  [`4a12caf`](https://github.com/subifinancial/subi-connect/commit/4a12caf0871e4a2e8d11e8cde306b9bf0939e9cb)
  Thanks [@keeganpotgieter](https://github.com/keeganpotgieter)! - - Fix cleanup
  function on `SubiConnectProvider` unmount.
  - Add context to the queries.

## 3.0.1

### Patch Changes

- [#149](https://github.com/subifinancial/subi-connect/pull/149)
  [`d9fc321`](https://github.com/subifinancial/subi-connect/commit/d9fc32119a6e5bec51dd908c788cda77267c3958)
  Thanks [@keeganpotgieter](https://github.com/keeganpotgieter)! - Fix
  `setContext` not encoding the context during access token context update.

## 3.0.0

### Major Changes

- [#147](https://github.com/subifinancial/subi-connect/pull/147)
  [`8587d57`](https://github.com/subifinancial/subi-connect/commit/8587d574f79ee5c09a314c68d1a2c07462573fae)
  Thanks [@keeganpotgieter](https://github.com/keeganpotgieter)! - # Breaking
  Changes

  - The `SubiConnectProvider` now requires a `companyContext` prop, which is a
    string that uniquely identifies the organization (e.g., company ID or name).
  - Removed the `context` option from `SubiConnectOptions`.

  # New Features

  - Added type safety for the `companyContext` prop in `SubiConnectProvider`.

  # Improvements

  - Updated the `ACCESS_TOKEN_NAME` constant to use a shorter name: 'sc-cat'.
  - Enhanced the `ConnectionService` to handle context changes and update stored
    access tokens accordingly.
  - Improved type definitions for the connection function and related types.

  # Internal Changes

  - Updated demos, stories, and examples to use the new `companyContext` prop.
  - Refactored `ConnectionService` to use the new `companyContext` approach.
  - Updated `getAccessToken` function to use the new `SubiConnectConnectionFn`
    type.

  # Documentation

  - Added comments to `SubiConnectContext` and `SubiConnectProviderProps` for
    better documentation.

  This major version change requires users to update their `SubiConnectProvider`
  usage by adding the `companyContext` prop and removing any `context` option
  from `SubiConnectOptions`.

### Patch Changes

- [#146](https://github.com/subifinancial/subi-connect/pull/146)
  [`2cb8455`](https://github.com/subifinancial/subi-connect/commit/2cb8455fb9d57777f2c8eac69300680d9c31c1a3)
  Thanks [@keeganpotgieter](https://github.com/keeganpotgieter)! - Remove Buffer
  dependency.

## 2.0.1

### Patch Changes

- [#141](https://github.com/subifinancial/subi-connect/pull/141)
  [`fc03eb0`](https://github.com/subifinancial/subi-connect/commit/fc03eb0744d89685e2e04c73595031558e926e6d)
  Thanks [@keeganpotgieter](https://github.com/keeganpotgieter)! - Wrap queries
  and mutations in a Subi Connect wrapper to throw an error when used outside of
  the Subi Connect context.

- [#143](https://github.com/subifinancial/subi-connect/pull/143)
  [`73c4b7c`](https://github.com/subifinancial/subi-connect/commit/73c4b7c3e998bef95755c184687a9a80fd35175a)
  Thanks [@keeganpotgieter](https://github.com/keeganpotgieter)! - Add
  onIntegrationSuccess callback to listen when a payroll system was successfully
  integrated.

- [#142](https://github.com/subifinancial/subi-connect/pull/142)
  [`f0a4e4e`](https://github.com/subifinancial/subi-connect/commit/f0a4e4ee13bfce9c2879f1d0779495884b0bbc96)
  Thanks [@keeganpotgieter](https://github.com/keeganpotgieter)! - Expose the
  `useSubiConnectContext` hook.

## 2.0.0

### Major Changes

- [#136](https://github.com/subifinancial/subi-connect/pull/136)
  [`c889971`](https://github.com/subifinancial/subi-connect/commit/c8899714450b8a5f8a94ea767428fb1188dd7fc6)
  Thanks [@keeganpotgieter](https://github.com/keeganpotgieter)! - Migrate build
  system from `rollup` to `tsup`

  We've transitioned our build process from `rollup` to `tsup` for the following
  reasons:

  1. Reduced bundle size: `tsup` produces smaller output files, optimizing our
     package for faster downloads and reduced storage requirements.
  2. Improved build performance: `tsup` significantly speeds up our build times,
     enhancing developer productivity and CI/CD efficiency.
  3. Simplified configuration: `tsup` offers a more streamlined setup with
     sensible defaults, reducing the complexity of our build configuration.
  4. Better TypeScript support: As a TypeScript-first bundler, `tsup` provides
     improved handling of TypeScript projects without additional plugins.
  5. Tree-shaking and code splitting: `tsup` includes built-in optimizations for
     tree-shaking and code splitting, further reducing bundle sizes and
     improving performance.

  This change should be transparent to end-users but will greatly benefit our
  development process and package distribution.

  ## Other Changes

  - Updated `SubiConnectOptions` to expose a `context` variable to differentiate
    contexts. See [Example 1](#example-1).
  - Updated `SubiConnectContext` to expose a `cleanup` function that can be used
    cleanup the Subi Connect Context when changing contexts, for example,
    logging out. See [Example 2](#example-2).
  - Moves styles import to `@subifinancial/subi-connect/styles.css`. See
    [Example 3](#example-3).

  ## Examples

  ### Example 1

  ```tsx
  ...

  const Component = () => {
      const { data: myCompany } = useMyCompany();

      ...

      const options = {
          context: myCompany.name
      } satisfies SubiConnectOptions;

      return (
          <SubiConnectProvider connectionFn={connectionFn} options={options}>
              ...
          </SubiConnectProvider>
      );
  }

  export default Component;
  ```

  ### Example 2

  ```tsx
  ...

  const Component = () => {
      const { logout } = auth();
      const { cleanup } = useSubiConnectContext();

      ...

      const logoutOnClick = () => {
          logout();
          cleanup();
      }

      return (
          <div>
              ...
              <button onClick={logoutOnClick}>Logout</button>
              ...
          </div>
      );
  }

  export default Component;
  ```

  ### Example 3

  ```tsx
  ...
  import "@subifinancial/subi-connect/styles.css"
  ...
  ```

## 1.5.6

### Patch Changes

- [#133](https://github.com/subifinancial/subi-connect/pull/133)
  [`ffc65f0`](https://github.com/subifinancial/subi-connect/commit/ffc65f0fcea71669df90eecaba420b9db2c7418d)
  Thanks [@keeganpotgieter](https://github.com/keeganpotgieter)! - Introduced a
  new getPayrollFriendlyName function to display user-friendly payroll system
  names throughout the application.

  - Added a `getPayrollFriendlyName` utility function in `src/lib/utils.ts`
  - Updated various components to use the new function for displaying payroll
    system names
  - Added a `friendlyName` property to the `AccountPayrollSystemExtended` type
  - Replaced direct references to `payrollSystem.name` with
    `getPayrollFriendlyName(payrollSystem)`

## 1.5.5

### Patch Changes

- [#130](https://github.com/subifinancial/subi-connect/pull/130)
  [`2c0064b`](https://github.com/subifinancial/subi-connect/commit/2c0064b953f0ff6860e179133950749128a4c21d)
  Thanks [@keeganpotgieter](https://github.com/keeganpotgieter)! - Remove
  'subi-connect' class from components inside provider div container.
  - The 'subi-connect' class is now only applied to the
    - provider div container [@src/context/subi-connect.tsx]
    - dialogue component [@src/ui/dialogue.tsx]

## 1.5.4

### Patch Changes

- [#128](https://github.com/subifinancial/subi-connect/pull/128)
  [`bad7cd0`](https://github.com/subifinancial/subi-connect/commit/bad7cd02402f48b95f16e5bb337be2230320939b)
  Thanks [@keeganpotgieter](https://github.com/keeganpotgieter)! - Increased the
  maximum width of the dialogue content for larger screens.

## 1.5.3

### Patch Changes

- [#125](https://github.com/subifinancial/subi-connect/pull/125)
  [`662a561`](https://github.com/subifinancial/subi-connect/commit/662a561e3f56fb60ba29356e72b6889936e7b8b8)
  Thanks [@keeganpotgieter](https://github.com/keeganpotgieter)! - ### TL;DR

  - Added a CustomLink component and updated the components map and CSS styles.
  - Improved domain input component styling.

  ### What changed?

  - Created a new `CustomLink` component in `custom-link.tsx`
    - Added `CustomLink` to the `otherComponentsMap` in `components-map.tsx`
  - Modified the CSS in `index.css` to apply the font-family directly to the
    `.subi-connect` class instead of all its children
  - Modified the styling of the domain input component:
    - Changed the overflow property from clip to visible for the main container
    - Updated the styling for the subdomain display, improving responsiveness
      and scroll behaviour

## 1.5.2

### Patch Changes

- [#118](https://github.com/subifinancial/subi-connect/pull/118)
  [`18055da`](https://github.com/subifinancial/subi-connect/commit/18055dafcc5bccbe70a524da0dca2d0e1f202c51)
  Thanks [@keeganpotgieter](https://github.com/keeganpotgieter)! - Update the
  input components to not auto-complete.
  - Update ApiKeyInput
  - Update DomainInput
  - Update the stories to correctly test the inputs in a form context

## 1.5.1

### Patch Changes

- [`7df4d4f`](https://github.com/subifinancial/subi-connect/commit/7df4d4fd45f8c841e12d50825cb72cdda9a8d439)
  Thanks [@gustavosubi](https://github.com/gustavosubi)! - set the input content
  as the value and apply the mask using the input type

## 1.5.0

### Minor Changes

- [#115](https://github.com/subifinancial/subi-connect/pull/115)
  [`7d4dd66`](https://github.com/subifinancial/subi-connect/commit/7d4dd66836f6e94d606a62db28bb23a63f9248c3)
  Thanks [@keeganpotgieter](https://github.com/keeganpotgieter)! - Updated MDX
  form components UI/UX. Updated internal typing.

  - Enhanced the API Key Input component with masking functionality
  - Improved the Domain Input component with subdomain extraction and visual
    feedback
  - Added accessibility improvements to the Connect and Integrate dialogue
  - Updated type definitions for better type safety
  - Added Storybook stories for API Key Input and Domain Input components
  - Added 'subi-connect' class directly for better scoping

- [#114](https://github.com/subifinancial/subi-connect/pull/114)
  [`cee661f`](https://github.com/subifinancial/subi-connect/commit/cee661f920b9fe34a10ee8d9bbcca8fe352e1e41)
  Thanks [@keeganpotgieter](https://github.com/keeganpotgieter)! - Add a new
  company hook (useCompanyPayrollIntegrations) that is used to get all the
  integrations the company has connected with.

## 1.4.5

### Patch Changes

- [#112](https://github.com/subifinancial/subi-connect/pull/112)
  [`1882acb`](https://github.com/subifinancial/subi-connect/commit/1882acb8c963f0d6edd007f165d623b4fe32f785)
  Thanks [@gustavosubi](https://github.com/gustavosubi)! - Remove sandbox
  baseURL

## 1.4.4

### Patch Changes

- [#110](https://github.com/subifinancial/subi-connect/pull/110)
  [`f52ce62`](https://github.com/subifinancial/subi-connect/commit/f52ce6253a0eff4472191e74deb610ca69e4138f)
  Thanks [@gustavosubi](https://github.com/gustavosubi)! - Set payrollSystems as
  an empty array as default

## 1.4.3

### Patch Changes

- [#108](https://github.com/subifinancial/subi-connect/pull/108)
  [`ed1c772`](https://github.com/subifinancial/subi-connect/commit/ed1c772d1bc2a5e62fc746c80d9f361176da3881)
  Thanks [@gustavosubi](https://github.com/gustavosubi)! - Add the authorization
  header for GET /company getting the token from local storage

## 1.4.2

### Patch Changes

- [#106](https://github.com/subifinancial/subi-connect/pull/106)
  [`2435506`](https://github.com/subifinancial/subi-connect/commit/243550617273b82276f8a57b5eaa4932abdcdc13)
  Thanks [@gustavosubi](https://github.com/gustavosubi)! - Run CI/CD using the
  production environment on Release

## 1.4.1

### Patch Changes

- [#104](https://github.com/subifinancial/subi-connect/pull/104)
  [`4998c8e`](https://github.com/subifinancial/subi-connect/commit/4998c8e84d3c92621214655bea40d1f463422c7b)
  Thanks [@gustavosubi](https://github.com/gustavosubi)! - Logs for HTTP
  requests

## 1.4.0

### Minor Changes

- [#102](https://github.com/subifinancial/subi-connect/pull/102)
  [`82107e9`](https://github.com/subifinancial/subi-connect/commit/82107e9b94ad45d303adaeaa01a876ef2b7085db)
  Thanks [@gustavosubi](https://github.com/gustavosubi)! - Sandbox option on the
  Provider component

## 1.3.0

### Minor Changes

- [#98](https://github.com/subifinancial/subi-connect/pull/98)
  [`6b115c9`](https://github.com/subifinancial/subi-connect/commit/6b115c93edc2d4bfd130f6fb8060aee79d35e2b3)
  Thanks [@keeganpotgieter](https://github.com/keeganpotgieter)! - Expose all
  Subi Connect types

## 1.2.0

### Minor Changes

- [#95](https://github.com/subifinancial/subi-connect/pull/95)
  [`6f93d5f`](https://github.com/subifinancial/subi-connect/commit/6f93d5f0f67077ed54dfc23cdca0dda5ae99b124)
  Thanks [@gustavosubi](https://github.com/gustavosubi)! - New selectable fields
  in the employees list: Pay Cycle, Next Pay Day and Start Date

## 1.1.6

### Patch Changes

- [#93](https://github.com/subifinancial/subi-connect/pull/93)
  [`3b991b1`](https://github.com/subifinancial/subi-connect/commit/3b991b1bad33a3fd1f4c26b945b717d0bb23be7b)
  Thanks [@keeganpotgieter](https://github.com/keeganpotgieter)! - Add a
  `disableBack` flag to the `PayrollIntegrationManagementPage` header component.
  This is used to remove the ability to 'go back' when using the component
  outside of the `PayrollIntegrationsPage` component.

## 1.1.5

### Patch Changes

- [#91](https://github.com/subifinancial/subi-connect/pull/91)
  [`2996497`](https://github.com/subifinancial/subi-connect/commit/2996497da8605a4396111310751d554f0f3a64f4)
  Thanks [@keeganpotgieter](https://github.com/keeganpotgieter)! - Fix image
  URLs after build v2

## 1.1.4

### Patch Changes

- [#89](https://github.com/subifinancial/subi-connect/pull/89)
  [`e70a7de`](https://github.com/subifinancial/subi-connect/commit/e70a7dee642c712722963550dd07c167f2570e2c)
  Thanks [@keeganpotgieter](https://github.com/keeganpotgieter)! - Fix image
  URLs after build

## 1.1.3

### Patch Changes

- [#86](https://github.com/subifinancial/subi-connect/pull/86)
  [`a3e0aee`](https://github.com/subifinancial/subi-connect/commit/a3e0aee86b43c7db8115fcb5f2dd6ae58fbcd5d1)
  Thanks [@keeganpotgieter](https://github.com/keeganpotgieter)! - Add correct
  URL envs to the release build

## 1.1.2

### Patch Changes

- [#84](https://github.com/subifinancial/subi-connect/pull/84)
  [`c371efc`](https://github.com/subifinancial/subi-connect/commit/c371efcc17b4ec7fe6b8aa02753b309c3cbe05dc)
  Thanks [@keeganpotgieter](https://github.com/keeganpotgieter)! - Fix image url
  during build time

## 1.1.1

### Patch Changes

- [#81](https://github.com/subifinancial/subi-connect/pull/81)
  [`e9f30b9`](https://github.com/subifinancial/subi-connect/commit/e9f30b9ea574dbe6dce980511a4a9d1c7dd6457e)
  Thanks [@keeganpotgieter](https://github.com/keeganpotgieter)! - Added
  `hasConnection` field to the useCompany to determine if the company has
  integrated with a payroll yet.

## 1.1.0

### Minor Changes

- [#77](https://github.com/subifinancial/subi-connect/pull/77)
  [`955fc83`](https://github.com/subifinancial/subi-connect/commit/955fc832e647123ec9b1a46c932247e52ca1c1f1)
  Thanks [@keeganpotgieter](https://github.com/keeganpotgieter)! - Updated the
  logger and added debugging options to the SubiConnectProvider.

## 1.0.3

### Patch Changes

- [#73](https://github.com/subifinancial/subi-connect/pull/73)
  [`5d17675`](https://github.com/subifinancial/subi-connect/commit/5d17675faa1ebf759fc8f777c1e9ab484acdfa92)
  Thanks [@keeganpotgieter](https://github.com/keeganpotgieter)! - Added a
  tooltip to the sync status column headers to better understand what each
  status means

## 1.0.2

### Patch Changes

- [`d51f4b9`](https://github.com/subifinancial/subi-connect/commit/d51f4b90b39a33415b054f44a151c4d9d31ae3c5)
  Thanks [@keeganpotgieter](https://github.com/keeganpotgieter)! - Added more
  information to the README

## 1.0.1

### Patch Changes

- [`b3706e6`](https://github.com/subifinancial/subi-connect/commit/b3706e6a5fd1aac72cb0656190e6fb8d81031150)
  Thanks [@keeganpotgieter](https://github.com/keeganpotgieter)! - Fix the
  README links

## 1.0.0

### Major Changes

- [#51](https://github.com/subifinancial/subi-connect/pull/51)
  [`8b2fba7`](https://github.com/subifinancial/subi-connect/commit/8b2fba7f08eea3afd5e1cf186869e362a29c80c5)
  Thanks [@keeganpotgieter](https://github.com/keeganpotgieter)! - First major
  release of Subi Connect

  - Our documentation provides all the necessary details on how to integrate
    Subi Connect into your React project
  - View the docs at https://subiconnect.subi.au/docs.html
