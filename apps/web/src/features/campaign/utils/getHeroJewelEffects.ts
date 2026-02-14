"use client";

import {
  heroBaseData,
  type WarMachineRarity,
} from "@zougui/firestone.war-machines";
import type { db } from "@zougui/firestone.db";

const base = 200;

const jewelRarityEffectMap = {
  common: 200,
  uncommon: 400,
  rare: 800,
  epic: 1600,
  legendary: 3200,
  mythic: 6400,
  titan: 12800,
  angel: 25600,
} satisfies Record<WarMachineRarity, number>;

const jewelLevelEffectMap = {
  0: base,
  1: base + 150,
  2: base + 200,
  3: base + 300,
  4: base + 400,
  5: base + 600,
  6: base + 800,
  7: base + 1200,
  8: base + 1600,
  9: base + 2200,
  10: base + 3200,
  11: base + 4800,
  12: base + 6400,
  13: base + 9600,
  14: base + 12800,
  15: base + 19200,
  16: base + 25600,
};

const getLevelEffect = (level: number) => {
  if (level in jewelLevelEffectMap) {
    return jewelLevelEffectMap[level as keyof typeof jewelLevelEffectMap];
  }

  return 0;
};

const getJewelEffect = (jewel: db.Jewel | undefined) => {
  if (!jewel) return 0;

  return getLevelEffect(jewel.level) + jewelRarityEffectMap[jewel.rarity];
};

export const getHeroJewelEffects = (hero: db.Hero) => {
  const ankh = hero.jewels.find((j) => j.name === "ankh");
  const rune = hero.jewels.find((j) => j.name === "rune");
  const idol = hero.jewels.find((j) => j.name === "idol");
  const talisman = hero.jewels.find((j) => j.name === "talisman");
  const necklace = hero.jewels.find((j) => j.name === "necklace");
  const trinket = hero.jewels.find((j) => j.name === "trinket");

  const { specialization } =
    heroBaseData[hero.name as keyof typeof heroBaseData];

  const damage =
    getJewelEffect(ankh) + getJewelEffect(talisman) + getJewelEffect(necklace);
  const health =
    getJewelEffect(rune) + getJewelEffect(talisman) + getJewelEffect(trinket);
  const armor =
    getJewelEffect(idol) + getJewelEffect(necklace) + getJewelEffect(trinket);

  return {
    damage: specialization === "damage" ? damage * 1.4 : damage,
    health: specialization === "healer" ? health * 1.4 : health,
    armor: specialization === "tank" ? armor * 1.4 : armor,
  };
};
