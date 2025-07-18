import type * as database from './bot/database';

export const defaultConfig: database.config.ConfigType = {
  sessionId: '',
  gameVersion: '831',
  features: {
    engineerTools: {
      enabled: true,
    },
    campaignLoot: {
      enabled: true,
    },
    campaignMission: {
      enabled: true,
      battleCooldownSeconds: 5,
    },
    guardianTraining: {
      enabled: true,
      guardian: 'Vermillion',
      cooldownSeconds: 2 * 60 * 60,
    },
    firestoneResearch: {
      enabled: true,
      treeLevel: 1,
    },
    guildExpedition: {
      enabled: true,
    },
    oracleRitual: {
      enabled: true,
    },
    pickaxesClaiming: {
      enabled: true,
    },
    alchemyExperiment: {
      enabled: true,
      treeLevel: 1,
      blood: true,
      dust: false,
      exoticCoins: false,
      durationMinutes: 60,
    },
    mapMission: {
      enabled: true,
    },
  },
};
