import { getIntegrationStatus } from '../api/payroll/actions';
import type { ConnectionService } from '../axios/connection-service';
import { getAuthWindowOptions } from './utils';
import type React from 'react';

const checkIntegrationSuccess = async ({
  connectionService,
  onSuccess,
}: {
  connectionService: ConnectionService;
  onSuccess: () => Promise<void>;
}) => {
  try {
    const success = await getIntegrationStatus(connectionService)();

    if (success) {
      await onSuccess();
    }
  } catch (error) {
    console.error('[Subi Connect] Error checking OAuth status:', error);
  }
};

const waitForWindowClose = ({
  authWindow,
  setIsPending,
  onSuccess,
  connectionService,
}: {
  authWindow: Window | null | undefined;
  setIsPending: React.Dispatch<React.SetStateAction<boolean>>;
  onSuccess: () => Promise<void>;
  connectionService: ConnectionService;
}): Promise<void> => {
  return new Promise((resolve) => {
    // Cleanup function to be called when the window is closed or the component unmounts
    const cleanup = async () => {
      clearInterval(windowCheckInterval);
      window.removeEventListener('message', handleMessage);
      setIsPending(false);
      resolve();
    };

    // Function to check integration status and close the window
    const finaliseAuth = async () => {
      clearInterval(windowCheckInterval);

      await checkIntegrationSuccess({
        connectionService,
        onSuccess: async () => {
          authWindow?.close();
          await onSuccess();
        },
      });
      cleanup();
    };

    const windowCheckInterval = setInterval(async () => {
      if (authWindow?.closed) {
        await finaliseAuth();
      }
    }, 500);

    const handleMessage = async (event: MessageEvent) => {
      if (event.data === 'auth_complete') {
        authWindow?.close();
        await onSuccess();
        cleanup();
      }
    };

    // Listen for messages from the auth window
    window.addEventListener('message', handleMessage, { once: true });
  });
};

export const handleOAuth2OnSuccess = async ({
  authWindow,
  redirectUri,
  setIsPending,
  setWindowFailed,
  onSuccess,
  connectionService,
}: {
  authWindow: Window | null | undefined;
  redirectUri: string;
  setIsPending: React.Dispatch<React.SetStateAction<boolean>>;
  setWindowFailed: React.Dispatch<React.SetStateAction<boolean>>;
  onSuccess: () => Promise<void>;
  connectionService: ConnectionService;
}) => {
  if (authWindow === undefined) {
    authWindow = window.open(redirectUri, '', getAuthWindowOptions());
  }

  if (
    !authWindow ||
    authWindow.closed ||
    typeof authWindow.closed === 'undefined'
  ) {
    setWindowFailed(true);
  } else {
    authWindow.location.href = redirectUri;
    setWindowFailed(false);
  }

  return await waitForWindowClose({
    authWindow,
    setIsPending,
    onSuccess,
    connectionService,
  });
};
