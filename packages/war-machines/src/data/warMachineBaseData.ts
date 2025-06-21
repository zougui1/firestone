import type { Specialization } from '@zougui/firestone.types';

export const warMachineBaseData = {
  cloudfist: {
    name: 'cloudfist',
    specialization: 'damage',
    damage: 880,
    health: 6500,
    armor: 125,
  },
  fortress: {
    name: 'fortress',
    specialization: 'tank',
    health: 11000,
    damage: 460,
    armor: 300,
  },
  aegis: {
    name: 'aegis',
    specialization: 'damage',
    health: 5100,
    damage: 890,
    armor: 115,
  },
  firecracker: {
    name: 'firecracker',
    specialization: 'damage',
    health: 4900,
    damage: 910,
    armor: 110,
  },
  talos: {
    name: 'talos',
    specialization: 'damage',
    health: 6000,
    damage: 860,
    armor: 130,
  },
  harvester: {
    name: 'harvester',
    specialization: 'damage',
    health: 5500,
    damage: 960,
    armor: 125,
  },
  judgement: {
    name: 'judgement',
    specialization: 'damage',
    health: 4700,
    damage: 1080,
    armor: 90,
  },
  thunderclap: {
    name: 'thunderclap',
    specialization: 'damage',
    health: 5200,
    damage: 1050,
    armor: 100,
  },
  curator: {
    name: 'curator',
    specialization: 'healer',
    health: 4100,
    damage: 380,
    armor: 150,
  },
  hunter: {
    name: 'hunter',
    specialization: 'healer',
    health: 4900,
    damage: 400,
    armor: 130,
  },
  sentinel: {
    name: 'sentinel',
    specialization: 'healer',
    health: 4400,
    damage: 390,
    armor: 170,
  },
  earthshatterer: {
    name: 'earthshatterer',
    specialization: 'tank',
    health: 10500,
    damage: 510,
    armor: 270,
  },
  goliath: {
    name: 'goliath',
    specialization: 'tank',
    health: 12000,
    damage: 430,
    armor: 280,
  },
} satisfies Record<string, WarMachineBaseData>;

export interface WarMachineBaseData {
  name: string;
  specialization: Specialization;
  health: number;
  damage: number;
  armor: number;
}

export type WarMachineName = keyof typeof warMachineBaseData;
export const warMachineNameList = Object.keys(warMachineBaseData) as [WarMachineName, ...WarMachineName[]];
