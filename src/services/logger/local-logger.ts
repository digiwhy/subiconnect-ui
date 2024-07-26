import type { ILogger } from './ILogger';

class LocalLogger implements ILogger {
  public async log(
    key: string,
    customData?: Record<string, unknown>,
  ): Promise<void> {
    const logMessage = `%c [🔗] `;

    if (process.env.NODE_ENV === 'development') {
      console.log(
        ...[
          logMessage,
          'color: #5E17EB; background: #E6E6EE;',
          key,
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
    const logMessage = `%c [🔗🚨] `;

    if (process.env.NODE_ENV === 'development') {
      console.error(
        ...[
          logMessage,
          'color: #000650; background: #FEECEC;',
          `${key} [${error.message}]`,
          { error },
          customData,
        ].filter(Boolean),
      );
    }
  }
}

export default LocalLogger;
