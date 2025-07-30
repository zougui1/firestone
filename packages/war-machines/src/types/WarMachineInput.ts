import type { WarMachineRarity } from './WarMachineRarity';

export interface WarMachineInput {
  name: string;
  level?: number;
  sacredCardLevel?: number;
  lostInscriptionLevel?: number;
  damageBlueprintLevel?: number;
  healthBlueprintLevel?: number;
  armorBlueprintLevel?: number;
  rarity: WarMachineRarity;
}
