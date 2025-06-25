import { getEnemySquad } from './utils/getEnemySquad';
import { simulateCampaignBattle } from './simulateCampaignBattle';
import type { Mission } from './types';
import type { SimulationWarMachine } from '../types';

export const simulateCampaignMission = (options: SimulateCampaignMissionOptions) => {
  const enemySquad = getEnemySquad(options.mission);
  return simulateCampaignBattle({
    ...options,
    enemyWarMachines: enemySquad.warMachines,
  });
}

export interface SimulateCampaignMissionOptions {
  mission: Mission;
  playerWarMachines: SimulationWarMachine[];
}
