import type { ILogger } from './ILogger';
import LocalLogger from './local-logger';

class Logger implements ILogger {
  private logger: ILogger;
  private enabled: boolean = true;
  private env: string | undefined = process.env.NODE_ENV;

  constructor(logger: ILogger = new LocalLogger(), enabled: boolean = true) {
    this.enabled = enabled;
    this.logger = logger;
  }

  public async log(
    key: string,
    customData?: Record<string, unknown>,
  ): Promise<void> {
    if (this.env === 'development' && this.enabled) {
      return this.logger.log(key, customData);
    }
  }

  public async error(
    key: string,
    error: Error,
    customData?: Record<string, unknown>,
  ): Promise<void> {
    if (this.env === 'development' && this.enabled) {
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

  /**
   * Set the environment.
   * @param env 'development' or 'production'.
   */
  public setEnvironment(env?: 'development' | 'production'): void {
    this.env = env;
  }

  /**
   * Initialise the logger with the provided options.
   * @param env 'development' or 'production'.
   * @param enabled true to enable logging.
   */
  public initialise({
    env,
    enabled,
  }: {
    env?: 'development' | 'production';
    enabled: boolean;
  }): void {
    this.setEnvironment(env);
    this.setEnabled(enabled);

    if (env === 'development' && enabled) {
      this.log('Subi Connect Logger: [Environment] [development 🔨]');
      this.log('Subi Connect Logger: [Enabled] [true ✅]');
    }
  }
}

export default new Logger();
