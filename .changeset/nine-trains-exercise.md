---
'@subifinancial/subi-connect': patch
---



Enhance OAuth2 authentication flow and improve connection handling:

1. Added `connectionService` to the OAuth2 authentication process:
   - Imported `useSubiConnectContext` in the Connect and Integrate component.
   - Passed `connectionService` to `handleOAuth2OnSuccess` function calls.

2. Improved `handleOnOpenChange` function:
   - Simplified setting the `open` state.
   - Only reset `isPending` state when closing the dialogue.

3. Enhanced `waitForWindowClose` function:
   - Added `connectionService` parameter.
   - Implemented `checkIntegrationSuccess` to check OAuth status before closing the window.
   - Improved cleanup process and error handling.

4. Updated `handleOAuth2OnSuccess` function:
   - Added `connectionService` parameter and passed it to `waitForWindowClose`.

5. General code improvements:
   - Added `void` keyword to asynchronous function calls in switch statement.
   - Improved error handling and logging in `checkIntegrationSuccess`.

These changes enhance the OAuth2 authentication process, improve connection handling, and provide better integration with the Subi Connect service.
