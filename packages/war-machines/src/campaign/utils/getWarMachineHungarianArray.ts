import { sort } from 'radash';

import type { CrewHero, WarMachineInput } from '../../types';
import { getWarMachineCampaignStats, type GetWarMachineCampaignStatsData } from './getWarMachineCampaignStats';

export const getWarMachineHungarianArray = (
  warMachines: WarMachineInput[],
  heroes: CrewHero[],
  data: GetWarMachineHungarianArrayData,
): { hungarianArray: number[][]; warMachineOrder: WarMachineInput[]; heroOrder: string[]; } => {
  let hungarianArray: number[][] = [];
  let warMachineOrder: WarMachineInput[] = [];
  let heroOrder: string[] = [];
  const totalColumns = warMachines.length * data.crewCount;
  const extraColumns = Math.max(heroes.length - totalColumns, 0);
  const extraRows = Math.max(totalColumns - heroes.length, 0);
  let column = 0;
  let row = 0;
  let maxValue = 0;

  for (const warMachine of warMachines) {
    if (column % data.crewCount === 0) {
      warMachineOrder.push(warMachine);
    }

    for (const hero of heroes) {
      if (!heroOrder.includes(hero.name)) {
        heroOrder.push(hero.name)
      }

      const score = data.scores[warMachine.name]?.[hero.name] ?? 0;

      // We want to find the max solution, so we need to negate the values and then add the max, which we'll do below
      for (let i = 0; i < data.crewCount; i++) {
        hungarianArray[row] ??= [];
        hungarianArray[row]?.push(-1 * score);
      }

      if (score > maxValue) {
        maxValue = score;
      }

      row++;
    }

    for (let j = 0; j < extraRows; j++) {
      heroOrder.push('');
      hungarianArray[row + j] = new Array(totalColumns).fill(0) as number[];
    }

    row = 0;
    column += data.crewCount;
  }

  if (extraColumns > 0) {
    for (const row of hungarianArray) {
      for (let i = 0; i < (totalColumns + extraColumns); i++) {
        row[i] ??= 0;
      }
    }
  }

  // We want to get the max value, so we need to add the max value to all of the negative values so the best option is found
  for (const row of hungarianArray) {
    row.forEach((value, columnIndex) => {
      if (value !== 0) {
        row[columnIndex] = value + maxValue;
      }
    });
  }

  const simulationWarMachines = new Set(warMachines);
  let lowestCampaignPower: number | undefined;

  while (simulationWarMachines.size > 5) {
    const weakestWarMachines: Record<string, WarMachineInput> = {};

    for (const warMachine of simulationWarMachines) {
      if (lowestCampaignPower === undefined) {
        lowestCampaignPower = getWarMachineCampaignStats(warMachine, [], data).power;
        weakestWarMachines[lowestCampaignPower] = warMachine;
      } else {
        const campaignPower = getWarMachineCampaignStats(warMachine, [], data).power;
        weakestWarMachines[campaignPower] = warMachine;
      }
    }

    const [[, warMachineToRemove] = []] = sort(
      Object.entries(weakestWarMachines),
      ([key]) => Number(key),
    );

    if (warMachineToRemove) {
      simulationWarMachines.delete(warMachineToRemove);
    }

    const results = getWarMachineHungarianArray([...simulationWarMachines], heroes, data);
    hungarianArray = results.hungarianArray;
    warMachineOrder = results.warMachineOrder;
    heroOrder = results.heroOrder;
  }

  return {
    hungarianArray,
    warMachineOrder,
    heroOrder,
  };
}

export interface GetWarMachineHungarianArrayData extends GetWarMachineCampaignStatsData {
  crewCount: number;
  scores: Record<string, Record<string, number>>;
}
