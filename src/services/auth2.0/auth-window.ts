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
    const response = await connectionService
      .getHttpClient()
      .get(`${process.env.SUBI_CONNECT_PUBLIC_BASE_URL}payroll/oauth-check`);

    if (response.data.success) {
      await onSuccess();
    }
  } catch (error) {
    console.error('Error checking OAuth status:', error);
    // Consider adding error handling or rethrowing
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
    const cleanup = async () => {
      clearInterval(checkWindowClosed);
      await checkIntegrationSuccess({
        connectionService,
        onSuccess: async () => {
          authWindow?.close();
          await onSuccess();
        },
      });
      resolve();
    };

    const checkWindowClosed = setInterval(async () => {
      if (authWindow?.closed) {
        await cleanup();
      }
    }, 500);

    const handleMessage = async (event: MessageEvent) => {
      if (event.data === 'auth_complete') {
        authWindow?.close();
        clearInterval(checkWindowClosed);
        await onSuccess();
        resolve();
      }
    };

    // Listen for messages from the auth window
    window.addEventListener('message', handleMessage, { once: true });

    // Cleanup listener in case of resolve or unmount
    return () => {
      window.removeEventListener('message', handleMessage);
      clearInterval(checkWindowClosed);
      setIsPending(false);
    };
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
