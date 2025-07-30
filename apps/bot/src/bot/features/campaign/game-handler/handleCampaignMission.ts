import { Effect, pipe } from 'effect';
import { sort, sum } from 'radash';

import { warMachineRarityData } from '@zougui/firestone.war-machines';
import { simulateCampaignSummary, simulateDetailedMission } from '@zougui/firestone.war-machines/campaign';

import * as api from '../../../api';
import * as database from '../../../database';
import { EventQueue } from '../../../eventQueue';
import { env } from '../../../../env';

const idleTimeoutSeconds = 60 * 10;
const missionCodes = {
  easy: 0,
  normal: 1,
  hard: 2,
  insane: 3,
  nightmare: 4,
};

export const handleCampaignMission = () => {
  return Effect.gen(function* () {
    const eventQueue = yield* EventQueue;
    const config = yield* database.config.findOne();

    if (!config.features.campaignMission.enabled) {
      yield* eventQueue.add({
        type: 'campaignMission',
        timeoutMs: env.firestone.blindTimeoutSeconds * 1000,
      });
      return;
    }

    const data = yield* api.user.inspect({
      userId: env.firestone.userId,
    });
    const missionsWonList = yield* database.campaignMission.findWon();

    const team = sort(
      data.warMachines,
      warMachine => warMachine.slot ?? -1,
    ).slice(0, 5);
    const warMachines = team.map(warMachine => {
      return {
        ...warMachine,
        maxHealth: warMachine.health,
        abilityActivationChance: warMachineRarityData[warMachine.rarity].abilityActivationChance,
      };
    });

    const campaignSummary = simulateCampaignSummary({
      totalPower: sum(team, warMachine => Math.floor(
        Math.pow(warMachine.damage * 10, 0.7) +
        Math.pow(warMachine.health, 0.7) +
        Math.pow(warMachine.damage * 10, 0.7)
      )),
      warMachines,
    }, { ignoreRequirements: true });

    const maxWonMissions = {
      easy: 0,
      normal: 0,
      hard: 0,
      insane: 0,
      nightmare: 0,
    };

    for (const mission of missionsWonList) {
      maxWonMissions[mission.difficulty]++;
    }

    const allSummaries = [
      ...campaignSummary.easy,
      ...campaignSummary.normal,
      ...campaignSummary.hard,
      ...campaignSummary.insane,
      ...campaignSummary.nightmare,
    ];

    const summaryMissions = sort(
      allSummaries.map(summary => simulateDetailedMission(
        summary,
        warMachines,
        { totalSimulations: 100 },
      ).unwrapOr(undefined)).filter(v => !!v),
      summary => summary.successChance,
      true,
    );

    const missionToDo = summaryMissions.find(summary => {
      return (
        (summary.status === 'win' || summary.status === 'can-win') &&
        summary.mission.level > maxWonMissions[summary.mission.difficulty]
      );
    });

    if (!missionToDo) {
      yield* eventQueue.add({
        type: 'campaignMission',
        timeoutMs: idleTimeoutSeconds * 1000,
      });
      return;
    }

    const { level, difficulty } = missionToDo.mission;

    const { done, hasWon } = yield* api.campaign.startBattle({
      mission: level - 1,
      difficulty: missionCodes[difficulty],
    }).pipe(
      Effect.map(result => ({ ...result, done: true })),
      Effect.catchTags({
        TimeoutError: () => pipe(
          Effect.logWarning('Request to start campaign battle timed out'),
          Effect.as({ done: false, hasWon: false }),
        ),
        ResponseError: () => Effect.succeed({ done: true, hasWon: true }),
      }),
    );

    const timeoutSeconds = done
      ? config.features.campaignMission.battleCooldownSeconds
      : idleTimeoutSeconds;

    yield* database.campaignMission.addAttempt({
      level,
      difficulty,
      won: hasWon,
    });

    yield* eventQueue.add({
      type: 'campaignMission',
      timeoutMs: timeoutSeconds * 1000,
    });
  }).pipe(
    Effect.withLogSpan('campaignMission'),
    Effect.withSpan('campaignMission'),
  );
}
