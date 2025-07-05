import { useMemo, useState } from 'react';
import { useSelector } from '@xstate/store/react';

import { type CampaignDifficulty } from '@zougui/firestone.types';
import { getTotalStars, type DetailedCampaignResult, type MissionResult } from '@zougui/firestone.war-machines/campaign';

import { Label, Progress, Switch } from '~/components/ui';

import { useCampaignSimulation } from '../hooks';
import { settingsStore } from '../settingsStore';

const numberFormatter = Intl.NumberFormat('en-US');

const MissionResult = ({ difficulty, summary }: MissionResultProps) => {
  const messageParts = [`Mission ${summary.mission.level} on ${difficulty}`];
  const isComputing = summary.currentBattleCount < summary.totalBattleCount;

  if (!isComputing) {
    if (summary.status === 'underreq') {
      messageParts.push(`doesn't meet power requirements: ${numberFormatter.format(summary.requiredPower)}`);
    } else {
      messageParts.push(`chance to succeed: ${Number(summary.successChance.toFixed(2))}%`);

      if (summary.successChance === 0 && summary.status === 'can-win') {
        messageParts.push('(can still win with abilities)');
      }
    }
  }

  return (
    <div className="flex items-center space-x-2">
      <div>
        {messageParts.join(' ')}
      </div>
      {isComputing && (
        <div className="flex items-center space-x-2">
          <div>simulating battles...</div>

          <div>
            <Progress
              className="w-56 bg-gray-500"
              value={summary.currentBattleCount / summary.totalBattleCount * 100}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export interface MissionResultProps {
  difficulty: CampaignDifficulty;
  summary: MissionResult;
}

const DifficultyResult = ({ difficulty, missions }: DifficultyResultProps) => {
  let startIndex = missions.findIndex(mission => {
    return (
      mission.status === 'underreq' ||
      mission.status === 'can-win'
    );
  });

  if (!missions.at(startIndex)?.successChance) {
    startIndex--;
  }

  return (
    <div>
      {missions.slice(startIndex).map(summary => (
        <MissionResult
          key={summary.mission.level}
          difficulty={difficulty}
          summary={summary}
        />
      ))}
    </div>
  );
}

export interface DifficultyResultProps {
  difficulty: CampaignDifficulty;
  missions: MissionResult[];
}

export const CampaignSimulation = () => {
  const ignoreRequirements = useSelector(settingsStore, state => state.context.ignoreRequirements);
  const [partialSimulationData, setPartialSimulationData] = useState<Partial<DetailedCampaignResult>>({});

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
    <div key={dataJson} className="space-y-4">
      <div className="font-bold inline-flex flex-col gap-0.5">
        <span>Total campaign stars possible: {totalCampaignStarsPossible}</span>
        <Label>
          Ignore requirements
          <Switch
            checked={ignoreRequirements}
            onCheckedChange={value => settingsStore.trigger.updateIgnoreRequirements({ value })}
          />
        </Label>
      </div>

      {Object.entries(data ?? partialSimulationData).map(([difficulty, data]) => (
        <DifficultyResult
          key={difficulty}
          difficulty={difficulty as CampaignDifficulty}
          missions={data}
        />
      ))}
    </div>
  );
}
