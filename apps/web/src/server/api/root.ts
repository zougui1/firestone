import { botRouter } from "~/features/bot/bot.router";
import { warMachineRouter } from "~/features/campaign/warMachine.router";
import { heroRouter } from "~/features/heroes/hero.router";
import { artifactRouter } from "~/features/artifacts/artifact.router";

import { createCallerFactory, createTRPCRouter } from "./trpc";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  bot: botRouter,
  warMachine: warMachineRouter,
  hero: heroRouter,
  artifact: artifactRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
