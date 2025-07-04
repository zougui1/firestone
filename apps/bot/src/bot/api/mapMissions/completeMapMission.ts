import { z } from 'zod/v4';

import { request } from '../socket'

const responseSchema = z.object({
  Function: z.literal('MapMissionsReplies'),
  SubFunction: z.literal('CompleteMapMissionReply'),
});

const dataSchema = z.tuple([
  z.number(),
  // JSON string
  z.string(),
]);

export const completeMapMission = ({ id }: CompleteMapMissionOptions) => {
  return request({
    type: 'CompleteMapMission',
    parameters: [id],
    responseSchema,
    dataSchema,
  });
}

export interface CompleteMapMissionOptions {
  id: number;
}
