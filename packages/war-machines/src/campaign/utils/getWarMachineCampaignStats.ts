import { isNumber, sum } from 'radash';

import { warMachineBaseData, warMachineRarityData } from '../../data';
import type { ArtifactType, CrewHero, WarMachineInput } from '../../types';

export const getWarMachineCampaignStats = (warMachine: WarMachineInput, crew: CrewHero[], data: GetWarMachineCampaignStatsData) => {
  const levelBonus = Math.pow(1.05, (warMachine.level ?? 1) - 1) - 1;
  const engineerBonus = Math.pow(1.05, data.engineerLevel - 1) - 1;

  const rarityLevel = warMachineRarityData[warMachine.rarity].rarityLevel;
  const allRarityLevels = sum(Object.values(data.warMachines), warMachine => warMachineRarityData[warMachine.rarity].rarityLevel);

  const rarityBonus = Math.pow(1.05, rarityLevel + allRarityLevels) - 1;
  const sacredCardBonus = Math.pow(1.05, warMachine.sacredCardLevel ?? 0);

  const blueprintDamageBonus = Math.pow(1.05, warMachine.damageBlueprintLevel ?? 0) - 1;
  const blueprintHealthBonus = Math.pow(1.05, warMachine.healthBlueprintLevel ?? 0) - 1;
  const blueprintArmorBonus = Math.pow(1.05, warMachine.armorBlueprintLevel ?? 0) - 1;

  const baseData = warMachineBaseData.get(warMachine.name) ?? {
    damage: 0,
    health: 0,
    armor: 0,
  };

  let damageArtifactBonus = 1;
  let healthArtifactBonus = 1;
  let armorArtifactBonus = 1;

  for (const [dirtyPercentage, count] of Object.entries(data.artifactTypes.damage?.percents ?? {})) {
    const percentage = Number(dirtyPercentage);

    if (isNumber(percentage) && isNumber(count) && count) {
      damageArtifactBonus *= Math.pow(1 + percentage / 100, count);
    }
  }
  for (const [dirtyPercentage, count] of Object.entries(data.artifactTypes.health?.percents ?? {})) {
    const percentage = Number(dirtyPercentage);

    if (isNumber(percentage) && isNumber(count) && count) {
      healthArtifactBonus *= Math.pow(1 + percentage / 100, count);
    }
  }
  for (const [dirtyPercentage, count] of Object.entries(data.artifactTypes.armor?.percents ?? {})) {
    const percentage = Number(dirtyPercentage);

    if (isNumber(percentage) && isNumber(count) && count) {
      armorArtifactBonus *= Math.pow(1 + percentage / 100, count);
    }
  }

  damageArtifactBonus--;
  healthArtifactBonus--;
  armorArtifactBonus--;

  const getBaseDamage = (): number => {
    return baseData.damage * (levelBonus + 1) * (engineerBonus + 1) * (rarityBonus + 1) * (blueprintDamageBonus + 1) * sacredCardBonus * (damageArtifactBonus + 1);
  }

  const getBaseHealth = (): number => {
    return baseData.health * (levelBonus + 1) * (engineerBonus + 1) * (rarityBonus + 1) * (blueprintHealthBonus + 1) * sacredCardBonus * (healthArtifactBonus + 1);
  }

  const getBaseArmor = (): number => {
    return baseData.armor * (levelBonus + 1) * (engineerBonus + 1) * (rarityBonus + 1) * (blueprintArmorBonus + 1) * sacredCardBonus * (armorArtifactBonus + 1);
  }

  const getDamage = (): number => {
    const crewBonus = sum(crew, hero => (hero.attributeDamage ?? 0) / 100);
    return Math.floor(getBaseDamage() * (crewBonus + 1));
  }

  const getHealth = (): number => {
    const crewBonus = sum(crew, hero => (hero.attributeHealth ?? 0) / 100);
    return Math.floor(getBaseHealth() * (crewBonus + 1));
  }

  const getArmor = (): number => {
    const crewBonus = sum(crew, hero => (hero.attributeArmor ?? 0) / 100);
    return Math.floor(getBaseArmor() * (crewBonus + 1));
  }

  const damage = getDamage();
  const health = getHealth();
  const armor = getArmor();

  const damagePower = Math.pow(damage * 10, 0.7);
  const healthPower = Math.pow(health, 0.7);
  const armorPower = Math.pow(armor * 10, 0.7);

  const power = Math.floor(damagePower + healthPower + armorPower);
  return {
    damage,
    health,
    armor,
    power,
  };
}

export interface GetWarMachineCampaignStatsData {
  warMachines: Record<string, WarMachineInput>;
  artifactTypes: Record<string, ArtifactType>;
  engineerLevel: number;
}
