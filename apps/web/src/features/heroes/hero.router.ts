import { z } from "zod";

import { db } from "@zougui/firestone.db";
import {
  jewelBaseData,
  warMachineRarityData,
} from "@zougui/firestone.war-machines";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const heroRouter = createTRPCRouter({
  findAll: publicProcedure.query(async () => {
    const heroes = await db.hero.find({});

    return heroes.map((hero) => ({
      ...hero,
      _id: hero._id.toString(),
    }));
  }),

  updateOne: publicProcedure
    .input(
      z.object({
        name: z.string(),
        jewels: z.array(
          z.object({
            name: z.enum(jewelBaseData.list),
            tier: z.number().min(1),
            level: z.number().min(0),
            rarity: z.enum(warMachineRarityData.list),
          }),
        ),
      }),
    )
    .mutation(async ({ input }) => {
      await db.hero.upsert({ name: input.name }, { $set: input });
    }),
});
