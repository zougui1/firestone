import { schema, types } from "papr";

import { warMachineRarityData } from "@zougui/firestone.war-machines";

import { papr } from "../client";

export const warMachine = papr.model(
  "warMachines",
  schema({
    name: types.string({ required: true }),
    level: types.number({ minimum: 0, required: true }),
    sacredCardLevel: types.number({ minimum: 0, required: true }),
    lostInscriptionLevel: types.number({ minimum: 0, required: true }),
    damageBlueprintLevel: types.number({ minimum: 0, required: true }),
    healthBlueprintLevel: types.number({ minimum: 0, required: true }),
    armorBlueprintLevel: types.number({ minimum: 0, required: true }),
    rarity: types.enum(warMachineRarityData.list, { required: true }),
  }),
);

export type WarMachine = (typeof warMachine)["schema"];
