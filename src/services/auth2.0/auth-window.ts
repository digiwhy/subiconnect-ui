import type React from 'react';

const waitForWindowClose = (
  authWindow: Window | null | undefined,
  setPending: React.Dispatch<React.SetStateAction<boolean>>,
  onSuccess: () => void,
): Promise<void> => {
  return new Promise((resolve) => {
    const reset = () => {
      clearInterval(checkWindowClosed);
      setPending(false);
      resolve();
    };

    const checkWindowClosed = setInterval(() => {
      if (authWindow?.closed) {
        reset();
      }
    }, 500);

    const handleMessage = (event: MessageEvent) => {
      if (event.data === 'auth_complete') {
        authWindow?.close();
        clearInterval(checkWindowClosed);
        setPending(false);
        onSuccess();
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

export const handleOAuth2OnSuccess = async (
  authWindow: Window | null | undefined,
  redirectUri: string,
  setPending: React.Dispatch<React.SetStateAction<boolean>>,
  setWindowFailed: React.Dispatch<React.SetStateAction<boolean>>,
  onSuccess: () => void,
) => {
  // Check if the popup was blocked

  if (authWindow === undefined) {
    const width = 600,
      height = 600;
    const left = window.innerWidth / 2 - width / 2;
    const top = window.innerHeight / 2 - height / 2;

    authWindow = window.open(
      redirectUri,
      '',
      `toolbar=no, location=no, directories=no, status=no, menubar=no, 
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

  return await waitForWindowClose(authWindow, setPending, onSuccess);
};
