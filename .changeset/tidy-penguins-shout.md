---
'@subifinancial/subi-connect': major
---

# Major refactor and enhancement of payroll integration functionality:

- Refactored `ConnectAndIntegrate` component:
  - Improved error handling and user feedback
  - Enhanced OAuth2 authentication flow
  - Added support for manual payroll integrations

- Added new `ManualConnectAndIntegrate` component for manual payroll systems

- Introduced `Portal` component for consistent integration UI across different payroll types

- Updated `PayrollIntegrationListGrid` to support both automatic and manual payroll systems

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

These changes significantly improve the flexibility, maintainability, and user experience of the payroll integration system, allowing for both automatic and manual integrations with enhanced error handling and UI consistency.

# Manual payroll integration

- Added new `ManualConnectAndIntegrate` component for manual payroll systems
- Added new `ManualPayrollSystemProvider` context provider for manual payroll systems
- Added new `ManualIntegrationAccountPayrollSystemExtended` type for manual payroll systems

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
    ],

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
