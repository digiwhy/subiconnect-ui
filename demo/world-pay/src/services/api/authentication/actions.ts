'use client';

import { Me } from 'types/user';

export const getUser = async (): Promise<Me> => {
  const response = await fetch(
    `${import.meta.env.VITE_BASE_API_URL}account-user/me/`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    }
  );
  const result = await response.json();
  return result;
};
