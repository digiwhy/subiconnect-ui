export interface ILogger {
  /**
   * Log a message.
   * @param key The key to identify the message.
   * @param customData Additional data to log.
   */
  log(key: string, customData?: Record<string, unknown>): void;

  /**
   * Log an error.
   * @param key The key to identify the error.
   * @param error The error to log.
   * @param customData Additional data to log.
   */
  error(key: string, error: Error, customData?: Record<string, unknown>): void;
}
