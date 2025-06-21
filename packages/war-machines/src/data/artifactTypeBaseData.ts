export const artifactTypeBaseData = {
  damage: { name: 'damage' },
  health: { name: 'health' },
  armor: { name: 'armor' },
} as const;

export type ArtifactTypeName = keyof typeof artifactTypeBaseData;
export const artifactTypeList = Object.keys(artifactTypeBaseData) as [ArtifactTypeName, ...ArtifactTypeName[]];
