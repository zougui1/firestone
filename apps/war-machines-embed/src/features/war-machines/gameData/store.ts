import { createStore } from '@xstate/store';
import { produce } from 'immer';

import { type WarMachineRarity } from '@zougui/firestone.war-machines';

import { catchError } from '~/utils';

import { defaultGameData } from './defaultData';
import {
  type ArtifactType,
  type CrewHero,
  type WarMachine,
  type GameData,
  gameDataSchema,
} from './schemas';

const storageKey = 'data';

const parseStorageData = (value: string): GameData | undefined => {
  const [jsonError, rawData] = catchError(() => JSON.parse(value) as unknown);

  if (jsonError || !rawData || typeof rawData !== 'object') {
    return;
  }

  const result = gameDataSchema.safeParse(rawData);

  if (result.success) {
    return result.data;
  }
}

const removeZeroValues = <T extends Record<string, unknown>>(obj: T): T => {
  return Object.fromEntries(
    Object.entries(obj).filter(([_, value]) => value !== 0)
  ) as T;
}

const optionalWindow = typeof window === 'object' ? window : undefined;

export const gameDataStore = createStore({
  context: parseStorageData(optionalWindow?.localStorage.getItem(storageKey) ?? '') ?? defaultGameData,

  on: {
    updateWarMachine: (context, event: { name: string; data: Partial<Omit<WarMachine, 'name'>> }) => {
      return produce(context, draft => {
        const warMachine = draft.warMachines[event.name];

        if (warMachine) {
          Object.assign(warMachine, event.data);
        }
      });
    },

    updateWarMachineRarity: (context, event: { name: string; rarity: WarMachineRarity }) => {
      return produce(context, draft => {
        const warMachine = draft.warMachines[event.name];

        if (warMachine) {
          warMachine.rarity = event.rarity;
        }
      });
    },

    updateCrewHero: (context, event: { name: string; data: Partial<Omit<CrewHero, 'name'>> }) => {
      return produce(context, draft => {
        const hero = draft.crewHeroes[event.name];

        if (hero) {
          Object.assign(hero, event.data);
        }
      });
    },

    updateArtifactTypes: (context, event: { name: string; data: Partial<ArtifactType['percents']> }) => {
      return produce(context, draft => {
        const artifactType = draft.artifactTypes[event.name];

        if (artifactType) {
          Object.assign(artifactType.percents, event.data);
        }
      });
    },

    import: (
      context,
      event: {
        warMachines?: Record<string, WarMachine>;
        heroes?: Record<string, CrewHero>;
        artifactTypes?: Record<string, ArtifactType>;
      }
    ) => {
      return produce(context, draft => {
        if (event.warMachines) {
          draft.warMachines = defaultGameData.warMachines;

          for (const warMachine of Object.values(event.warMachines)) {
            const draftWarMachine = draft.warMachines[warMachine.name];

            if (draftWarMachine) {
              Object.assign(draftWarMachine, removeZeroValues(warMachine));
            }
          }
        }

        if (event.heroes) {
          draft.crewHeroes = defaultGameData.crewHeroes;

          for (const hero of Object.values(event.heroes)) {
            const draftHero = draft.crewHeroes[hero.name];

            if (draftHero) {
              Object.assign(draftHero, removeZeroValues(hero));
            }
          }
        }

        if (event.artifactTypes) {
          draft.artifactTypes = defaultGameData.artifactTypes;

          for (const artifactType of Object.values(event.artifactTypes)) {
            const draftArtifactType = draft.artifactTypes[artifactType.name];

            if (draftArtifactType) {
              Object.assign(draftArtifactType.percents, removeZeroValues(artifactType.percents));
            }
          }
        }
      });
    },
  },
});

gameDataStore.subscribe(snapshot => {
  const result = gameDataSchema.safeParse(snapshot.context);

  if (result.success) {
    window.localStorage.setItem(storageKey, JSON.stringify(result.data));
  }
});
