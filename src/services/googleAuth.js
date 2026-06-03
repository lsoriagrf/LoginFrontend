function waitForGoogleSdk(timeoutMs = 10000) {
  return new Promise((resolve, reject) => {
    if (window.google?.accounts?.oauth2) {
      resolve();
      return;
    }

    const startedAt = Date.now();
    const intervalId = setInterval(() => {
      if (window.google?.accounts?.oauth2) {
        clearInterval(intervalId);
        resolve();
        return;
      }

      if (Date.now() - startedAt >= timeoutMs) {
        clearInterval(intervalId);
        reject(new Error('Google SDK failed to load'));
      }
    }, 100);
  });
}

export function requestGoogleAccessToken(clientId) {
  if (!clientId) {
    return Promise.reject(new Error('Missing VITE_GOOGLE_CLIENT_ID in .env'));
  }

  return waitForGoogleSdk().then(
    () =>
      new Promise((resolve, reject) => {
        const client = window.google.accounts.oauth2.initTokenClient({
          client_id: clientId,
          scope: 'openid email profile',
          callback: (response) => {
            if (response.error) {
              reject(new Error(response.error));
              return;
            }
            resolve(response.access_token);
          }
        });
        client.requestAccessToken();
      })
  );
}
