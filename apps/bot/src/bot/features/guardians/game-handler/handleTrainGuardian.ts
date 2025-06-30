import { Effect, pipe } from 'effect';

import * as database from '../../../database';
import * as api from '../../../api';
import { EventQueue } from '../../../eventQueue';
import { env } from '../../../../env';

const guardianIds = {
  Vermillion: 0,
  Grace: 1,
  Ankaa: 2,
  Azhar: 3,
} as const;

const guardianById = {
  0: 'Vermillion',
  1: 'Grace',
  2: 'Ankaa',
  3: 'Azhar',
} as const;

const guardianPriorities = [
  'Grace',
  'Vermillion',
  'Ankaa',
  'Azhar',
] as const;

const getGuardianId = (config: database.config.ConfigType) => {
  return Effect.gen(function* () {
    const { guardian } = config.features.guardianTraining;

    if (guardian !== 'auto') {
      return guardianIds[guardian];
    }

    const data = yield* api.user.inspect({
      userId: env.firestone.userId,
    });

    const guardiansByEvolution = Object.groupBy(data.guardians, g => g.evolution ?? 0);
    const evolutions = Object.keys(guardiansByEvolution).map(Number);
    const lowestEvolution = Math.min(...evolutions);
    const lowestGuardians = guardiansByEvolution[lowestEvolution]
      ?.map(g => guardianById[g.code])
      .filter(Boolean);

    if (!lowestGuardians?.length) {
      return guardianIds.Vermillion;
    }

    const priorities = lowestGuardians.map(g => guardianPriorities.indexOf(g));
    const guardianToTrain = guardianPriorities[Math.min(...priorities)];

    if (!guardianToTrain) {
      return guardianIds.Vermillion;
    }

    return guardianIds[guardianToTrain];
  });
}

export const handleTrainGuardian = () => {
  return Effect.gen(function* () {
    const eventQueue = yield* EventQueue;
    const config = yield* database.config.findOne();
    const { cooldownSeconds } = config.features.guardianTraining;

    const guardianId = yield* getGuardianId(config);
    const guardian = guardianById[guardianId];

    yield* Effect.log(`Training guardian ${guardian}`);
    const { trained } = yield* api.guardians.trainGuardian({
      id: guardianId,
    }).pipe(
      Effect.as({ trained: true }),
      Effect.catchTag('TimeoutError', () => pipe(
        Effect.logWarning('Request to train guardian timed out'),
        Effect.as({ trained: false }),
      )),
    );

    const timeoutSeconds = trained ? cooldownSeconds : env.firestone.blindTimeoutSeconds;
    yield* eventQueue.add({
      type: 'guardianTraining',
      timeoutMs: timeoutSeconds * 1000,
    });
  }).pipe(
    Effect.withLogSpan('guardianTraining'),
    Effect.withSpan('guardianTraining'),
  );
}
