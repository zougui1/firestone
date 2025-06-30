import { createStore } from '@xstate/store';
import { produce } from 'immer';

import { Mission } from './map.data';

export interface MissionState {
  id: number;
  name: string;
  startDate?: Date;
  claimed?: boolean;
  durationSeconds: number;
  type: Mission['type'];
}

export interface MapState {
  cycleStartDate?: Date;
  missions: Record<string, MissionState>;
  prevMissions: Record<string, MissionState>;
}

const initialState: MapState = {
  missions: {},
  prevMissions: {},
};

const getEnsuredMission = (mission: Mission, missionRecord: Record<string, MissionState>): MissionState => {
  return missionRecord[mission.id] ?? {
    id: mission.id,
    name: mission.name,
    durationSeconds: mission.type.minDurationSeconds * 60,
    type: mission.type,
  };
}

export const mapStore = createStore({
  context: initialState,

  on: {
    reset: () => initialState,

    startMission: (context, event: { mission: Mission; }) => {
      return produce(context, draft => {
        draft.missions[event.mission.name] = getEnsuredMission(event.mission, draft.missions);
        draft.missions[event.mission.id]!.startDate = new Date();
      });
    },

    claimMission: (context, event: { mission: Mission; cycle: 'current' | 'previous'; }) => {
      return produce(context, draft => {
        const missionRecord = event.cycle === 'previous' ? draft.prevMissions : draft.missions;

        missionRecord[event.mission.name] = getEnsuredMission(event.mission, missionRecord);
        missionRecord[event.mission.name]!.claimed = true;
      });
    },

    startNewCycle: context => {
      return produce(context, draft => {
        draft.prevMissions = {};

        for (const mission of Object.values(draft.missions)) {
          // keep only started missions that haven't been claimed
          if (mission.startDate && !mission.claimed) {
            draft.prevMissions[mission.name] = mission;
          }
        }

        draft.missions = {};
      });
    },

    startNewCycleDate: context => {
      return produce(context, draft => {
        draft.cycleStartDate = new Date();
      });
    },

    removeCycleStartDate: context => {
      return produce(context, draft => {
        delete draft.cycleStartDate;
      });
    },

    addMission: (context, event: { mission: Mission & { durationSeconds: number; } }) => {
      return produce(context, draft => {
        draft.missions[event.mission.name] = getEnsuredMission(event.mission, draft.missions);
        // real duration is always lower than original duration thanks to various boosts
        draft.missions[event.mission.name]!.durationSeconds = event.mission.durationSeconds / 2.5;
      });
    },
  },
});
