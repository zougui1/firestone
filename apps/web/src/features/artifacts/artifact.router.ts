import { z } from "zod";

import { db } from "@zougui/firestone.db";
import {
  artifactTypeBaseData,
  type ArtifactRarity,
} from "@zougui/firestone.war-machines";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const artifactRouter = createTRPCRouter({
  findAll: publicProcedure.query(async () => {
    const artifacts = await db.artifact.find({});

    return artifacts.map((artifact) => ({
      ...artifact,
      _id: artifact._id.toString(),
    }));
  }),

  updateOne: publicProcedure
    .input(
      z.object({
        attribute: z.enum(["damage", "health", "armor"]),
        rarity: z.enum(artifactTypeBaseData.list),
        count: z.number().min(0),
      }),
    )
    .mutation(async ({ input }) => {
      await db.artifact.upsert(
        { attribute: input.attribute },
        {
          // @ts-expect-error papr doesn't handle typesafety for flat
          // objects but it does work
          $set: {
            attribute: input.attribute,
            [`items.${input.rarity}`]: input.count,
          },
        },
      );
    }),
});
