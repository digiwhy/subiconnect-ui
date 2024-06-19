'use client';

import { VITE_BASE_COMPONENTS_API } from "@/envs";

export const connectionFn = async (apiKey: string) => {
  const response = await fetch(
    `${VITE_BASE_COMPONENTS_API}authentication/company-access-token`,
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
