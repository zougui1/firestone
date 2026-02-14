import { Effect } from 'effect';

import { startBattle } from './campaign';

export const checkSessionValidity = () => {
  return startBattle({ mission: 0, difficulty: 0 }).pipe(
    Effect.as(true),
    Effect.catchTags({
      ResponseError: () => Effect.succeed(true),
      TimeoutError: () => Effect.succeed(false),
    }),
    Effect.catchAll(e => Effect.gen(function* () {
      console.log("catchAll");
      process.exit(0)
      if (e.message.toLowerCase().includes("another instance")) {
        return false;
      }

      yield* Effect.die(e);
      return false;
    })),
  );
}
