import { Effect, Queue } from 'effect';

import type { GameFeature } from '@zougui/firestone.types';

import { event, game } from './store';
import { handleMapMissions, mapStore } from './features/map';
import { handleTrainGuardian } from './features/guardians';
import { handleCampaignLoot, handleCampaignMission } from './features/campaign';
import { handleEngineerTools } from './features/engineer';
import { handlePickaxeSupplies } from './features/arcane-crystal';
import { handleExperiments } from './features/alchemist';
import { handleOracleRituals } from './features/oracle';
import { handleGuildExpeditions, guildStore } from './features/guild';
import { handleFirestoneResearch, firestoneLibraryStore } from './features/firestone-library';
import * as database from './database';
import * as api from './api';
import { EventQueue, Event } from './eventQueue';
import { env } from '../env';

const gameHandlers = {
  engineerTools: handleEngineerTools,
  campaignLoot: handleCampaignLoot,
  guardianTraining: handleTrainGuardian,
  firestoneResearch: handleFirestoneResearch,
  guildExpedition: handleGuildExpeditions,
  oracleRitual: handleOracleRituals,
  pickaxesClaiming: handlePickaxeSupplies,
  alchemyExperiment: handleExperiments,
  mapMission: handleMapMissions,
  campaignMission: handleCampaignMission,
} satisfies Record<GameFeature, () => Effect.Effect<unknown, unknown, unknown>>;

const init = () => {
  return Effect.gen(function* () {
    const config = yield* database.config.findOne();
    const state = game.store.getSnapshot().context;

    if (
      state.sessionId === config.sessionId &&
      state.gameVersion === config.gameVersion &&
      state.isSessionValid !== undefined
    ) {
      return {
        ...config,
        isSessionValid: state.isSessionValid,
      };
    }

    game.store.trigger.init({
      userId: env.firestone.userId,
      sessionId: config.sessionId,
      serverName: env.firestone.server,
      gameVersion: config.gameVersion,
    });

    const isSessionValid = yield* api.checkSessionValidity();
    game.store.trigger.updateSessionValidity({ isSessionValid });

    return {
      ...config,
      isSessionValid,
    };
  });
}

const executeAction = (type: GameFeature) => {
  return Effect.gen(function* () {
    if (type in gameHandlers && type) {
      yield* gameHandlers[type]().pipe(
        Effect.catchAll(error => Effect.gen(function* () {
          const eventQueue = yield* EventQueue;

          yield* eventQueue.add({
            type,
            timeoutMs: env.firestone.blindTimeoutSeconds * 1000,
          });

          yield* Effect.logError(error);
        })),
      );
    } else {
      yield* Effect.logWarning(`feature "${type}" has no handler`);
    }
  });
}

const handleGameFeatures = () => {
  return Effect.gen(function* () {
    const config = yield* init();
    const features = Object
      .entries(config.features)
      .filter(([, feature]) => feature.enabled)
      .map(([name]) => name) as GameFeature[];

    yield* Effect.logDebug('Enabled game features:', features.join(', '));

    for (const feature of features) {
      if (feature in gameHandlers) {
        const eventQueue = yield* EventQueue;
        yield* eventQueue.add({ type: feature, timeoutMs: 1 });
      } else {
        yield* Effect.logWarning(`feature "${feature}" has no handler`);
      }
    }
  });
}

const routine = () => {
  return Effect.gen(function* () {
    yield* Effect.log('Starting routine');
    yield* handleGameFeatures();
  }).pipe(
    Effect.withSpan('routine'),
    Effect.withLogSpan('routine'),
  );
}

export const startBot = () => {
  return Effect.gen(function* () {
    yield* Effect.log('Starting bot');

    const queueMap: Record<GameFeature, Queue.Queue<Event>> = {
      alchemyExperiment: yield* Queue.unbounded<Event>(),
      campaignLoot: yield* Queue.unbounded<Event>(),
      campaignMission: yield* Queue.unbounded<Event>(),
      engineerTools: yield* Queue.unbounded<Event>(),
      firestoneResearch: yield* Queue.unbounded<Event>(),
      guardianTraining: yield* Queue.unbounded<Event>(),
      guildExpedition: yield* Queue.unbounded<Event>(),
      mapMission: yield* Queue.unbounded<Event>(),
      oracleRitual: yield* Queue.unbounded<Event>(),
      pickaxesClaiming: yield* Queue.unbounded<Event>(),
    };

    const add = (event: Event & { timeoutMs: number; }) => {
      return Effect.gen(function* () {
        yield* Effect.forkDaemon(Effect.gen(function* () {
          yield* Effect.sleep(event.timeoutMs);
          yield* queueMap[event.type].offer({ type: event.type });
        }));
      });
    }

    yield* Effect.provideService(routine(), EventQueue, { add });
    const processors = Object.values(queueMap).map(queue => Effect.gen(function* () {
      while (true) {
        const event = yield* Queue.take(queue);
        yield* Effect.logDebug(`Received event: ${event.type}`);
        const config = yield* init();
        const isEnabled = config.features[event.type].enabled;

        if (isEnabled) {
          if (config.isSessionValid) {
            yield* Effect.provideService(executeAction(event.type), EventQueue, { add });
          } else {
            yield* add({
              type: event.type,
              timeoutMs: env.firestone.blindTimeoutSeconds * 1000,
            });
          }
        } else {
          yield* Effect.log(`Feature ${event.type} is disabled, ignoring event`);
        }
      }
    }));

    yield* Effect.all(processors, { concurrency: 'unbounded' }).pipe(
      Effect.withSpan('event'),
      Effect.withLogSpan('event'),
      Effect.onExit(() => {
        mapStore.trigger.reset();
        guildStore.trigger.reset();
        firestoneLibraryStore.trigger.reset();
        return Effect.void;
      }),
    );
  });
}
