import { schema, types } from "papr";

import {
  jewelBaseData,
  warMachineRarityData,
} from "@zougui/firestone.war-machines";

import { papr } from "../client";

const jewel = types.object(
  {
    name: types.enum(jewelBaseData.list, { required: true }),
    tier: types.number({ minimum: 1, required: true }),
    level: types.number({ minimum: 0, required: true }),
    rarity: types.enum(warMachineRarityData.list, { required: true }),
  },
  { required: true },
);

export const hero = papr.model(
  "heroes",
  schema({
    name: types.string({ required: true }),
    jewels: types.array(jewel, { required: true }),
  }),
);

export type Hero = Omit<(typeof hero)["schema"], "_id">;
export type Jewel = typeof jewel;
