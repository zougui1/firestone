"use client";

import { useQuery, useSuspenseQuery } from "@tanstack/react-query";

import {
  artifactTypeBaseData,
  type ArtifactRarity,
} from "@zougui/firestone.war-machines";

import { useTRPC } from "~/utils/trpc";

import { invokeComputeBestFormation } from "../invokers";
import { getHeroJewelEffects } from "../utils";

export const useBestCampaignFormation = () => {
  const trpc = useTRPC();

  const { data: heroes } = useSuspenseQuery(trpc.hero.findAll.queryOptions());
  const { data: warMachines } = useSuspenseQuery(
    trpc.warMachine.findAll.queryOptions(),
  );
  const { data: artifacts } = useSuspenseQuery(
    trpc.artifact.findAll.queryOptions(),
  );

  return useQuery({
    queryKey: ["computeBestFormation", { warMachines, heroes, artifacts }],
    queryFn: ({ signal }) => {
      return invokeComputeBestFormation(
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
        { signal },
      );
    },
    refetchOnWindowFocus: false,
  });
};
