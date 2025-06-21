import type { CampaignDifficulty } from '@zougui/firestone.types';

import type { SimulationWarMachine } from '../types';

export interface Mission {
  level: number;
  difficulty: CampaignDifficulty;
}

export interface Squad {
  warMachines: SimulationWarMachine[];
  totalPower: number;
}
