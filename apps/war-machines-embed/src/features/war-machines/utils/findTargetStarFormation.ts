import { min, max, sort } from 'radash';

import { average } from '~/utils';

import { warMachineBaseData, warMachineRarityData, warMachineRarityLevelsToName } from '@zougui/firestone.war-machines';
import {
  simulateCampaignSummary,
  type ComputedWarMachine,
  type DetailedCampaignResult,
  type MissionResult,
  type MissionSummary,
} from '@zougui/firestone.war-machines/campaign';

import { invokeComputeBestFormation } from '../invokers/invokeComputeBestFormation';
import { simulateDetailedCampaign } from '../hooks';
import { type GameData } from '../gameData';

const totalSimulations = 250;

const orderFromStrongestToWeakeast = (warMachines: ComputedWarMachine[]) => {
  return sort(warMachines, warMachine => warMachine.health + warMachine.armor * 10 + warMachine.damage * 10, true);
}

interface WarMachineMetadata {
  isMain: boolean;
}

export const findTargetStarFormation = async (data: GameData, targetStar: TargetStar, options?: FindTargetStarFormationOptions) => {
  data = structuredClone(data);
  let successChance = 100;
  let needsAbilities = false;

  const currentWarMachines = Object.values(data.warMachines).filter(wm => wm.level);
  const currentBestCrew = await invokeComputeBestFormation(data, options);
  let team = orderFromStrongestToWeakeast(Object.values(currentBestCrew.warMachines)).map(wm => wm.name);
  const currentWarMachinesInTeam = currentWarMachines.filter(wm => team.includes(wm.name));
  const warMachineInTeamLevels = currentWarMachinesInTeam.map(wm => wm.level ?? 0);

  const highestWarMachineLevelWarMachine = max(currentWarMachinesInTeam, wm => wm.level ?? 0);
  const averageWarMachineLevel = average(warMachineInTeamLevels);

  const rarityUpgrades: string[] = [];
  const warMachinesMetadata: Partial<Record<string, WarMachineMetadata>> = {};

  for (const warMachine of currentWarMachines) {
    const level = warMachine.level ?? 0;
    const levelDifference = averageWarMachineLevel - level;

    warMachinesMetadata[warMachine.name] = {
      isMain: levelDifference <= 2,
    };
  }

  if (highestWarMachineLevelWarMachine?.level) {
    for (const warMachine of currentWarMachinesInTeam) {
      const metadata = warMachinesMetadata[warMachine.name];

      if (!metadata || !warMachine.level || highestWarMachineLevelWarMachine.level <= warMachine.level) {
        continue;
      }

      const currentRarityLevel = warMachineRarityData[warMachine.rarity].rarityLevel;
      const nexRarity = warMachineRarityLevelsToName[currentRarityLevel + 1];

      if (nexRarity) {
        const requiredLevel = warMachineRarityData[nexRarity].availableLevel;

        if (warMachine.level >= requiredLevel) {
          rarityUpgrades.push(warMachine.name);
          continue;
        }

        if (warMachine.rarity === 'common') {
          const highestRequiredLevel = warMachineRarityData[highestWarMachineLevelWarMachine.rarity].availableLevel;
          const highestRarityLevel = warMachineRarityData[highestWarMachineLevelWarMachine.rarity].rarityLevel;
          const highestNextRarity = warMachineRarityLevelsToName[highestRarityLevel + 1];

          if (highestNextRarity) {
            const highestNextRequiredLevel = warMachineRarityData[highestNextRarity].availableLevel;
            const difference = highestNextRequiredLevel - highestRequiredLevel;

            if (highestWarMachineLevelWarMachine.level >= (highestRequiredLevel + difference / 2)) {
              rarityUpgrades.push(warMachine.name);
            }
          }
        } else {
          const highestRarityLevel = warMachineRarityData[highestWarMachineLevelWarMachine.rarity].rarityLevel;
          const highestNextRarity = warMachineRarityLevelsToName[highestRarityLevel + 1];
          const highestNextNextRarity = warMachineRarityLevelsToName[highestRarityLevel + 2];

          if (highestNextRarity && highestNextNextRarity) {
            const highestRequiredLevel = warMachineRarityData[highestNextRarity].availableLevel;
            const highestNextRequiredLevel = warMachineRarityData[highestNextNextRarity].availableLevel;
            const difference = highestNextRequiredLevel - highestRequiredLevel;

            if (highestWarMachineLevelWarMachine.level >= (highestRequiredLevel + difference / 2)) {
              rarityUpgrades.push(warMachine.name);
            }
          }
        }
      }
    }

    for (const warMachine of currentWarMachines) {
      if (team.includes(warMachine.name)) {
        continue;
      }

      const metadata = warMachinesMetadata[warMachine.name];

      if (!metadata || !warMachine.level || highestWarMachineLevelWarMachine.level <= warMachine.level) {
        continue;
      }

      const currentRarityLevel = warMachineRarityData[warMachine.rarity].rarityLevel;
      const nexRarity = warMachineRarityLevelsToName[currentRarityLevel + 1];

      if (nexRarity) {
        const requiredLevel = warMachineRarityData[nexRarity].availableLevel;

        if (warMachine.level >= requiredLevel) {
          rarityUpgrades.push(warMachine.name);
          continue;
        }

        if (warMachine.rarity === 'common') {
          const highestRequiredLevel = warMachineRarityData[highestWarMachineLevelWarMachine.rarity].availableLevel;
          const highestRarityLevel = warMachineRarityData[highestWarMachineLevelWarMachine.rarity].rarityLevel;
          const highestNextRarity = warMachineRarityLevelsToName[highestRarityLevel + 1];

          if (highestNextRarity) {
            const highestNextRequiredLevel = warMachineRarityData[highestNextRarity].availableLevel;
            const difference = highestNextRequiredLevel - highestRequiredLevel;

            if (highestWarMachineLevelWarMachine.level >= (highestRequiredLevel + difference / 2)) {
              rarityUpgrades.push(warMachine.name);
            }
          }
        } else {
          const highestRarityLevel = warMachineRarityData[highestWarMachineLevelWarMachine.rarity].rarityLevel;
          const highestNextRarity = warMachineRarityLevelsToName[highestRarityLevel + 1];
          const highestNextNextRarity = warMachineRarityLevelsToName[highestRarityLevel + 2];

          if (highestNextRarity && highestNextNextRarity) {
            const highestRequiredLevel = warMachineRarityData[highestNextRarity].availableLevel;
            const highestNextRequiredLevel = warMachineRarityData[highestNextNextRarity].availableLevel;
            const difference = highestNextRequiredLevel - highestRequiredLevel;

            if (highestWarMachineLevelWarMachine.level >= (highestRequiredLevel + difference / 2)) {
              rarityUpgrades.push(warMachine.name);
            }
          }
        }
      }
    }
  }

  team = team.filter(wm => warMachinesMetadata[wm]?.isMain);

  for (const warMachineName of rarityUpgrades) {
    const warMachine = currentWarMachines.find(wm => wm.name === warMachineName);

    if (!warMachine?.level) {
      continue;
    }

    const currentRarityLevel = warMachineRarityData[warMachine.rarity].rarityLevel;
    const nexRarity = warMachineRarityLevelsToName[currentRarityLevel + 1];
    const requiredLevel = warMachineRarityData[nexRarity].availableLevel;

    if (requiredLevel && nexRarity) {
      if (warMachine.level < requiredLevel) {
        warMachine.level = requiredLevel;
      }

      warMachine.rarity = nexRarity;
    }
  }

  let stars = 0;
  let upgradeWarMachineIndex = 0;

  const canBeatTargetStar = () => {
    return stars >= targetStar.starLevel;
  }

  while (!canBeatTargetStar()) {
    if (options?.signal?.aborted) {
      console.log('aborted');
      break;
    }

    const computedData = await invokeComputeBestFormation(data, options);
    const simulationWarMachines = computedData.warMachines.slice().reverse().map(wm => ({
      ...wm,
      maxHealth: wm.health,
      abilityActivationChance: warMachineRarityData[wm.rarity].abilityActivationChance,
    }));
    const summary = simulateCampaignSummary({
      warMachines: simulationWarMachines,
      totalPower: computedData.campaignPower,
    });

    const getDetails = (mission: MissionSummary): MissionResult => ({
      ...mission,
      successChance: mission.status === 'win' ? 100 : 0,
      totalBattleCount: 1,
      currentBattleCount: 1,
    });

    const campaignResult: DetailedCampaignResult = {
      easy: summary.easy.map(getDetails),
      normal: summary.normal.map(getDetails),
      hard: summary.hard.map(getDetails),
      insane: summary.insane.map(getDetails),
      nightmare: summary.nightmare.map(getDetails),
    };

    let missions = Object
      .values(campaignResult)
      .flat()
      .filter(mission => (
        mission.status === 'win' ||
        mission.status === 'can-win'
      ));
    missions = sort(missions, mission => mission.successChance, true).slice(0, targetStar.starLevel);
    stars = missions.length;

    if (canBeatTargetStar()) {
      const handleChange = (data: MissionResult) => {
        if (options?.signal?.aborted) {
          console.log('simulation aborted');
        }

        const missions = summary[data.mission.difficulty];
        const missionIndex = missions?.findIndex(m => m.mission.level === data.mission.level);

        if (missionIndex !== undefined) {
          campaignResult[data.mission.difficulty][missionIndex] = data;
        }
      }

      try {
        await simulateDetailedCampaign(summary, simulationWarMachines, {
          ...options,
          onChange: handleChange,
          totalSimulations,
        });
      } catch (error) {
        console.error('campaign simulation error:', error)
      }

      let missions = Object
        .values(campaignResult)
        .flat()
        .filter(mission => (
          mission.successChance >= targetStar.minimumSuccessChance &&
          (
            mission.status === 'win' ||
            mission.status === 'can-win'
          )
        ));
      missions = sort(missions, mission => mission.successChance, true).slice(0, targetStar.starLevel);
      stars = missions.length;
      const hardestMission = min(missions, mission => mission.successChance);

      if (hardestMission && successChance > hardestMission.successChance) {
        successChance = hardestMission.successChance;
        needsAbilities = hardestMission.status === 'can-win';
      }

      if (canBeatTargetStar()) {
        break;
      }
    }

    if (upgradeWarMachineIndex >= team.length) {
      upgradeWarMachineIndex = 0;
    }

    const upgradeWarMachine = data.warMachines[team[upgradeWarMachineIndex++]];
    //const warMachineMetadata = warMachinesMetadata[upgradeWarMachine.name];
    const baseData = warMachineBaseData.get(upgradeWarMachine.name);

    if (!baseData) {
      continue;
    }

    const currentRarityLevel = warMachineRarityData[upgradeWarMachine.rarity].rarityLevel;
    const nexRarity = warMachineRarityLevelsToName[currentRarityLevel + 1];

    if (nexRarity && upgradeWarMachine.level) {
      const requiredLevel = warMachineRarityData[nexRarity].availableLevel;

      if (upgradeWarMachine.level >= requiredLevel) {
        upgradeWarMachine.rarity = nexRarity;
        continue;
      }
    }

    upgradeWarMachine.level ??= 0;
    upgradeWarMachine.level++;

    if (baseData.specialization === 'damage') {
      upgradeWarMachine.damageBlueprintLevel = Math.floor(upgradeWarMachine.level / 5) * 5 + 5;
    }

    if (baseData.specialization === 'tank') {
      upgradeWarMachine.damageBlueprintLevel = Math.floor(upgradeWarMachine.level / 5) * 5 + 5;
      upgradeWarMachine.healthBlueprintLevel = Math.floor(upgradeWarMachine.level / 5) * 5 + 5;
      upgradeWarMachine.armorBlueprintLevel = Math.floor(upgradeWarMachine.level / 5) * 5 + 5;
    }

    // TODO do it up to a certain point where it's impossible to keep up upgrading the armor
    //upgradeWarMachine.armorBlueprintLevel = Math.floor(upgradeWarMachine.level / 5) * 5 + 5;
  }

  return {
    ...data,
    successChance,
    needsAbilities,
  };
}

export interface TargetStar {
  starLevel: number;
  /**
   * percent from 0 to 100
   */
  minimumSuccessChance: number;
}

export interface FindTargetStarFormationOptions {
  signal?: AbortSignal;
  //onChange?: (data: Partial<Record<Difficulty, CampaignDifficultySimulationResult>>) => void;
}
