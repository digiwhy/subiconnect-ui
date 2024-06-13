import { logOnDev } from '../../../lib/utils';
import type { SubiConnectAccessToken } from '../../../types/main';

/**
 * Function to handle token retrieval.
 */
export const getAccessToken = async (
  connectionFn: () => Promise<SubiConnectAccessToken>,
): Promise<SubiConnectAccessToken | null> => {
  try {
    return await connectionFn();
  } catch (error) {
    logOnDev('Error getting new token:', error);
    return null;
  }
};
