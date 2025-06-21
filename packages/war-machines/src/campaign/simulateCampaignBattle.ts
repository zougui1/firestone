import { attackWarMachine } from '../attackWarMachine';
import { getDamageDealt } from '../getDamageDealt';
import type { SimulationWarMachine } from '../types';

export const simulateCampaignBattle = (options: SimulateCampaignBattleOptions): CampaignBattleResult => {
  const { playerWarMachines, enemyWarMachines } = options;

  let currentEnemyTargetIndex = 0;
  let currentPlayerTargetIndex = 0;
  let rounds = 0;
  const totalPlayWarMachines = playerWarMachines.length;

  for (let round = 1; round <= 20; round++) {
    for (const playerWarMachine of playerWarMachines) {
      if (playerWarMachine.health <= 0) {
        continue;
      }

      const enemyWarMachine = enemyWarMachines[currentEnemyTargetIndex];

      if (!enemyWarMachine) {
        continue;
      }

      const attackResult = attackWarMachine(playerWarMachine, enemyWarMachine, options);
      enemyWarMachine.health -= attackResult.damage + attackResult.extraDamage;

      if (enemyWarMachine.health <= 0) {
        currentEnemyTargetIndex++;
      }

      if (currentEnemyTargetIndex > 4) {
        return { status: 'win', rounds };
      }
    }

    for (const enemyWarMachine of enemyWarMachines) {
      if (enemyWarMachine.health <= 0) {
        continue;
      }

      const playerWarMachine = playerWarMachines[currentPlayerTargetIndex];

      if (!playerWarMachine) {
        continue;
      }

      playerWarMachine.health -= getDamageDealt(enemyWarMachine.damage, playerWarMachine.armor);

      if (playerWarMachine.health <= 0) {
        currentPlayerTargetIndex++;
      }

      if (currentPlayerTargetIndex > (totalPlayWarMachines - 1)) {
        return { status: 'lose', rounds };
      }
    }

    rounds = round;
  }

  return { status: 'lose', rounds };
}

export interface SimulateCampaignBattleOptions {
  playerWarMachines: SimulationWarMachine[];
  enemyWarMachines: SimulationWarMachine[];
  abilityActivationChance?: number;
}

export interface CampaignBattleResult {
  status: 'win' | 'lose';
  rounds: number;
}
