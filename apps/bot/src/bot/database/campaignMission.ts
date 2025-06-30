import { Effect } from 'effect';

import { db } from '@zougui/firestone.db';
import type { CampaignDifficulty } from '@zougui/firestone.types';

export type CampaignMissionType = Omit<typeof db.campaignMission['schema'], '_id'>;

export const findWon = () => {
  return Effect.tryPromise({
    try: async () => {
      return await db.campaignMission.find({
        wonAt: {
          $ne:  null as unknown as undefined,
        },
      });
    },
    catch: cause => new Error('Could not retrieve campaign mission entries', { cause }),
  });
}

export const addAttempt = ({ level, difficulty, won }: {
  level: number;
  difficulty: CampaignDifficulty;
  won: boolean;
}) => {
  return Effect.tryPromise({
    try: async () => {
      await db.campaignMission.upsert({ level, difficulty }, {
        ...(won ? { $set: { wonAt: new Date() } } : {}),
        $inc: { attempts: 1 },
        $setOnInsert: {
          startedAt: new Date(),
        },
      });
    },
    catch: cause => new Error(`Could not update campaign mission ${difficulty}:${level}`, { cause }),
  });
}
