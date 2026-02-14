import { Cause, Effect, Exit, Fiber, Logger, LogLevel } from 'effect';
import { sleep } from 'radash';

import { startBot } from './bot';
import { logger } from './logger';
import { env } from './env';

export const program = async () => {
  const runBot = async () => {
    const bot = Effect.loop(true, {
      while: bool => bool,
      step: () => true,
      body: () => Effect
        .gen(function* () {
          const botEffect = startBot();
          const currentFiber = yield* Effect.fork(botEffect);
          const exit = yield* Fiber.await(currentFiber);

          yield* Exit.match(exit, {
            onSuccess: () => Effect.log('Bot finished'),
            onFailure: cause => Cause.match(cause, {
              onEmpty: Effect.log('Bot terminated'),
              onInterrupt: () => Effect.log('Bot interrupted'),
              onFail: error => Effect.logError('Bot terminated with error:', error),
              onDie: defect => Effect.logFatal('Bot died', defect),
              onParallel: () => Effect.log('Bot terminated'),
              onSequential: () => Effect.log('Bot terminated'),
            }),
          });
          yield* Effect.sleep('2 minutes');
        })
        .pipe(Effect.withSpan('firebot'))
        .pipe(Effect.provide(Logger.replace(Logger.defaultLogger, logger)))
        .pipe(Logger.withMinimumLogLevel(env.isDev ? LogLevel.All : LogLevel.Info))
    });

    const result = await Effect.runPromiseExit(bot);

    if (result._tag === 'Failure') {
      console.error('Bot error:', result.cause);
    }
  }

  // delay the start of the bot to prevent it to start when the
  // client is actually just restarting
  await sleep(3000);
  await runBot();
}
