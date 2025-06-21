import { Logger } from 'effect';

import { getErrorMessage } from '../utils';
import { env } from '../env';

const sanitizeLogMessage = (message: unknown): unknown => {
  if (message instanceof Error) {
    return getErrorMessage(message);
  }

  if (Array.isArray(message)) {
    return message.map(sanitizeLogMessage);
  }

  if (message && typeof message === 'object') {
    const newMessage: Record<string, unknown> = {};

    for (const [key, value] of Object.entries(message)) {
      newMessage[key] = sanitizeLogMessage(value);
    }

    return newMessage;
  }

  return message;
}

const consoleLogger = Logger.prettyLogger({
  colors: env.isDev,
});

export const logger = consoleLogger;
