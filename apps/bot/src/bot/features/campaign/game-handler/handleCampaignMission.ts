import { Effect, pipe } from 'effect';

import * as api from '../../../api';
import * as database from '../../../database';
import { EventQueue } from '../../../eventQueue';
import { env } from '../../../../env';

// TODO get those values from successful simulations
const level = 10;
const difficulty = 'easy';
const diff = 1;
const successChance = 0.1;

export const handleCampaignMission = () => {
  return Effect.gen(function* () {
    const config = yield* database.config.findOne();
    const eventQueue = yield* EventQueue;

    const { done, hasWon } = yield* api.campaign.startBattle({ mission: level, difficulty: diff }).pipe(
      Effect.map(result => ({ ...result, done: true })),
      Effect.catchTag('TimeoutError', () => pipe(
        Effect.logWarning('Request to start campaign battle timed out'),
        Effect.as({ done: false, hasWon: false }),
      )),
    );

    const timeoutSeconds = done
      ? config.features.campaignMission.battleCooldownSeconds
      : env.firestone.blindTimeoutSeconds;

    yield* database.campaignMission.addAttempt({
      level,
      difficulty,
      successChance,
      won: hasWon,
    });

    yield* eventQueue.add({
      type: 'campaignMission',
      timeoutMs: timeoutSeconds * 1000,
    });
  }).pipe(
    Effect.withLogSpan('campaignMission'),
    Effect.withSpan('campaignMission'),
  );
}
