import logger from '@/services/logger';
import type {
  SubiConnectAccessToken,
  SubiConnectConnectionFn,
} from '@/types/main';

/**
 * Function to handle token retrieval.
 */
export const getAccessToken = async (
  connectionFn: SubiConnectConnectionFn,
): Promise<SubiConnectAccessToken | null> => {
  try {
    return await connectionFn();
  } catch (error) {
    logger.error('[getAccessToken] Error getting new token', error as Error);
    return null;
  }
};
