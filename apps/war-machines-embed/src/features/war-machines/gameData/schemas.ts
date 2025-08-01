import { z } from 'zod';

import { type WarMachineRarity, warMachineRarityData } from '@zougui/firestone.war-machines';

const rarities = Object.keys(warMachineRarityData) as [WarMachineRarity, ...WarMachineRarity[]];

export const warMachineSchema = z.object({
  name: z.string(),
  level: z.number().optional(),
  sacredCardLevel: z.number().optional(),
  lostInscriptionLevel: z.number().optional(),
  damageBlueprintLevel: z.number().optional(),
  healthBlueprintLevel: z.number().optional(),
  armorBlueprintLevel: z.number().optional(),
  rarity: z.enum(rarities),
});

export type WarMachine = z.infer<typeof warMachineSchema>;

export const crewHeroSchema = z.object({
  name: z.string(),
  attributeDamage: z.number().optional(),
  attributeHealth: z.number().optional(),
  attributeArmor: z.number().optional(),
});

export type CrewHero = z.infer<typeof crewHeroSchema>;

export const artifactTypeSchema = z.object({
  name: z.string(),
  percents: z.object({
    30: z.number().optional(),
    35: z.number().optional(),
    40: z.number().optional(),
    45: z.number().optional(),
    50: z.number().optional(),
    55: z.number().optional(),
    60: z.number().optional(),
    65: z.number().optional(),
  }),
});

export type ArtifactType = z.infer<typeof artifactTypeSchema>;

export const gameDataSchema = z.object({
  warMachines: z.record(warMachineSchema),
  crewHeroes: z.record(crewHeroSchema),
  artifactTypes: z.record(artifactTypeSchema),
});

export type GameData = z.infer<typeof gameDataSchema>;
