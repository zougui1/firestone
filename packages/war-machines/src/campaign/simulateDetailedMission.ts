import { ok, err, type Result } from 'neverthrow';

import { TaggedError } from '@zougui/firestone.error';

import { defaultTotalSimulations } from './data';
import { getEnemySquad } from './getEnemySquad';
import { simulateCampaignBattle, type CampaignBattleResult } from './simulateCampaignBattle';
import type { MissionSummary } from './simulateCampaignSummary';

class AbortError extends TaggedError('AbortError')<{ reason: unknown; }> {

}

export const simulateDetailedMission = (
  summary: MissionSummary,
  options: SimulateDetailedMissionOptions = {},
): Result<MissionResult, AbortError> => {
  const { onChange, signal, totalSimulations = defaultTotalSimulations } = options;

  const enemySquad = getEnemySquad(summary.mission);
  const battles: CampaignBattleResult[] = [];

  const getResult = () => {
    const wins = battles.filter(battle => battle.status === 'win');
    const successChance = (wins.length / battles.length) * 100;

    return {
      ...summary,
      successChance,
      totalBattleCount: totalSimulations,
      currentBattleCount: battles.length,
    };
  }

  for (let index = 0; index < totalSimulations; index++) {
    if (signal?.aborted) {
      return err(new AbortError({ reason: signal.reason }));
    }

    battles.push(simulateCampaignBattle({
      playerWarMachines: structuredClone(enemySquad.warMachines),
      enemyWarMachines: structuredClone(enemySquad.warMachines),
    }));

    if (index % 200 === 0) {
      onChange?.(getResult());
    }
  }

  const finalResult = getResult();
  onChange?.(finalResult);

  return ok(finalResult);
}

export interface SimulateDetailedMissionOptions {
  totalSimulations?: number;
  signal?: AbortSignal;
  onChange?: (data: MissionResult) => void;
}

export interface MissionResult extends MissionSummary {
  successChance: number;
  totalBattleCount: number;
  currentBattleCount: number;
}
