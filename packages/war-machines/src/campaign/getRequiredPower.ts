import type { Mission, Squad } from './types';

export const getRequiredPower = (mission: Mission, enemySquad: Squad) => {
  if (mission.difficulty === 'easy' && mission.level >= 11 && mission.level <= 30) {
    return enemySquad.totalPower * 0.5;
  }

  if (mission.difficulty !== 'easy' || mission.level > 30) {
    return enemySquad.totalPower * 0.8;
  }

  return enemySquad.totalPower * 0.3;
}
