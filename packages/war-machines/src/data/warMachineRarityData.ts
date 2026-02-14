const rarityList = [
  "common",
  "uncommon",
  "rare",
  "epic",
  "legendary",
  "mythic",
  "titan",
  "angel",
] as const;

export type WarMachineRarity = (typeof rarityList)[number];

export const warMachineRarityData = {
  list: rarityList,

  toLevel: {
    common: 0,
    uncommon: 1,
    rare: 2,
    epic: 3,
    legendary: 4,
    mythic: 5,
    titan: 6,
    angel: 7,
  } satisfies Record<WarMachineRarity, number>,

  fromLevel: {
    0: "common",
    1: "uncommon",
    2: "rare",
    3: "epic",
    4: "legendary",
    5: "mythic",
    6: "titan",
    7: "angel",
  } as Record<number, WarMachineRarity>,

  abilityActivationChance: {
    common: 25,
    uncommon: 28,
    rare: 31,
    epic: 34,
    legendary: 37,
    mythic: 40,
    titan: 43,
    angel: 46,
  } satisfies Record<WarMachineRarity, number>,

  unlockLevel: {
    common: 1,
    uncommon: 10,
    rare: 50,
    epic: 100,
    legendary: 150,
    mythic: 230,
    titan: 300,
    angel: 400,
  } satisfies Record<WarMachineRarity, number>,
};
