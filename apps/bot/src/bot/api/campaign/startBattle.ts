import { z } from 'zod/v4';

import { request } from '../socket'
import { jsonSchema } from '../../../utils';

const responseSchema = z.object({
  Function: z.literal('WarfrontReplies'),
  SubFunction: z.literal('StartCampaignBattleReply'),
});

const dataSchema = z.tuple([
  z.string(),
  z.string(),
  jsonSchema(z.object({
    battleLogEntries: z.array(z.object({
      A: z.number(),
    })),
  })),
  z.string(),
  z.boolean(),
]).transform(([, , { battleLogEntries }]) => {
  const lastEntry = battleLogEntries.at(-1);

  return {
    battleLogEntries,
    hasWon: !!lastEntry && lastEntry.A !== 0,
  };
});

export const startBattle = ({ mission, difficulty }: StartBattleOptions) => {
  return request({
    type: 'StartCampaignBattle',
    parameters: [mission, difficulty],
    responseSchema,
    dataSchema,
  });
}

export interface StartBattleOptions {
  mission: number;
  difficulty: number;
}
