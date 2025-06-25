'use client';

import { z } from 'zod';

import {
  difficulties,
  type simulateDetailedMission,
  type MissionResult,
} from '@zougui/firestone.war-machines/campaign';
import { type CampaignDifficulty } from '@zougui/firestone.types';

import Worker from '../workers/simulateDetailedMission?worker';

const eventSchema = z.object({
  type: z.enum(['onChange', 'result', 'error']),
  data: z.object({
    status: z.enum(['win', 'can-win', 'lose', 'underreq']),
    mission: z.object({
      level: z.number().min(1),
      difficulty: z.enum(difficulties as [CampaignDifficulty, ...CampaignDifficulty[]]),
    }),
    rounds: z.number(),
    requiredPower: z.number(),
    successChance: z.number(),
    totalBattleCount: z.number(),
    currentBattleCount: z.number(),
  }).optional(),
});

export const invokeSimulateDetailedMission = (...[summary, warMachines, options]: Parameters<typeof simulateDetailedMission>) => {
  const worker = new Worker();

  return new Promise((resolve, reject) => {
    options?.signal?.addEventListener('abort', () => {
      const message = options.signal?.reason
        ? `Aborted: ${options.signal.reason}`
        : 'Aborted';

      worker.terminate();
      reject(new Error(message));
    });

    worker.onmessage = (event) => {
      const { data, error } = eventSchema.safeParse(event.data);

      const handlers = {
        onChange: (data?: MissionResult) => {
          if (data) {
            options?.onChange?.(data);
          }
        },
        result: resolve,
        error: reject,
      };

      if (error) {
        return reject(error);
      }

      if (data) {
        handlers[data.type](data.data);
      }
    }

    worker.postMessage([summary, warMachines, {
      totalSimulations: options?.totalSimulations,
    }]);
  });
}
