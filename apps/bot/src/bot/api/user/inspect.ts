import { z } from 'zod/v4';

import { warMachineRarityLevelsToName } from '@zougui/firestone.war-machines';

import { request } from '../socket'
import { jsonSchema } from '../../../utils';

const warMachineCodeToName: Record<number, string> = {
  1: 'fortress',
  7: 'sentinel',
  9: 'talos',
  10: 'earthshatterer',
  11: 'cloudfist',
};

const responseSchema = z.object({
  Function: z.literal('InspectUserReply'),
});

const dataSchema = z.tuple([
  jsonSchema(z.object({
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
        slot: z.number().optional(),
        code: z.number(),
        xp: z.number(),
        BP: z.coerce.number(),
        DT: z.coerce.number(),
        HT: z.coerce.number(),
        AT: z.coerce.number(),
        rarity: z.number(),
      }).transform(warMachine => ({
        slot: warMachine.slot,
        name: warMachineCodeToName[warMachine.code] ?? '',
        xp: warMachine.xp,
        battlePower: warMachine.BP,
        damage: warMachine.DT,
        health: warMachine.HT,
        armor: warMachine.AT,
        rarity: warMachineRarityLevelsToName[warMachine.rarity] ?? 'common',
      }))),
    }).transform(data => data.warMachineList.filter(wm => wm.name)),
  })),
  z.unknown(),
]).transform(([{ warMachineData, ...data }]) => {
  return {
    ...data,
    warMachines: warMachineData,
  };
});

export const inspect = ({ userId }: InspectData) => {
  return request({
    type: 'InspectUser',
    parameters: [userId, 'False'],
    responseSchema,
    dataSchema,
  });
}

export interface InspectData {
  userId: string;
}
