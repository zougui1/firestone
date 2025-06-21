/* eslint-disable @typescript-eslint/no-non-null-assertion */

import { randomInt } from './utils';
import { getDamageDealt } from './getDamageDealt';
import { healWarMachine } from './healWarMachine';
import type { WarMachineName } from './data';
import type { SimulationWarMachine } from './types';

const getRandomTargets = (warMachines: SimulationWarMachine[], targetCount: number) => {
  const aliveWarMachines = warMachines.filter(wm => wm.health > 0);
  const selectedTargets: SimulationWarMachine[] = [];

  if (targetCount >= aliveWarMachines.length) {
    return aliveWarMachines;
  }

  // Shuffle method: Swap selected elements to the end and reduce search space
  for (let i = 0; i < targetCount; i++) {
    const randIndex = i + Math.floor(Math.random() * (aliveWarMachines.length - i));
    [aliveWarMachines[i], aliveWarMachines[randIndex]] = [aliveWarMachines[randIndex]!, aliveWarMachines[i]!];
    selectedTargets.push(aliveWarMachines[i]!);
  }

  return selectedTargets;
}

export const applyAbility = (attacker: SimulationWarMachine, target: SimulationWarMachine, options: ApplyAbilityOptions) => {
  const { playerWarMachines, enemyWarMachines, abilityActivationChance = -1 } = options;
  const activationThreshold = randomInt(1, 100);
  const activationChance = abilityActivationChance < 0
    ? attacker.abilityActivationChance
    : abilityActivationChance;

  if (activationThreshold > activationChance) {
    return 0;
  }

  const handlers = {
    cloudfist: () => getDamageDealt(attacker.damage * 2, target.armor),
    talos: () => getDamageDealt(attacker.damage * 2, target.armor),
    aegis: () => getDamageDealt(attacker.damage * 1.6, target.armor),
    firecracker: () => getDamageDealt(attacker.damage * 1.5, target.armor),
    goliath: () => {
      healWarMachine(attacker, attacker.maxHealth * 0.1);
    },
    earthshatterer: () => {
      for (const enemy of enemyWarMachines) {
        enemy.health -= getDamageDealt(attacker.damage * 0.8, enemy.armor);
      }
    },
    judgement: () => {
      for (const enemy of enemyWarMachines) {
        enemy.health -= getDamageDealt(attacker.damage * 0.6, enemy.armor);
      }
    },
    fortress: () => {
      const targets = getRandomTargets(enemyWarMachines, 2);

      for (const target of targets) {
        target.health -= getDamageDealt(attacker.damage * 0.6, target.armor);
      }
    },
    sentinel: () => {
      for (const warMachine of playerWarMachines) {
        if (warMachine.health > 0) {
          healWarMachine(warMachine, attacker.damage * 0.6);
        }
      }
    },
    hunter: () => {
      const targets = getRandomTargets(playerWarMachines, 2);

      for (const target of targets) {
        if (target.health > 0) {
          healWarMachine(target, attacker.damage * 1.5);
        }
      }
    },
    thunderclap: () => {
      const targets = getRandomTargets(enemyWarMachines, 3);

      for (const target of targets) {
        target.health -= getDamageDealt(attacker.damage * 1.2, target.armor);
      }
    },
    harvester: () => {
      const aliveEnemies = enemyWarMachines.filter(wm => wm.health > 0);

      for (const enemy of aliveEnemies.reverse().slice(0, 2)) {
        enemy.health -= getDamageDealt(attacker.damage * 1.3, enemy.armor);
      }
    },
    curator: () => {
      let lowestHealth: number | undefined;
      let lowestHealthWarMachine: SimulationWarMachine | undefined;

      for (const warMachine of playerWarMachines) {
        if (warMachine.health > 0) {
          if (lowestHealth === undefined || lowestHealth > ((warMachine.maxHealth - warMachine.health) / warMachine.maxHealth)) {
            lowestHealthWarMachine = warMachine;
            lowestHealth = (warMachine.maxHealth - warMachine.health) / warMachine.maxHealth;
          }
        }
      }

      if (lowestHealthWarMachine) {
        healWarMachine(lowestHealthWarMachine, attacker.damage * 3);
      }
    },
  } satisfies Record<WarMachineName, () => (number | void)>;
  // handlers give an error when trying to access it with `attacker.name`
  // despite checking if the property exists
  const abilities = handlers as Record<string, () => (number | void)>;

  if (!(attacker.name in abilities)) {
    return 0;
  }

  return abilities[attacker.name]?.() ?? 0;
}

export interface ApplyAbilityOptions {
  playerWarMachines: SimulationWarMachine[];
  enemyWarMachines: SimulationWarMachine[];
  abilityActivationChance?: number;
}
