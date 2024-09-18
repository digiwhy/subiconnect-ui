'use client';

import { VITE_BASE_COMPONENTS_API } from '@/envs';
import { CompanPayload } from '@/types/company';

export const connectionFn = async (apiKey: string, company: CompanPayload) => {
  const response = await fetch(
    `${VITE_BASE_COMPONENTS_API}authentication/company-access-token`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
      },
      body: JSON.stringify({
        company: company,
      }),
    },
  );
  const result = await response.json();
  return result.accessToken;
};
