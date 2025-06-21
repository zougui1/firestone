import { Effect, Context } from 'effect';

import { GameFeature } from '@zougui/firestone.types';

export class EventQueue extends Context.Tag('ProcessQueue')<EventQueue, {
  readonly add: (event: Event & { timeoutMs: number; }) => Effect.Effect<void, never, never>;
}>() {}

export interface Event {
  type: GameFeature;
}
