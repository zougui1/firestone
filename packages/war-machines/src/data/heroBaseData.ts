export const heroBaseData = {
  talia: {
    name: "talia",
    specialization: "damage",
  },
  burt: {
    name: "burt",
    specialization: "damage",
  },
  solaine: {
    name: "solaine",
    specialization: "damage",
  },
  boris: {
    name: "boris",
    specialization: "tank",
  },
  benedictus: {
    name: "benedictus",
    specialization: "healer",
  },
  leo: {
    name: "leo",
    specialization: "tank",
  },
  muriel: {
    name: "muriel",
    specialization: "damage",
  },
  blaze: {
    name: "blaze",
    specialization: "damage",
  },
  luana: {
    name: "luana",
    specialization: "healer",
  },
  valerius: {
    name: "valerius",
    specialization: "tank",
  },
  astrid: {
    name: "astrid",
    specialization: "damage",
  },
  ina: {
    name: "ina",
    specialization: "damage",
  },
  fini: {
    name: "fini",
    specialization: "damage",
  },
  asmondai: {
    name: "asmondai",
    specialization: "tank",
  },
  danysa: {
    name: "danysa",
    specialization: "tank",
  },
  iseris: {
    name: "iseris",
    specialization: "damage",
  },
  belien: {
    name: "belien",
    specialization: "healer",
  },
  sely: {
    name: "sely",
    specialization: "damage",
  },
  randal: {
    name: "randal",
    specialization: "tank",
  },
  molly: {
    name: "molly",
    specialization: "damage",
  },
  layla: {
    name: "layla",
    specialization: "healer",
  },
  joe: {
    name: "joe",
    specialization: "damage",
  },
  hongyu: {
    name: "hongyu",
    specialization: "damage",
  },
  amun: {
    name: "amun",
    specialization: "damage",
  },
  panko: {
    name: "panko",
    specialization: "tank",
  },
  yavo: {
    name: "yavo",
    specialization: "healer",
  },
  cirilo: {
    name: "cirilo",
    specialization: "damage",
  },
  vilon: {
    name: "vilon",
    specialization: "damage",
  },
  anzo: {
    name: "anzo",
    specialization: "tank",
  },
  zelea: {
    name: "zelea",
    specialization: "damage",
  },
  zoruk: {
    name: "zoruk",
    specialization: "healer",
  },
  rickie: {
    name: "rickie",
    specialization: "damage",
  },
  jess: {
    name: "jess",
    specialization: "damage",
  },
  ledra: {
    name: "ledra",
    specialization: "healer",
  },
  yamanoth: {
    name: "yamanoth",
    specialization: "tank",
  },
  kramatak: {
    name: "kramatak",
    specialization: "damage",
  },
} as const;

export type HeroName = keyof typeof heroBaseData;
export const heroNameList = Object.keys(heroBaseData) as [
  HeroName,
  ...HeroName[],
];
