import { getDamageDealt } from './getDamageDealt';
import { applyAbility } from './applyAbility';
import type { SimulationWarMachine } from './types';

export const attackWarMachine = (attacker: SimulationWarMachine, target: SimulationWarMachine, options: AttackWarMachineOptions) => {
  const damage = getDamageDealt(attacker.damage, target.armor);
  const extraDamage = applyAbility(attacker, target, options);

  return { damage, extraDamage };
}

export interface AttackWarMachineOptions {
  playerWarMachines: SimulationWarMachine[];
  enemyWarMachines: SimulationWarMachine[];
  abilityActivationChance?: number;
}
