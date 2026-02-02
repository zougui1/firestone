import type { WarMachineRarity } from '../types';

export const warMachineRarityData: Record<WarMachineRarity, WarMachineData> = {
  common: {
    rarityLevel: 0,
    abilityActivationChance: 25,
    availableLevel: 1,
  },
  uncommon: {
    rarityLevel: 1,
    abilityActivationChance: 28,
    availableLevel: 10,
  },
  rare: {
    rarityLevel: 2,
    abilityActivationChance: 31,
    availableLevel: 50,
  },
  epic: {
    rarityLevel: 3,
    abilityActivationChance: 34,
    availableLevel: 100,
  },
  legendary: {
    rarityLevel: 4,
    abilityActivationChance: 37,
    availableLevel: 150,
  },
  mythic: {
    rarityLevel: 5,
    abilityActivationChance: 40,
    availableLevel: 230,
  },
  titan: {
    rarityLevel: 6,
    abilityActivationChance: 43,
    availableLevel: 300,
  },
  angel: {
    rarityLevel: 7,
    abilityActivationChance: 46,
    availableLevel: 400,
  },
};

export const warMachineRarityLevelsToName = {
  0: 'common',
  1: 'uncommon',
  2: 'rare',
  3: 'epic',
  4: 'legendary',
  5: 'mythic',
  6: 'titan',
  7: 'angel',
} as Record<number, WarMachineRarity>;

export interface WarMachineData {
  abilityActivationChance: number;
  availableLevel: number;
  rarityLevel: number;
}
