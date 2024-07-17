import type { ILogger } from './ILogger';

class LocalLogger implements ILogger {
  public async log(
    key: string,
    customData?: Record<string, unknown>,
  ): Promise<void> {
    const logMessage = `%c [🔗] ${key} `;

    if (process.env.NODE_ENV === 'local') {
      console.log(
        ...[
          logMessage,
          'color: #5E17EB; background: #E6E6EE;',
          customData,
        ].filter(Boolean),
      );
    }
  }

  public async error(
    key: string,
    error: Error,
    customData?: Record<string, unknown>,
  ): Promise<void> {
    const logMessage = `%c [🔗] ${key} [${error.message}] `;

    if (process.env.NODE_ENV === 'local') {
      console.error(
        ...[
          logMessage,
          'color: #000650; background: #FEECEC;',
          { error },
          customData,
        ].filter(Boolean),
      );
    }
  }
}

export default LocalLogger;
