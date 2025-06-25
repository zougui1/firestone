import { sort, sum } from 'radash';
import munkres from 'munkres-js';

import type { ArtifactType, CrewHero, WarMachineInput, WarMachineRarity } from '../types';
import { calculateEngineerLevel } from '../engineer';
import { getCrewCount } from '../getCrewCount';
import { getWarMachineCampaignStats } from './utils/getWarMachineCampaignStats';
import { getWarMachineHungarianArray } from './utils/getWarMachineHungarianArray';

export const computeBestFormation = (data: ComputeBestFormationData) => {
  const heroes = Object
    .values(data.crewHeroes)
    // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
    .filter(hero => hero.attributeArmor || hero.attributeDamage || hero.attributeHealth);

  const warMachines = Object
    .values(data.warMachines)
    .filter(warMachine => warMachine.level);

  if (!warMachines.length) {
    return {
      campaignPower: 0,
      warMachines: [],
    };
  }

  const totalWarMachineLevels = sum(warMachines, warMachine => (warMachine.level ?? 1) - 1);
  const engineerLevel = calculateEngineerLevel(totalWarMachineLevels * 100);
  const crewCount = getCrewCount(engineerLevel);
  const scores: Record<string, Record<string, number>> = {};

  const computationData = {
    ...data,
    crewCount,
    engineerLevel,
    scores,
  };

  for (const warMachine of warMachines) {
    const heroScores: Record<string, number> = {};
    scores[warMachine.name] = heroScores;

    for (const hero of heroes) {
      heroScores[hero.name] = getWarMachineCampaignStats(warMachine, [hero], computationData).power;
    }
  }

  const results = getWarMachineHungarianArray(warMachines, heroes, computationData);
  const assignments = munkres(results.hungarianArray);
  // Convert assignments to a dictionary-like object
  const optimalWarMachines = Object.fromEntries(assignments);

  const crews: Record<string, string[]> = {};

  for (const [heroId, warMachinePosition] of Object.entries(optimalWarMachines)) {
    // If you have more heros than WMs we just need to ignore the extra ones
    if (Math.floor(warMachinePosition / crewCount) >= 5) {
      continue;
    }

    const warMachineName = results.warMachineOrder[Math.floor(warMachinePosition / crewCount)]?.name;
    const hero = heroes[Number(heroId)];

    if (warMachineName && hero) {
      crews[warMachineName] ??= [];
      crews[warMachineName].push(hero.name);
    }
  }

  const strongestWarMachines = sort(
    warMachines.map(warMachine => ({
      ...warMachine,
      ...getWarMachineCampaignStats(
        warMachine,
        (crews[warMachine.name]?.map(heroName => data.crewHeroes[heroName]).filter(Boolean) ?? []) as CrewHero[],
        computationData,
      ),
    })),
    warMachine => warMachine.power,
    true,
  ).slice(0, 5);
  const formation = sort(
    strongestWarMachines,
    // favoritize tanks to be on the front and damage dealers on the back
    warMachine => warMachine.health + warMachine.armor * 10 - warMachine.damage * 10,
  ).map(warMachine => {
    return {
      name: warMachine.name,
      power: warMachine.power,
      damage: warMachine.damage,
      health: warMachine.health,
      armor: warMachine.armor,
      rarity: warMachine.rarity,
      crew: crews[warMachine.name] ?? [],
    };
  });

  const campaignPower = sum(formation, warMachine => warMachine.power);

  return {
    campaignPower,
    warMachines: formation,
  };
}

export interface ComputeBestFormationData {
  warMachines: Record<string, WarMachineInput>;
  crewHeroes: Record<string, CrewHero>;
  artifactTypes: Record<string, ArtifactType>;
}

export interface ComputedWarMachine {
  name: string;
  crew: string[];
  power: number;
  damage: number;
  health: number;
  armor: number;
  rarity: WarMachineRarity;
}
