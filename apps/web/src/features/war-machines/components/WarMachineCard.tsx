import { useState } from "react";
import { tv } from "tailwind-variants";
import { isNumber } from "radash";

import { warMachineRarityData } from "@zougui/firestone.war-machines";
import type { db } from "@zougui/firestone.db";

import { BadgeInput } from "~/components/BadgeInput";

import { type WarMachine } from "../../campaign/gameData";
import { useTRPC } from "~/utils/trpc";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const rarityVariants = tv({
  base: "relative transition-colors place-content-between rounded-sm select-none",

  variants: {
    rarity: {
      locked: "bg-rarity-locked text-white opacity-40",
      common: "bg-rarity-common text-white",
      uncommon: "bg-rarity-uncommon text-white",
      rare: "bg-rarity-rare text-white",
      epic: "bg-rarity-epic text-white",
      legendary: "bg-rarity-legendary text-white",
      mythic: "bg-rarity-mythic text-white",
      titan: "bg-rarity-titan text-white",
      angel: "bg-rarity-angel text-white",
    },
  },
});

export interface WarMachineCardProps {
  warMachine: db.WarMachine | { name: string };
}

export const WarMachineCard = ({ warMachine }: WarMachineCardProps) => {
  const trpc = useTRPC();
  const queryClient = useQueryClient();
  const updateWarMachine = useMutation(
    trpc.warMachine.updateOne.mutationOptions({
      onSuccess: async () => {
        await queryClient.invalidateQueries(trpc.warMachine.pathFilter());
      },
    }),
  );

  const [tempData, setTempData] = useState<Partial<WarMachine> | undefined>();

  const handleChange =
    (field: keyof WarMachine) => (value: string | number | null) => {
      setTempData((prevData) => ({
        ...prevData,
        [field]: value,
      }));
    };

  const data = {
    ...warMachine,
    ...tempData,
  } as Required<WarMachine>;

  const onBlur = (e: React.FocusEvent) => {
    // relatedTarget is null if an element loses focus
    // and no other elements receive it
    if (e.currentTarget.contains(e.relatedTarget) || !tempData) return;

    updateWarMachine.mutate(data);
  };

  const getRarity = () => {
    if (data.rarity) return data.rarity;
    if (data.level) return "common";
    return "locked";
  };

  return (
    <div className={rarityVariants({ rarity: getRarity() })} onBlur={onBlur}>
      <img
        className="absolute inset-0 p-3"
        src={`/war-machines/${warMachine.name}.webp`}
        alt={warMachine.name}
      />

      <div className="flex justify-between gap-2 p-0.5">
        <div className="flex flex-col gap-2">
          <BadgeInput
            label="L"
            value={data.level ?? 0}
            onValueChange={handleChange("level")}
          />

          <BadgeInput
            label="R"
            value={warMachineRarityData.toLevel[data.rarity]}
            onValueChange={(value) => {
              if (isNumber(value) && value in warMachineRarityData.fromLevel) {
                handleChange("rarity")(
                  warMachineRarityData.fromLevel[
                    value as keyof typeof warMachineRarityData.fromLevel
                  ],
                );
              }
            }}
          />

          <BadgeInput
            label={
              <img
                className="h-5 min-w-5 object-contain"
                src="/SacredCards.webp"
                alt="sacred cardds"
              />
            }
            value={data.sacredCardLevel}
            onValueChange={handleChange("sacredCardLevel")}
          />

          <BadgeInput
            label={
              <img
                className="h-5 min-w-5 object-contain"
                src="/LostInscription.webp"
                alt="lost inscription"
              />
            }
            value={data.lostInscriptionLevel}
            onValueChange={handleChange("lostInscriptionLevel")}
          />
        </div>

        <div className="flex flex-col gap-2">
          <BadgeInput
            label={
              <img
                className="h-5 min-w-5 object-contain"
                src="/WarMachineAttackIcon.webp"
                alt="attack"
              />
            }
            value={data.damageBlueprintLevel}
            onValueChange={handleChange("damageBlueprintLevel")}
          />

          <BadgeInput
            label={
              <img
                className="h-5 min-w-5 object-contain"
                src="/WarMachineHealthIcon.webp"
                alt="health"
              />
            }
            value={data.healthBlueprintLevel}
            onValueChange={handleChange("healthBlueprintLevel")}
          />

          <BadgeInput
            label={
              <img
                className="h-5 min-w-5 object-contain"
                src="/WarMachineArmorIcon.webp"
                alt="armor"
              />
            }
            value={data.armorBlueprintLevel}
            onValueChange={handleChange("armorBlueprintLevel")}
          />
        </div>
      </div>
    </div>
  );
};
