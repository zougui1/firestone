import { Effect, pipe } from 'effect';

import { db } from '@zougui/firestone.db';

import { defaultConfig } from '../../defaultConfig';

export type ConfigType = Omit<typeof db.config['schema'], '_id'>;

export const findOne = () => {
  return pipe(
    Effect.logDebug('Querying config'),
    Effect.flatMap(() => Effect.tryPromise({
      try: async () => {
        const config = await db.config.findOne({});
        return config ?? defaultConfig;
      },
      catch: cause => new Error('Could not find the config', { cause }),
    })),
    Effect.onError(cause => Effect.logError('Could not retrieve the config. Using the default config as fallback', cause)),
    Effect.orElseSucceed(() => defaultConfig),
  );
}
