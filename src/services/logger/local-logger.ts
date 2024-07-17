import type { ILogger } from './ILogger';

class LocalLogger implements ILogger {
  public async log(
    key: string,
    customData?: Record<string, unknown>,
  ): Promise<void> {
    const logMessage = `%c [🔗] ${key} ${customData ? JSON.stringify(customData) : ''}`;

    if (process.env.NODE_ENV === 'local') {
      console.log(logMessage, 'color: #5E17EB; background: #E6E6EE;');
    }
  }

  public async error(
    key: string,
    error: Error,
    customData?: Record<string, unknown>,
  ): Promise<void> {
    const logMessage = `%c [🔗] ${key} ${error.message} ${customData ? JSON.stringify(customData) : ''}`;

    if (process.env.NODE_ENV === 'local') {
      console.error(logMessage, 'color: #000650; background: #FEECEC;');
    }
  }
}

export default LocalLogger;
