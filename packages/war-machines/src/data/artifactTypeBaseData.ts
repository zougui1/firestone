const artifactRarityList = [
  "epic",
  "legendary",
  "mythic",
  "titan",
  "angel",
  "celestial",
  "immortal",
  "primordial",
] as const;

export type ArtifactRarity = (typeof artifactRarityList)[number];

export const artifactTypeBaseData = {
  list: artifactRarityList,

  toPercent: {
    epic: 30,
    legendary: 35,
    mythic: 40,
    titan: 45,
    angel: 50,
    celestial: 55,
    immortal: 60,
    primordial: 65,
  } satisfies Record<ArtifactRarity, number>,
} as const;
