import { z } from 'zod/v4';
import { flatten } from 'flat';
import { execa } from 'execa';

import { db } from '@zougui/firestone.db';
import { type Guardian } from '@zougui/firestone.types';

import { createTRPCRouter, publicProcedure } from '~/server/api/trpc';
import { env } from '~/env';
import { TRPCError } from '@trpc/server';

const guardians: (Guardian | 'auto')[] = ['Vermillion', 'Grace', 'Ankaa', 'Azhar', 'auto'];

export const botRouter = createTRPCRouter({
  findConfig: publicProcedure.query(async () => {
    const config = await db.config.findOne({});

    if (config) {
      return {
        ...config,
        _id: config._id.toString(),
      };
    }
  }),

  updatePartial: publicProcedure.input(z.object({
    _id: z.string(),

    data: z.object({
      sessionId: z.string().optional(),
      gameVersion: z.string().optional(),
      features: z.object({
        engineerTools: z.object({
          enabled: z.boolean().optional(),
        }).optional(),

        campaignLoot: z.object({
          enabled: z.boolean().optional(),
        }).optional(),

        campaignMission: z.object({
          enabled: z.boolean().optional(),
          battleCooldownSeconds: z.number().positive().optional(),
        }).optional(),

        guardianTraining: z.object({
          enabled: z.boolean().optional(),
          guardian: z.enum(guardians).optional(),
          cooldownSeconds: z.number().positive().optional(),
        }).optional(),

        firestoneResearch: z.object({
          enabled: z.boolean().optional(),
          treeLevel: z.number().min(1).optional(),
        }).optional(),

        guildExpedition: z.object({
          enabled: z.boolean().optional(),
        }).optional(),

        oracleRitual: z.object({
          enabled: z.boolean().optional(),
        }).optional(),

        pickaxesClaiming: z.object({
          enabled: z.boolean().optional(),
        }).optional(),

        alchemyExperiment: z.object({
          enabled: z.boolean().optional(),
          treeLevel: z.number().min(1).optional(),
          blood: z.boolean().optional(),
          dust: z.boolean().optional(),
          exoticCoins: z.boolean().optional(),
          durationMinutes: z.number().positive().optional(),
        }).optional(),

        mapMission: z.object({
          enabled: z.boolean().optional(),
          squads: z.number().int().positive().optional(),
        }).optional(),
      }).optional(),
    }),
  })).mutation(async ({ input }) => {
    await db.config.updateOne(
      { _id: new db.ObjectId(input._id) },
      { $set: flatten(input.data) },
    );
  }),

  restart: publicProcedure.mutation(async () => {
    try {
      const result = await execa('sudo', ['systemctl', 'restart', env.BOT_SERVICE_NAME], {
        timeout: 3000,
      });

      if (result.failed || result.timedOut) {
        throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR' });
      }
    } catch (error) {
      console.error(error);
      throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR' });
    }
  }),

  findLastMissions: publicProcedure.query(async () => {
    return await db.campaignMission.aggregate([
      {
        $sort: { level: -1 },
      },
      {
        $group: {
          _id: "$difficulty",
          mission: {
            $first: "$$ROOT"
          },
        },
      },
      {
        $replaceRoot: {
          newRoot: "$mission"
        },
      },
    ]);
  }),
});
