import type { CampaignDifficulty } from '@zougui/firestone.types';

import { getEnemySquad } from './utils/getEnemySquad';
import { getRequiredPower } from './utils/getRequiredPower';
import { simulateCampaignBattle } from './simulateCampaignBattle';
import { maxCampaignMissions } from './data';
import type { Mission, Squad } from './types';

const statusBreaks: MissionSummary['status'][] = ['underreq', 'lose'];

const getMissionSummary = (squad: Squad, mission: Mission): MissionSummary => {
  const enemySquad = getEnemySquad(mission);
  const requiredPower = getRequiredPower(mission, enemySquad);

  if (requiredPower > squad.totalPower) {
    return {
      status: 'underreq',
      mission,
      rounds: 0,
      requiredPower,
    };
  }

  const worstBattleResult = simulateCampaignBattle({
    playerWarMachines: structuredClone(squad.warMachines),
    enemyWarMachines: structuredClone(enemySquad.warMachines),
    abilityActivationChance: 0,
  });

  if (worstBattleResult.status === 'win') {
    return {
      ...worstBattleResult,
      mission,
      requiredPower,
    };
  }

  const perfectBattleResult = simulateCampaignBattle({
    playerWarMachines: structuredClone(squad.warMachines),
    enemyWarMachines: structuredClone(enemySquad.warMachines),
    abilityActivationChance: 100,
  });

  return {
    ...worstBattleResult,
    status: perfectBattleResult.status === 'win' ? 'can-win' : 'lose',
    mission,
    requiredPower,
  };
}

const getDifficultySummary = (squad: Squad, difficulty: CampaignDifficulty): MissionSummary[] => {
  const missions: MissionSummary[] = [];

  for (let level = 1; level <= maxCampaignMissions; level++) {
    const summary = getMissionSummary(squad, { difficulty, level });
    missions.push(summary);

    if (statusBreaks.includes(summary.status)) {
      return missions;
    }
  }

  return missions;
}

export const simulateCampaignSummary = (squad: Squad): CampaignSummary => {
  return {
    easy: getDifficultySummary(squad, 'easy'),
    normal: getDifficultySummary(squad, 'normal'),
    hard: getDifficultySummary(squad, 'hard'),
    insane: getDifficultySummary(squad, 'insane'),
    nightmare: getDifficultySummary(squad, 'nightmare'),
  };
}

export interface MissionSummary {
  status: 'underreq' | 'win' | 'can-win' | 'lose';
  mission: Mission;
  rounds: number;
  requiredPower: number;
}

export type CampaignSummary = Record<CampaignDifficulty, MissionSummary[]>;
