import { Effect, pipe } from 'effect';

import { db } from '@zougui/firestone.db';
import type { CampaignDifficulty } from '@zougui/firestone.types';

export type CampaignMissionType = Omit<typeof db.campaignMission['schema'], '_id'>;

export const findByTreeLevel = ({ level, difficulty }: {
  level: number;
  difficulty: CampaignDifficulty;
}) => {
  const defaultCampaignMission: CampaignMissionType = {
    level,
    difficulty,
    attempts: [],
    won: false,
  };

  return pipe(
    Effect.logDebug('Querying campaign mission'),
    Effect.flatMap(() => Effect.tryPromise({
      try: async () => {
        const campaignMission = await db.campaignMission.findOne({ level, difficulty });

        if (!campaignMission) {
          await db.campaignMission.insertOne(defaultCampaignMission);
        }

        return campaignMission ?? defaultCampaignMission;
      },
      catch: cause => new Error(`Could not find or create the campaign mission ${difficulty}:${level}`, { cause }),
    })),
    Effect.onError(cause => Effect.logError(`Could not retrieve the campaign mission ${difficulty}:${level}. Using empty value as fallback`, cause)),
    Effect.orElseSucceed(() => defaultCampaignMission),
  );
}

export const addAttempt = ({ level, difficulty, successChance, won }: {
  level: number;
  difficulty: CampaignDifficulty;
  successChance: number;
  won: boolean;
}) => {
  return Effect.tryPromise({
    try: async () => {
      await db.campaignMission.updateOne({ level, difficulty }, {
        $set: { won },
        $push: {
          attempts: { successChance },
        },
      });
    },
    catch: cause => new Error(`Could not update campaign mission ${difficulty}:${level}`, { cause }),
  });
}
