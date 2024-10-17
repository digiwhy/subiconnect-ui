---
'@subifinancial/subi-connect': minor
---

# Changeset: Minor Update for Payroll Integration

## Overview
This changeset introduces improvements to the handling of manual payroll connections and enhances the display of payroll integration options. The main goal is to provide flexibility in how connection types are presented to users, ensuring consistency across the application.

## Key Changes
1. **Enum Update**: The payroll connection type for manual systems has been changed from `MANUAL` to `MANUALLY`. This change improves clarity by aligning the naming convention with the action (connecting manually).

2. **New Prop for Visibility Control**:
   - Added a new optional prop, `showManualConnectionTypes`, to the `PayrollIntegrationListGrid` component. This prop allows developers to control the visibility of manual payroll connection types based on the application's context.

3. **Conditional Rendering of Manual Connections**:
   - In the `PayrollIntegrationListGrid` component, added logic to conditionally render payroll systems based on the new `showManualConnectionTypes` prop. If set to `false`, manual payroll systems will not be displayed, enhancing user experience by reducing clutter in the UI.

4. **Refactoring of Manual Connect Card**:
   - Updated the `ManualConnectCard` component to use the new `Payroll` enum for the name display, ensuring consistent references throughout the application.

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

