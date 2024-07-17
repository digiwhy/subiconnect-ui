import type { ILogger } from './ILogger';
import LocalLogger from './local-logger';

class Logger implements ILogger {
  private logger: ILogger;
  private enabled: boolean = true;

  constructor(logger: ILogger = new LocalLogger(), enabled: boolean = true) {
    this.enabled = enabled;
    this.logger = logger;
  }

  public async log(
    key: string,
    customData?: Record<string, unknown>,
  ): Promise<void> {
    if (this.enabled) {
      return this.logger.log(key, customData);
    }
  }

  public async error(
    key: string,
    error: Error,
    customData?: Record<string, unknown>,
  ): Promise<void> {
    if (this.enabled) {
      return this.logger.error(key, error, customData);
    }
  }

  /**
   * Set whether or not logging is enabled.
   * @param enabled true to enable logging.
   */
  public setEnabled(enabled: boolean): void {
    this.enabled = enabled;
  }
}

export default new Logger();
