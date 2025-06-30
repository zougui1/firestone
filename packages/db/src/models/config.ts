import { schema, types } from 'papr';

import type { GameFeature, Guardian } from '@zougui/firestone.types';

import { papr } from '../client';

const guardians: (Guardian | 'auto')[] = ['Vermillion', 'Grace', 'Ankaa', 'Azhar', 'auto'];

export const config = papr.model('configs', schema({
  sessionId: types.string({ required: true }),
  gameVersion: types.string({ required: true }),
  disabled: types.boolean(),
  features: types.object({
    engineerTools: types.object({
      enabled: types.boolean({ required: true }),
    }, { required: true }),
    campaignLoot: types.object({
      enabled: types.boolean({ required: true }),
    }, { required: true }),
    campaignMission: types.object({
      enabled: types.boolean({ required: true }),
      battleCooldownSeconds: types.number({ required: true }),
    }, { required: true }),
    guardianTraining: types.object({
      enabled: types.boolean({ required: true }),
      guardian: types.enum(guardians, { required: true }),
      cooldownSeconds: types.number({ required: true }),
    }, { required: true }),
    firestoneResearch: types.object({
      enabled: types.boolean({ required: true }),
      treeLevel: types.number({ required: true, minimum: 1 }),
    }, { required: true }),
    guildExpedition: types.object({
      enabled: types.boolean({ required: true }),
    }, { required: true }),
    oracleRitual: types.object({
      enabled: types.boolean({ required: true }),
    }, { required: true }),
    pickaxesClaiming: types.object({
      enabled: types.boolean({ required: true }),
    }, { required: true }),
    alchemyExperiment: types.object({
      enabled: types.boolean({ required: true }),
      treeLevel: types.number({ required: true, minimum: 1 }),
      blood: types.boolean({ required: true }),
      dust: types.boolean({ required: true }),
      exoticCoins: types.boolean({ required: true }),
      durationMinutes: types.number({ required: true }),
    }, { required: true }),
    mapMission: types.object({
      enabled: types.boolean({ required: true }),
    }, { required: true }),
  } satisfies Record<GameFeature, unknown>, { required: true }),
}));
