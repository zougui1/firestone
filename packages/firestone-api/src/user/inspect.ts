import { z } from 'zod/v4';

import { request } from '../request'
import { jsonSchema } from '../utils';

const responseSchema = z.object({
  Function: z.literal('InspectUserReply'),
});

const dataSchema = z.tuple([
  z.object({
    userId: z.string(),
    username: z.string(),
    level: z.number(),
    totalPower: z.number(),
    maxStage: z.number(),
    mapRank: z.number(),
    guildId: z.string(),
    guildName: z.string(),
    guildLevel: z.number(),
    achievements: z.number(),
    oracleLevel: z.number(),
    stars: z.number(),
    missionsWon: z.number(),
    engineerXp: z.number(),
    gearPower: z.number(),
    jewelPower: z.number(),
    soulstonePower: z.number(),

    guardians: jsonSchema(z.object({
      list: z.array(z.object({
        code: z.enum(['0', '1', '2', '3']),
        evolution: z.number().nullable(),
        xp: z.number().nullable(),
      })),
    }).transform(value => value.list)),

    warMachineData: z.object({
      warMachineList: z.array(z.object({
        slot: z.number(),
        code: z.number(),
        xp: z.number(),
        BP: z.string(),
        DT: z.string(),
        HT: z.string(),
        AT: z.string(),
        rarity: z.number(),
      }).transform(warMachine => ({
        slot: warMachine.slot,
        code: warMachine.code,
        xp: warMachine.xp,
        BP: warMachine.BP,
        damage: warMachine.DT,
        health: warMachine.HT,
        armor: warMachine.AT,
        rarity: warMachine.rarity,
      }))),
    }),
  }),
  z.unknown(),
]);

export const inspect = ({ id }: InspectData) => {
  return request({
    type: 'InspectUser',
    parameters: [id, 'False'],
    responseSchema,
    dataSchema,
  }).map(([data]) => data);
}

export interface InspectData {
  id: string;
}
