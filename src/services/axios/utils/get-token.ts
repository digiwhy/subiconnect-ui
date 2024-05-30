import { logOnDev } from '../../../lib/utils';

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
