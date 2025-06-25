import type { WarMachineRarity } from './WarMachineRarity';

export interface WarMachineInput {
  name: string;
  level?: number;
  sacredCardLevel?: number;
  damageBlueprintLevel?: number;
  healthBlueprintLevel?: number;
  armorBlueprintLevel?: number;
  rarity: WarMachineRarity;
}
