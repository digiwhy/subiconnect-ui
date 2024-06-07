import { Me } from 'types/user';

export const getUser = async (): Promise<Me> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_API_URL}account-user/me/`,
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
