'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { type PartialDeep } from 'type-fest';

import { type db } from '@zougui/firestone.db';

import { useTRPC } from '~/trpc/react';

import { type useBotConfig } from './useBotConfig';

type Config = Omit<typeof db.config.schema, '_id'> & { _id: string; };

export const useUpdateBotConfig = (config: ReturnType<typeof useBotConfig>) => {
  const trpc = useTRPC();
  const queryClient = useQueryClient();

  const updateConfigMutation = useMutation(trpc.bot.updatePartial.mutationOptions({
    onSuccess: async () => {
      await queryClient.invalidateQueries(trpc.bot.findConfig.pathFilter());
    }
  }));
  const updateConfig = (data: Omit<PartialDeep<Config>, '_id'>) => {
    const serverConfig = config.serverData;

    if (!serverConfig) {
      return;
    }

    config.setOptimisticData(prevConfig => {
      const conf = prevConfig ?? serverConfig;

      return {
        ...conf,
        ...data,
        features: {
          alchemyExperiment: {
            ...serverConfig.features.alchemyExperiment,
            ...data.features?.alchemyExperiment,
          },
          campaignLoot: {
            ...serverConfig.features.campaignLoot,
            ...data.features?.campaignLoot,
          },
          campaignMission: {
            ...serverConfig.features.campaignMission,
            ...data.features?.campaignMission,
          },
          engineerTools: {
            ...serverConfig.features.engineerTools,
            ...data.features?.engineerTools,
          },
          firestoneResearch: {
            ...serverConfig.features.firestoneResearch,
            ...data.features?.firestoneResearch,
          },
          guardianTraining: {
            ...serverConfig.features.guardianTraining,
            ...data.features?.guardianTraining,
          },
          guildExpedition: {
            ...serverConfig.features.guildExpedition,
            ...data.features?.guildExpedition,
          },
          mapMission: {
            ...serverConfig.features.mapMission,
            ...data.features?.mapMission,
          },
          oracleRitual: {
            ...serverConfig.features.oracleRitual,
            ...data.features?.oracleRitual,
          },
          pickaxesClaiming: {
            ...serverConfig.features.pickaxesClaiming,
            ...data.features?.pickaxesClaiming,
          },
        },
      };
    });

    updateConfigMutation.mutate({
      _id: serverConfig._id,
      data,
    });
  }

  return updateConfig;
}
