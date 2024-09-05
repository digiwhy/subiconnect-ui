# @subifinancial/subi-connect

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
