export const heroBaseData = {
  talia: {
    name: 'talia',
  },
  burt: {
    name: 'burt',
  },
  solaine: {
    name: 'solaine',
  },
  boris: {
    name: 'boris',
  },
  benedictus: {
    name: 'benedictus',
  },
  leo: {
    name: 'leo',
  },
  muriel: {
    name: 'muriel',
  },
  blaze: {
    name: 'blaze',
  },
  luana: {
    name: 'luana',
  },
  valerius: {
    name: 'valerius',
  },
  astrid: {
    name: 'astrid',
  },
  ina: {
    name: 'ina',
  },
  fini: {
    name: 'fini',
  },
  asmondai: {
    name: 'asmondai',
  },
  danysa: {
    name: 'danysa',
  },
  iseris: {
    name: 'iseris',
  },
  belien: {
    name: 'belien',
  },
  sely: {
    name: 'sely',
  },
  randal: {
    name: 'randal',
  },
  molly: {
    name: 'molly',
  },
  layla: {
    name: 'layla',
  },
  joe: {
    name: 'joe',
  },
  hongyu: {
    name: 'hongyu',
  },
  amun: {
    name: 'amun',
  },
  panko: {
    name: 'panko',
  },
  yavo: {
    name: 'yavo',
  },
  cirilo: {
    name: 'cirilo',
  },
  vilon: {
    name: 'vilon',
  },
  anzo: {
    name: 'anzo',
  },
  zelea: {
    name: 'zelea',
  },
  zoruk: {
    name: 'zoruk',
  },
  rickie: {
    name: 'rickie',
  },
  jess: {
    name: 'jess',
  },
  ledra: {
    name: 'ledra',
  },
  yamanoth: {
    name: 'yamanoth',
  },
  kramatak: {
    name: 'kramatak',
  },
} as const;

export type HeroName = keyof typeof heroBaseData;
export const heroNameList = Object.keys(heroBaseData) as [HeroName, ...HeroName[]];
