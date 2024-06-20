'use client';

import { VITE_BASE_PORTAL_API } from '@/envs';
import { Me } from 'types/user';

export const getUser = async (): Promise<Me> => {
  const response = await fetch(
    `${VITE_BASE_PORTAL_API}account-user/me/`,
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
