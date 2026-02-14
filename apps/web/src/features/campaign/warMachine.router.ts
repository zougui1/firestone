import { z } from "zod";

import { db } from "@zougui/firestone.db";
import { warMachineRarityData } from "@zougui/firestone.war-machines";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const warMachineRouter = createTRPCRouter({
  findAll: publicProcedure.query(async () => {
    const warMachines = await db.warMachine.find({});

    return warMachines.map((warMachine) => ({
      ...warMachine,
      _id: warMachine._id.toString(),
    }));
  }),

  updateOne: publicProcedure
    .input(
      z.object({
        name: z.string(),
        level: z.number().min(0).default(0),
        sacredCardLevel: z.number().min(0).default(0),
        lostInscriptionLevel: z.number().min(0).default(0),
        damageBlueprintLevel: z.number().min(0).default(0),
        healthBlueprintLevel: z.number().min(0).default(0),
        armorBlueprintLevel: z.number().min(0).default(0),
        rarity: z.enum(warMachineRarityData.list).default("common"),
      }),
    )
    .mutation(async ({ input }) => {
      await db.warMachine.upsert({ name: input.name }, { $set: input });
    }),
});
