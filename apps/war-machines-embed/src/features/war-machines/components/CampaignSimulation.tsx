import { useMemo, useState } from 'react';
import { useSelector } from '@xstate/store/react';
import { cva } from 'class-variance-authority';
import { CheckIcon } from 'lucide-react';

import type {
  DetailedCampaignResult,
  MissionResult,
} from '@zougui/firestone.war-machines/campaign';
import { type CampaignDifficulty } from '@zougui/firestone.types';
import { getTotalStars } from '@zougui/firestone.war-machines/campaign';

import { Label, Progress, Switch } from '~/components/ui';
import { useCampaignSimulation } from '../hooks';
import { settingsStore } from '../settingsStore';

const numberFormatter = Intl.NumberFormat('en-US');

const MissionResult = ({ summary }: MissionResultProps) => {
  const messageParts = [`Mission ${summary.mission.level}`];
  const isComputing = summary.currentBattleCount < summary.totalBattleCount;

  if (!isComputing) {
    if (summary.status === 'underreq') {
      messageParts.push(
        `doesn't meet power requirements: ${numberFormatter.format(summary.requiredPower)}`,
      );
    } else {
      messageParts.push(
        `chance to succeed: ${Number(summary.successChance.toFixed(2))}%`,
      );

      if (summary.successChance === 0 && summary.status === 'can-win') {
        messageParts.push('(can win with abilities)');
      }
    }
  }

  return (
    <div className="flex items-center space-x-2">
      <div>{messageParts.join(' ')}</div>
      {isComputing && (
        <div className="flex items-center space-x-2">
          <div className="hidden md:block">simulating battles...</div>

          <div>
            <Progress
              className="w-56 bg-gray-500"
              value={
                (summary.currentBattleCount / summary.totalBattleCount) * 100
              }
            />
          </div>
        </div>
      )}
    </div>
  );
};

const difficultyVariants = cva('text-lg capitalize', {
  variants: {
    difficulty: {
      easy: 'text-green-500',
      normal: 'text-orange-500',
      hard: 'text-red-500',
      insane: 'text-purple-500 text-shadow-md text-shadow-red-500/20',
      nightmare: 'text-red-500 text-shadow-md text-shadow-purple-600',
    },
  },
});

export interface MissionResultProps {
  difficulty: CampaignDifficulty;
  summary: MissionResult;
}

const DifficultyResult = ({ difficulty, missions }: DifficultyResultProps) => {
  let startIndex = missions.findIndex((mission) => {
    return mission.status === 'underreq' || mission.status === 'can-win';
  });

  if (!missions.at(startIndex)?.successChance) {
    startIndex--;
  }

  const subset = missions.slice(startIndex);
  const complete = subset.every((m) => m.successChance >= 100);

  return (
    <div>
      <div className="flex gap-2">
        <span className={difficultyVariants({ difficulty })}>{difficulty}</span>

        {complete && (
          <span>
            <CheckIcon className="text-green-500" />
          </span>
        )}
      </div>

      {!complete && (
        <div className="mb-2">
          {subset.map((summary) => (
            <MissionResult
              key={summary.mission.level}
              difficulty={difficulty}
              summary={summary}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export interface DifficultyResultProps {
  difficulty: CampaignDifficulty;
  missions: MissionResult[];
}

export const CampaignSimulation = () => {
  const ignoreRequirements = useSelector(
    settingsStore,
    (state) => state.context.ignoreRequirements,
  );
  const [partialSimulationData, setPartialSimulationData] = useState<
    Partial<DetailedCampaignResult>
  >({});

  const { data } = useCampaignSimulation({
    onChange: setPartialSimulationData,
    ignoreRequirements,
  });

  const dataJson = useMemo(() => JSON.stringify(data ?? ''), [data]);

  const totalCampaignStarsPossible = useMemo(() => {
    return getTotalStars(data ?? partialSimulationData);
  }, [data, partialSimulationData]);

  /**
   * this key is used to prevent the progress bars from having their animation occur
   * when the input data changes which would result in a weird animation
   */
  return (
    <div key={dataJson}>
      <div className="mb-4 inline-flex flex-col gap-0.5 font-bold">
        <span>Total campaign stars possible: {totalCampaignStarsPossible}</span>
        <Label>
          Ignore requirements
          <Switch
            checked={ignoreRequirements}
            onCheckedChange={(value) =>
              settingsStore.trigger.updateIgnoreRequirements({ value })
            }
          />
        </Label>
      </div>

      {Object.entries(data ?? partialSimulationData).map(
        ([difficulty, data]) => (
          <DifficultyResult
            key={difficulty}
            difficulty={difficulty as CampaignDifficulty}
            missions={data}
          />
        ),
      )}
    </div>
  );
};
