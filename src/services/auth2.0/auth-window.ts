import type React from 'react';

const waitForWindowClose = ({
  authWindow,
  setIsPending,
  onSuccess,
}: {
  authWindow: Window | null | undefined;
  setIsPending: React.Dispatch<React.SetStateAction<boolean>>;
  onSuccess: () => Promise<void>;
}): Promise<void> => {
  return new Promise((resolve) => {
    const reset = () => {
      clearInterval(checkWindowClosed);
      setIsPending(false);
      resolve();
    };

    const checkWindowClosed = setInterval(() => {
      if (authWindow?.closed) {
        reset();
      }
    }, 500);

    const handleMessage = async (event: MessageEvent) => {
      if (event.data === 'auth_complete') {
        authWindow?.close();
        clearInterval(checkWindowClosed);
        await onSuccess();
        setIsPending(false);
        resolve();
      }
    };

    // Listen for messages from the auth window
    window.addEventListener('message', handleMessage, { once: true });

    // Cleanup listener in case of resolve or unmount
    return () => {
      window.removeEventListener('message', reset);
    };
  });
};

export const handleOAuth2OnSuccess = async ({
  authWindow,
  redirectUri,
  setIsPending,
  setWindowFailed,
  onSuccess,
}: {
  authWindow: Window | null | undefined;
  redirectUri: string;
  setIsPending: React.Dispatch<React.SetStateAction<boolean>>;
  setWindowFailed: React.Dispatch<React.SetStateAction<boolean>>;
  onSuccess: () => Promise<void>;
}) => {
  if (authWindow === undefined) {
    const width = 600,
      height = 600;
    const left = window.innerWidth / 2 - width / 2;
    const top = window.innerHeight / 2 - height / 2;

    authWindow = window.open(
      redirectUri,
      '',
      `popup, toolbar=no, location=no, directories=no, status=no, menubar=no, 
        scrollbars=no, copyhistory=no, width=${width}, 
        height=${height}, top=${top}, left=${left}`,
    );
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

  return await waitForWindowClose({ authWindow, setIsPending, onSuccess });
};
