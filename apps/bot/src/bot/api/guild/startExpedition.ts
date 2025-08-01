import { z } from 'zod/v4';

import { request } from '../socket'

const responseSchema = z.object({
  Function: z.literal('GuildMechanismReplies'),
  SubFunction: z.literal('StartExpeditionReply'),
});

const dataSchema = z.union([
  z
    .tuple([z.number(), z.number(), z.number()])
    .transform(([, duration]) => ({
      durationMinutes: duration / 10,
    })),
  z
    .tuple([z.string(), z.number(), z.number(), z.number()])
    .transform(([, duration]) => ({
      durationMinutes: duration / 10,
    })),
]);

export const startExpedition = ({ id }: StartExpeditionOptions) => {
  return request({
    type: 'StartExpedition',
    parameters: [id],
    responseSchema,
    dataSchema,
  });
}

export interface StartExpeditionOptions {
  id: string;
}
