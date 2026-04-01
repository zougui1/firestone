import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { sort } from "radash";
import { useEffect, useMemo, useState } from "react";

import type { db } from "@zougui/firestone.db";
import {
  heroBaseData,
  jewelBaseData,
  warMachineRarityData,
  type JewelName,
} from "@zougui/firestone.war-machines";

import { cn, Skeleton } from "~/ui";
import { ZScrollArea } from "~/ui/components/standard";
import { useTRPC } from "~/utils/trpc";

import { heroesStore } from "../heroes.store";
import { JewelInput } from "./JewelInput";

export interface HeroCardProps {
  hero: db.Hero | { name: string };
}

const HeroCard = ({ hero }: HeroCardProps) => {
  const trpc = useTRPC();
  const queryClient = useQueryClient();
  const updateHero = useMutation(
    trpc.hero.updateOne.mutationOptions({
      onSuccess: async () => {
        await queryClient.invalidateQueries(trpc.hero.pathFilter());
      },
    }),
  );

  const [tempData, setTempData] = useState<Partial<db.Hero> | undefined>();

  const handleChangeJewel =
    (
      jewelName: JewelName,
      fieldName: keyof Pick<db.Jewel, "level" | "rarity">,
    ) =>
    (value: string | number | null) => {
      setTempData((prevData) => {
        if (prevData?.jewels?.some((j) => j.name === jewelName)) {
          return {
            ...prevData,
            jewels: prevData.jewels.map((j) => {
              if (j.name !== jewelName) return j;
              return { ...j, [fieldName]: value };
            }),
          };
        }

        if ("jewels" in hero && hero.jewels.some((j) => j.name === jewelName)) {
          return {
            ...prevData,
            jewels: hero.jewels.map((j) => {
              if (j.name !== jewelName) return j;
              return { ...j, [fieldName]: value };
            }),
          };
        }

        return {
          ...prevData,
          jewels: [
            ...(prevData?.jewels ?? []),
            {
              name: jewelName,
              tier: jewelBaseData.toTier[jewelName],
              level: 0,
              rarity: "common",
              [fieldName]: value,
            },
          ],
        };
      });
    };

  const data = {
    jewels: [],
    ...hero,
    ...tempData,
  } as Required<db.Hero>;

  const jewels: Partial<Record<JewelName, db.Jewel>> = Object.fromEntries(
    data.jewels.map((j) => [j.name, j]),
  );

  const onBlur = (e: React.FocusEvent) => {
    // relatedTarget is null if an element loses focus
    // and no other elements receive it
    if (e.currentTarget.contains(e.relatedTarget) || !tempData) return;

    updateHero.mutate(data);
  };

  return (
    <div
      ref={(element) => {
        if (element)
          heroesStore.trigger.addCard({ heroName: hero.name, element });
        else heroesStore.trigger.removeCard({ heroName: hero.name });
      }}
      className={cn(
        `relative transition-colors flex flex-col rounded-sm select-none p-0.5 bg-background-light/70
        focus-within:outline-2 focus-within:outline-primary! focus-within:outline-offset-2`,
        !("jewels" in hero) && "opacity-40",
      )}
      onBlur={onBlur}
    >
      <img
        className="absolute inset-0 p-3"
        src={`/heroes/${hero.name}.webp`}
        alt={hero.name}
      />

      <p className="text-center isolate capitalize text-lg text-shadow-md text-shadow-black">
        {hero.name}
      </p>

      <div className="flex justify-between">
        <div className="flex flex-col gap-1 *:w-min">
          <JewelInput
            icon={{
              src: "/WarMachineAttackIcon.webp",
              alt: "attack",
            }}
            level={jewels.ankh?.level ?? 0}
            onLevelChange={handleChangeJewel("ankh", "level")}
            rarityLevel={
              warMachineRarityData.toLevel[jewels.ankh?.rarity ?? "common"]
            }
            onRarityLevelChange={(rarityLevel) =>
              handleChangeJewel(
                "ankh",
                "rarity",
              )(warMachineRarityData.fromLevel[rarityLevel])
            }
          />

          <JewelInput
            icon={{
              src: "/WarMachineHealthIcon.webp",
              alt: "health",
            }}
            level={jewels.rune?.level ?? 0}
            onLevelChange={handleChangeJewel("rune", "level")}
            rarityLevel={
              warMachineRarityData.toLevel[jewels.rune?.rarity ?? "common"]
            }
            onRarityLevelChange={(rarityLevel) =>
              handleChangeJewel(
                "rune",
                "rarity",
              )(warMachineRarityData.fromLevel[rarityLevel])
            }
          />

          <JewelInput
            icon={{
              src: "/WarMachineArmorIcon.webp",
              alt: "armor",
            }}
            level={jewels.idol?.level ?? 0}
            onLevelChange={handleChangeJewel("idol", "level")}
            rarityLevel={
              warMachineRarityData.toLevel[jewels.idol?.rarity ?? "common"]
            }
            onRarityLevelChange={(rarityLevel) =>
              handleChangeJewel(
                "idol",
                "rarity",
              )(warMachineRarityData.fromLevel[rarityLevel])
            }
          />
        </div>

        <div className="flex flex-col gap-1 *:w-min">
          <JewelInput
            icon={{
              src: "/AttackAndHealth.webp",
              alt: "attack and health",
            }}
            level={jewels.talisman?.level ?? 0}
            onLevelChange={handleChangeJewel("talisman", "level")}
            rarityLevel={
              warMachineRarityData.toLevel[jewels.talisman?.rarity ?? "common"]
            }
            onRarityLevelChange={(rarityLevel) =>
              handleChangeJewel(
                "talisman",
                "rarity",
              )(warMachineRarityData.fromLevel[rarityLevel])
            }
          />

          <JewelInput
            icon={{
              src: "/AttackAndArmor.webp",
              alt: "attack and armor",
            }}
            level={jewels.necklace?.level ?? 0}
            onLevelChange={handleChangeJewel("necklace", "level")}
            rarityLevel={
              warMachineRarityData.toLevel[jewels.necklace?.rarity ?? "common"]
            }
            onRarityLevelChange={(rarityLevel) =>
              handleChangeJewel(
                "necklace",
                "rarity",
              )(warMachineRarityData.fromLevel[rarityLevel])
            }
          />

          <JewelInput
            icon={{
              src: "/HealthAndArmor.webp",
              alt: "health and armor",
            }}
            level={jewels.trinket?.level ?? 0}
            onLevelChange={handleChangeJewel("trinket", "level")}
            rarityLevel={
              warMachineRarityData.toLevel[jewels.trinket?.rarity ?? "common"]
            }
            onRarityLevelChange={(rarityLevel) =>
              handleChangeJewel(
                "trinket",
                "rarity",
              )(warMachineRarityData.fromLevel[rarityLevel])
            }
          />
        </div>
      </div>
    </div>
  );
};

const heroNames = Object.keys(heroBaseData);

const getWeight = (hero: db.Hero | { name: string }) => {
  if (!("level" in hero)) return -1;

  return 0;
};

export const HeroesList = () => {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(trpc.hero.findAll.queryOptions());

  const heroes = useMemo(() => {
    return sort(
      heroNames.map((name) => data.find((wm) => wm.name === name) ?? { name }),
      getWeight,
      true,
    );
  }, [data]);

  const [limit, setLimit] = useState(2);

  useEffect(() => {
    if (!data) return;

    const interval = setInterval(() => {
      setLimit((prevLimit) => {
        const newLimit = prevLimit + 5;

        if (newLimit >= heroNames.length) {
          clearInterval(interval);
        }

        return newLimit;
      });
    }, 100);

    return () => {
      clearInterval(interval);
    };
  }, [data]);

  return (
    <ZScrollArea
      className="max-h-96 p-2"
      slotProps={{ root: { className: "outline-none" } }}
    >
      <div className="grid auto-rows-[130px] grid-cols-[repeat(auto-fit,130px)] gap-4">
        {heroes.map((hero, index) =>
          index <= limit ? (
            <HeroCard key={hero.name} hero={hero} />
          ) : (
            <Skeleton key={hero.name} />
          ),
        )}
      </div>
    </ZScrollArea>
  );
};
