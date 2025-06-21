import { difficultyMultipliers } from './data';
import type { Mission, Squad } from './types';
import type { SimulationWarMachine } from '../types';

const getEnemyWarMachine = (multiplier = 1): SimulationWarMachine => {
  return {
    name: 'enemy',
    damage: 260 * multiplier,
    maxHealth: 1560 * multiplier,
    health: 1560 * multiplier,
    armor: 30 * multiplier,
    abilityActivationChance: 0,
  };
}

const calculateEnemyPower = (warMachine: SimulationWarMachine): number => {
  const damagePower = Math.pow(warMachine.damage * 10, 0.7);
  const healthPower = Math.pow(warMachine.health, 0.7);
  const armorPower = Math.pow(warMachine.armor * 10, 0.7);

  return Math.floor(damagePower + healthPower + armorPower);
}

export const getEnemySquad = (mission: Mission): Squad => {
  const difficultyMultiplier = difficultyMultipliers[mission.difficulty];
  const baseMultiplier = difficultyMultiplier * Math.pow(1.2, mission.level - 1);
  const powerMultiplier = Math.pow(2, Math.floor((mission.level - 1) / 10));
  const statMultiplier = Math.pow(3, Math.floor((mission.level - 1) / 10));

  let totalPower = 0;
  const enemySquad: SimulationWarMachine[] = [];

  for (let i = 0; i < 5; i++) {
    const enemyWarMachine = getEnemyWarMachine(baseMultiplier);

    enemySquad.push({
      name: enemyWarMachine.name,
      damage: enemyWarMachine.damage * statMultiplier,
      maxHealth: enemyWarMachine.maxHealth * statMultiplier,
      health: enemyWarMachine.health * statMultiplier,
      armor: enemyWarMachine.armor * statMultiplier,
      abilityActivationChance: enemyWarMachine.abilityActivationChance,
    });

    totalPower += calculateEnemyPower({
      name: enemyWarMachine.name,
      damage: enemyWarMachine.damage * powerMultiplier,
      maxHealth: enemyWarMachine.maxHealth * powerMultiplier,
      health: enemyWarMachine.health * powerMultiplier,
      armor: enemyWarMachine.armor * powerMultiplier,
      abilityActivationChance: enemyWarMachine.abilityActivationChance,
    });
  }

  return { warMachines: enemySquad, totalPower };
}
