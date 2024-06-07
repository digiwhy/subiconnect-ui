export const connectionFn = async (apiKey: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_API_URL}authentication/company-access-token`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey
      },
      body: JSON.stringify({
        company: {
          referenceId: 'world-pay-demo-referenceId-1',
          name: 'Demo Company'
        }
      })
    }
  );
  const result = await response.json();
  return result.accessToken;
};
