const jewelList = [
  "ankh",
  "rune",
  "idol",
  "talisman",
  "necklace",
  "trinket",
] as const;

export type JewelName = (typeof jewelList)[number];

export const jewelBaseData = {
  list: jewelList,

  toTier: {
    ankh: 1,
    rune: 1,
    idol: 1,
    talisman: 2,
    necklace: 2,
    trinket: 2,
  } satisfies Record<JewelName, number>,
};
