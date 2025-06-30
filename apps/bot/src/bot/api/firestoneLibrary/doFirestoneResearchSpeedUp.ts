import { z } from 'zod/v4';

import { request } from '../socket'

const responseSchema = z.object({
  Function: z.literal('BuyPremiumProductReplies'),
  SubFunction: z.literal('DoFirestoneResearchSpeedUpReply'),
});

const dataSchema = z.tuple([
  z.number(),
  z.number(),
  z.boolean(),
]);

export const doFirestoneResearchSpeedUp = ({ tree, slot, gems }: DoFirestoneResearchSpeedUpOptions) => {
  return request({
    type: 'DoFirestoneResearchSpeedUp',
    parameters: [tree, slot, gems, 1],
    responseSchema,
    dataSchema,
  });
}

export interface DoFirestoneResearchSpeedUpOptions {
  tree: number;
  slot: number;
  gems: number;
}
