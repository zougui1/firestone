import { useSelector } from "@xstate/store/react";
import { useQuery, useSuspenseQuery } from "@tanstack/react-query";

import { useTRPC } from "~/utils/trpc";

import { gameDataStore } from "../gameData";
import { targetCampaignStore } from "../targetCampaignStore";
import { findTargetStarFormation, getHeroJewelEffects } from "../utils";
import { settingsStore } from "../settingsStore";
import {
  artifactTypeBaseData,
  type ArtifactRarity,
} from "@zougui/firestone.war-machines";

export const useTargetCampaignFormation = () => {
  const trpc = useTRPC();

  const { data: heroes } = useSuspenseQuery(trpc.hero.findAll.queryOptions());
  const { data: warMachines } = useSuspenseQuery(
    trpc.warMachine.findAll.queryOptions(),
  );
  const { data: artifacts } = useSuspenseQuery(
    trpc.artifact.findAll.queryOptions(),
  );

  const targetStarLevel = useSelector(
    targetCampaignStore,
    (state) => state.context.starLevel,
  );
  const minimumSuccessChance = useSelector(
    targetCampaignStore,
    (state) => state.context.minimumSuccessChance,
  );
  const ignoreRequirements = useSelector(
    settingsStore,
    (state) => state.context.ignoreRequirements,
  );

  return useQuery({
    queryKey: [
      "findTargetStarFormation",
      { warMachines, heroes, artifacts },
      targetStarLevel,
      minimumSuccessChance,
      ignoreRequirements,
    ],
    queryFn: async ({ signal }) => {
      try {
        const result = await findTargetStarFormation(
          {
            warMachines: Object.fromEntries(
              warMachines.map((wm) => [wm.name, wm]),
            ),
            artifactTypes: Object.fromEntries(
              artifacts.map((a) => [
                a.attribute,
                {
                  name: a.attribute,
                  percents: Object.fromEntries(
                    Object.entries(a.items).map(([rarity, count]) => [
                      artifactTypeBaseData.toPercent[rarity as ArtifactRarity],
                      count,
                    ]),
                  ),
                },
              ]),
            ),
            crewHeroes: Object.fromEntries(
              heroes.map((hero) => {
                const attributes = getHeroJewelEffects(hero);

                return [
                  hero.name,
                  {
                    name: hero.name,
                    attributeDamage: attributes.damage,
                    attributeHealth: attributes.health,
                    attributeArmor: attributes.armor,
                  },
                ];
              }),
            ),
          },
          { starLevel: targetStarLevel, minimumSuccessChance },
          { signal, ignoreRequirements },
        );

        targetCampaignStore.trigger.changeTargetFormation({
          warMachines: result.warMachines,
        });

        return result;
      } catch (error) {
        console.error("target campaign error:", error);
        throw error;
      }
    },
    refetchOnWindowFocus: false,
    retry: false,
  });
};
