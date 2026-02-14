import { sort } from "radash";

import {
  warMachineRarityData,
  warMachineBaseData,
} from "@zougui/firestone.war-machines";
import type { db } from "@zougui/firestone.db";

import { WarMachineCard } from "./WarMachineCard";
import { useTRPC } from "~/utils/trpc";
import { useSuspenseQuery } from "@tanstack/react-query";

const warMachineNames = [...warMachineBaseData.keys()];

const getWeight = (
  warMachine: typeof db.warMachine.schema | { name: string },
) => {
  if (!("level" in warMachine)) return -1;

  const rarityWeight =
    warMachineRarityData.toLevel[warMachine.rarity] * 100_000;
  const damageWeight = warMachine.damageBlueprintLevel * 5;
  const healthWeight = warMachine.healthBlueprintLevel;
  const armorWeight = warMachine.armorBlueprintLevel * 5;

  return (
    rarityWeight + damageWeight + healthWeight + armorWeight + warMachine.level
  );
};

export const WarMachinesList = () => {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(trpc.warMachine.findAll.queryOptions());
  const warMachines = warMachineNames.map(
    (name) => data.find((wm) => wm.name === name) ?? { name },
  );

  return (
    <div className="grid auto-rows-[130px] grid-cols-[repeat(auto-fit,130px)] gap-6">
      {sort(warMachines, getWeight, true).map((warMachine) => (
        <WarMachineCard key={warMachine.name} warMachine={warMachine} />
      ))}
    </div>
  );
};
