import { type ArtifactType, type CrewHero, type WarMachine } from './schemas';

export const defaultWarMachines: Record<string, WarMachine> = {
  cloudfist: {
    name: 'cloudfist',
    rarity: 'common',
  },
  earthshatterer: {
    name:'earthshatterer',
    rarity: 'common',
  },
  sentinel: {
    name:'sentinel',
    rarity: 'common',
  },
  judgement: {
    name:'judgement',
    rarity: 'common',
  },
  talos: {
    name:'talos',
    rarity: 'common',
  },
  hunter: {
    name:'hunter',
    rarity: 'common',
  },
  fortress: {
    name:'fortress',
    rarity: 'common',
  },
  goliath: {
    name:'goliath',
    rarity: 'common',
  },
  thunderclap: {
    name:'thunderclap',
    rarity: 'common',
  },
  firecracker: {
    name:'firecracker',
    rarity: 'common',
  },
  aegis: {
    name:'aegis',
    rarity: 'common',
  },
  curator: {
    name:'curator',
    rarity: 'common',
  },
  harvester: {
    name:'harvester',
    rarity: 'common',
  },
};

export const defaultHeroes: Record<string, CrewHero> = {
  talia: { name: 'talia' },
  burt: { name: 'burt' },
  solaine: { name: 'solaine' },
  boris: { name: 'boris' },
  benedictus: { name: 'benedictus' },
  leo: { name: 'leo' },
  muriel: { name: 'muriel' },
  blaze: { name: 'blaze' },
  luana: { name: 'luana' },
  valerius: { name: 'valerius' },
  astrid: { name: 'astrid' },
  ina: { name: 'ina' },
  fini: { name: 'fini' },
  asmondai: { name: 'asmondai' },
  danysa: { name: 'danysa' },
  iseris: { name: 'iseris' },
  belien: { name: 'belien' },
  sely: { name: 'sely' },
  randal: { name: 'randal' },
  molly: { name: 'molly' },
  layla: { name: 'layla' },
  joe: { name: 'joe' },
  hongyu: { name: 'hongyu' },
  amun: { name: 'amun' },
  panko: { name: 'panko' },
  yavo: { name: 'yavo' },
  cirilo: { name: 'cirilo' },
  vilon: { name: 'vilon' },
  anzo: { name: 'anzo' },
  zelea: { name: 'zelea' },
  zoruk: { name: 'zoruk' },
  rickie: { name: 'rickie' },
  jess: { name: 'jess' },
  ledra: { name: 'ledra' },
  yamanoth: { name: 'yamanoth' },
  kramatak: { name: 'kramatak' },
};

export const defaultArtifactTypes: Record<string, ArtifactType> = {
  damage: {
    name: 'damage',
    percents: {},
  },
  health: {
    name: 'health',
    percents: {},
  },
  armor: {
    name: 'armor',
    percents: {},
  },
};

export const defaultGameData = {
  warMachines: defaultWarMachines,
  crewHeroes: defaultHeroes,
  artifactTypes: defaultArtifactTypes,
};
