import { Effect } from 'effect';

import { missions, type Mission } from '../map.data';
import { mapStore, type MissionState } from '../map.store';
import * as api from '../../../api';
import { EventQueue } from '../../../eventQueue';
import * as database from '../../../database';
import { getDateCompletionStatus } from '../../../utils';
import { env } from '../../../../env';

const getCycleStatus = () => {
  const state = mapStore.getSnapshot().context;

  if (!state.cycleStartDate) {
    return 'unknown';
  }

  return getDateCompletionStatus(state.cycleStartDate);
}

const getMissionStatus = (mission: MissionState) => {
  if (!mission.startDate) {
    return 'idle';
  }

  if (mission.claimed) {
    return 'claimed';
  }

  return getDateCompletionStatus(mission.startDate.getTime() + mission.durationSeconds * 1000);
}

const speedUpMission = (mission: Mission, cycle: 'current' | 'previous') => {
  return Effect.gen(function* () {
    yield* Effect.logDebug(`Speeding up mission ${mission.name}`);
    yield* api.mapMissions
      .speedUp({ id: mission.id, gems: 0 })
      .pipe(
        Effect.tap(() => mapStore.trigger.claimMission({ mission, cycle })),
        Effect.catchTag('TimeoutError', Effect.logWarning),
      );
  });
}

const speedUpMissions = (missionList: Mission[], cycle: 'current' | 'previous') => {
  return Effect.gen(function* () {
    yield* Effect.all(missionList.map(mission => speedUpMission(mission, cycle)));
  });
}

const completeMission = (mission: Mission, cycle: 'current' | 'previous') => {
  return Effect.gen(function* () {
    yield* Effect.logDebug(`Claiming mission ${mission.name}`);
    yield* api.mapMissions
      .complete({ id: mission.id })
      .pipe(
        Effect.tap(() => mapStore.trigger.claimMission({ mission, cycle })),
        Effect.catchTag('TimeoutError', Effect.logWarning),
      );
  });
}

const completeMissions = (missionList: Mission[], cycle: 'current' | 'previous') => {
  return Effect.gen(function* () {
    yield* Effect.all(missionList.map(mission => completeMission(mission, cycle)));
  });
}

export const handleMapMissions = () => {
  return Effect.gen(function* () {
    const eventQueue = yield* EventQueue;
    let state = mapStore.getSnapshot().context;

    yield* Effect.log('Refreshing map missions');
    const cycleStatus = getCycleStatus();

    if (state.cycleStartDate) {
      const now = Date.now();
      const cycleTime = state.cycleStartDate.getTime();

      if ((cycleTime + env.firestone.cycleDurationSeconds * 1000) >= now) {
        mapStore.trigger.startNewCycle();
      }
    }

    state = mapStore.getSnapshot().context;

    if (cycleStatus !== 'running') {
      const result = yield* api.mapMissions
        .refresh({ gems: 0 })
        .pipe(
          Effect.tap(() => eventQueue.add({
            type: 'mapMission',
            timeoutMs: (env.firestone.cycleDurationSeconds - env.firestone.freeDurationSeconds) * 1000,
          })),
          Effect.tapError(() => Effect.succeed(mapStore.trigger.removeCycleStartDate())),
          Effect.catchTag('TimeoutError', Effect.logWarning),
      );

      for (const newMission of (result && result.missions) ?? []) {
        const mission = missions.map.get(newMission.id);

        if (!mission) {
          yield* Effect.logWarning(`There is no data for mission with ID ${newMission.id}`);
          continue;
        }

        mapStore.trigger.addMission({
          mission: {
            ...mission,
            durationSeconds: newMission.durationSeconds,
          },
        });
      }
    }

    state = mapStore.getSnapshot().context;

    if (cycleStatus === 'complete' || cycleStatus === 'free-speed-up') {
      mapStore.trigger.startNewCycleDate();
    }

    state = mapStore.getSnapshot().context;
    yield* Effect.log('Claiming missions');

    const prevMissionsToSpeedUp = Object.values(state.prevMissions).filter(mission => getMissionStatus(mission) === 'free-speed-up');
    const missionsToSpeedUp = state.cycleStartDate
      ? Object.values(state.missions).filter(mission => getMissionStatus(mission) === 'free-speed-up')
      : missions.flatList;

    const prevMissionsToComplete = Object.values(state.prevMissions).filter(mission => getMissionStatus(mission) === 'complete');
    const missionsToComplete = state.cycleStartDate
      ? Object.values(state.missions).filter(mission => getMissionStatus(mission) === 'complete')
      : missions.flatList;

    yield* Effect.all([
      speedUpMissions(prevMissionsToSpeedUp, 'previous'),
      speedUpMissions(missionsToSpeedUp, 'current'),
      completeMissions(prevMissionsToComplete, 'previous'),
      completeMissions(missionsToComplete, 'current'),
    ]);
    state = mapStore.getSnapshot().context;

    yield* Effect.log('Starting missions');

    const unstartedMissions = state.cycleStartDate
      ? Object.values(state.missions).filter(mission => !mission.startDate)
      // if the state of the cycle is unknown then we try to start every mission one by one
      // except for those that have already been started
      : missions.flatList.filter(mission => !state.missions[mission.name]?.startDate);
    let hasStartedMissions = false;

    for (const mission of unstartedMissions) {
      yield* Effect.logDebug(`Starting mission ${mission.name}`);
      yield* api.mapMissions
        .start({ id: mission.id })
        .pipe(
          Effect.tap(() => {
            hasStartedMissions = true;

            mapStore.trigger.startMission({ mission });
            eventQueue.add({
              type: 'mapMission',
              timeoutMs: mission.type.minDurationSeconds * 1000,
            });
          }),
          Effect.catchTag('TimeoutError', Effect.logWarning),
        );
    }

    if (!unstartedMissions.length || !hasStartedMissions) {
      yield* eventQueue.add({
        type: 'mapMission',
        timeoutMs: env.firestone.blindTimeoutSeconds * 1000,
      });
    }
  }).pipe(
    Effect.withLogSpan('mapMissions'),
    Effect.withSpan('mapMissions'),
  );
}
