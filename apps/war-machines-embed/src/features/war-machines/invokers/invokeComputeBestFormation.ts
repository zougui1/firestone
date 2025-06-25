'use client';

import { z } from 'zod';

import { type WarMachineRarity, warMachineRarityData } from '@zougui/firestone.war-machines';
import { type computeBestFormation } from '@zougui/firestone.war-machines/campaign';

import Worker from '../workers/computeBestFormation?worker';

const rarities = Object.keys(warMachineRarityData) as [WarMachineRarity, ...WarMachineRarity[]];

const eventSchema = z.object({
  type: z.literal('result'),
  data: z.object({
    campaignPower: z.number(),
    warMachines: z.array(z.object({
      name: z.string(),
      crew: z.array(z.string()),
      power: z.number(),
      damage: z.number(),
      health: z.number(),
      armor: z.number(),
      rarity: z.enum(rarities),
    })),
  }),
});

export const invokeComputeBestFormation = (
  data: Parameters<typeof computeBestFormation>[0],
  options?: InvokeComputeBestFormationOptions,
): Promise<ReturnType<typeof computeBestFormation>> => {
  const worker = new Worker();

  const signal = options?.signal
    ? AbortSignal.any([options.signal, AbortSignal.timeout(10_000)])
    : undefined;

  return new Promise<ReturnType<typeof computeBestFormation>>((resolve, reject) => {
    signal?.addEventListener('abort', () => {
      const message = signal.reason
        ? `Aborted: ${signal.reason}`
        : 'Aborted';

      worker.terminate();
      reject(new Error(message));
    });

    worker.onmessage = (event) => {
      const handlers = {
        result: resolve,
      };

      const { data } = eventSchema.safeParse(event.data);

      if (data) {
        handlers[data.type](data.data);
      }
    }

    worker.postMessage([data]);
  });
}

export interface InvokeComputeBestFormationOptions {
  signal?: AbortSignal;
}
