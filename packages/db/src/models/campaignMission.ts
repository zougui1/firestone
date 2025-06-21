import { schema, types } from 'papr';

import type { CampaignDifficulty } from '@zougui/firestone.types';

import { papr } from '../client';

const difficulties: CampaignDifficulty[] = ['easy', 'normal', 'hard', 'insane', 'nightmare'];

export const campaignMission = papr.model('campaignMissions', schema({
  level: types.number({ minimum: 1, required: true }),
  difficulty: types.enum(difficulties, { required: true }),
  attempts: types.array(
    types.object({
      successChance: types.number({ minimum: 0, required: true }),
    }),
    { required: true },
  ),
  won: types.boolean({ required: true }),
}));
