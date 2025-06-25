import { useQuery } from '@tanstack/react-query';

import { warMachineRarityData, type SimulationWarMachine } from '@zougui/firestone.war-machines';
import {
  simulateCampaignSummary,
  type CampaignSummary,
  type DetailedCampaignResult,
  type MissionResult,
  type MissionSummary,
  type SimulateDetailedMissionOptions,
} from '@zougui/firestone.war-machines/campaign';
import { type CampaignDifficulty } from '@zougui/firestone.types';

import { useBestCampaignFormation } from './useBestCampaignFormation';
import { invokeSimulateDetailedMission } from '../invokers';

export const simulateDetailedCampaign = async (
  data: CampaignSummary,
  playerWarMachines: SimulationWarMachine[],
  options?: SimulateDetailedMissionOptions,
) => {
  await Promise.all((Object.keys(data) as CampaignDifficulty[]).map(async difficulty => {
    const difficultyData = data[difficulty];

    if (!difficultyData) {
      return;
    }

    await Promise.all(Object.values(difficultyData).map(async summary => {
      if (summary.status !== 'can-win') {
        return;
      }

      await invokeSimulateDetailedMission(summary, playerWarMachines, options);
    }));
  }));
}

export const useCampaignSimulation = (options?: UseCampaignSimulationOptions) => {
  const { data } = useBestCampaignFormation();

  return useQuery({
    queryKey: ['simulateCampaign', data],
    queryFn: async ({ signal }) => {
      if (!data) {
        return null;
      }

      const warMachines = data.warMachines.slice().reverse().map(wm => ({
        ...wm,
        maxHealth: wm.health,
        abilityActivationChance: warMachineRarityData[wm.rarity].abilityActivationChance,
      }));

      const summary = simulateCampaignSummary({
        warMachines,
        totalPower: data.campaignPower
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

      const handleChange = (data: MissionResult) => {
        if (signal.aborted) {
          console.log('simulation aborted');
        }

        const missions = summary[data.mission.difficulty];
        const missionIndex = missions.findIndex(m => m.mission.level === data.mission.level);

        if (missionIndex !== undefined) {
          campaignResult[data.mission.difficulty][missionIndex] = data;
          options?.onChange?.(structuredClone(campaignResult));
        }
      }

      try {
        await simulateDetailedCampaign(summary, warMachines, {
          ...options,
          onChange: handleChange,
          signal,
        });
      } catch (error) {
        console.error('campaign simulation error:', error)
        throw error;
      }

      return campaignResult;
    },
    refetchOnWindowFocus: false,
  });
}

export interface UseCampaignSimulationOptions {
  onChange?: (data: DetailedCampaignResult) => void;
}
