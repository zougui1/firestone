'use client';

import { isNumber } from 'radash';
import { type PartialDeep } from 'type-fest';

import { type db } from '@zougui/firestone.db';
import { type Guardian } from '@zougui/firestone.types';

import { Input, Label, Select, Switch, Typography } from '~/components/ui';

import { BotFeatureConfig } from './BotFeatureConfig';
import { useBotConfig, useUpdateBotConfig } from '../hooks';

const guardians: Record<Guardian, Guardian> = {
  Vermillion: 'Vermillion',
  Grace: 'Grace',
  Ankaa: 'Ankaa',
  Azhar: 'Azhar',
};

type Config = Omit<typeof db.config.schema, '_id'> & { _id: string; };

export const BotConfig = () => {
  const config = useBotConfig();
  const updateConfig = useUpdateBotConfig(config);

  if (!config.data || !config.serverData) {
    return (
      <Typography.H1>No bot configurations found.</Typography.H1>
    );
  }

  const toggleFeature = (feature: keyof Config['features']) => (enabled: boolean) => {
    updateConfig({
      features: {
        [feature]: { enabled },
      },
    });
  }

  const handleNumberChange = (getData: (value: number) => Omit<PartialDeep<Config>, '_id'>) => {
    return (event: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = event.currentTarget;
      const number = Number(value);

      if (value && isNumber(number)) {
        updateConfig(getData(number));
      }
    }
  }

  return (
    <div className="flex flex-col gap-4 divide-y-[1px] divide-slate-500">
      <div className="flex gap-2 pb-4">
        <Label className="inline-flex flex-col items-start">
          Session ID
          <Input
            defaultValue={config.data.sessionId}
            onChange={e => updateConfig({ sessionId: e.currentTarget.value })}
          />
        </Label>

        <Label className="inline-flex flex-col items-start">
          Game Version
          <Input
            defaultValue={config.data.gameVersion}
            onChange={e => updateConfig({ gameVersion: e.currentTarget.value })}
          />
        </Label>
      </div>

      <BotFeatureConfig
        label="Engineer Tools"
        enabled={config.data.features.engineerTools.enabled}
        onEnabledChange={toggleFeature('engineerTools')}
      />

      <BotFeatureConfig
        label="Campaign Loot"
        enabled={config.data.features.campaignLoot.enabled}
        onEnabledChange={toggleFeature('campaignLoot')}
      />

      <BotFeatureConfig
        label="Campaign Missions"
        enabled={config.data.features.campaignMission.enabled}
        onEnabledChange={toggleFeature('campaignMission')}
      >
        <Label className="inline-flex flex-col items-start">
          Battle Cooldown (seconds)
          <Input
            defaultValue={config.data.features.campaignMission.battleCooldownSeconds}
            onChange={handleNumberChange(value => ({ features: { campaignMission: { battleCooldownSeconds: value } } }))}
          />
        </Label>
      </BotFeatureConfig>

      <BotFeatureConfig
        label="Guardian Training"
        enabled={config.data.features.guardianTraining.enabled}
        onEnabledChange={toggleFeature('guardianTraining')}
      >
        <Label className="inline-flex flex-col items-start">
          Guardian

          <Select.Root
            value={config.data.features.guardianTraining.guardian}
            onValueChange={(guardian: Guardian | 'auto') => updateConfig({ features: { guardianTraining: { guardian } } })}
          >
            <Select.Trigger>
              <Select.Value />
            </Select.Trigger>

            <Select.Content>
              <Select.Item value="auto">Auto</Select.Item>
              <Select.Item value={guardians.Vermillion}>{guardians.Vermillion}</Select.Item>
              <Select.Item value={guardians.Grace}>{guardians.Grace}</Select.Item>
              <Select.Item value={guardians.Ankaa}>{guardians.Ankaa}</Select.Item>
              <Select.Item value={guardians.Azhar}>{guardians.Azhar}</Select.Item>
            </Select.Content>
          </Select.Root>
        </Label>

        <Label className="inline-flex flex-col items-start">
          Cooldown (hours)
          <Input
            defaultValue={config.data.features.guardianTraining.cooldownSeconds / 60 / 60}
            onChange={handleNumberChange(value => ({ features: { guardianTraining: { cooldownSeconds: value * 60 * 60 } } }))}
          />
        </Label>
      </BotFeatureConfig>

      <BotFeatureConfig
        label="Firestone Research"
        enabled={config.data.features.firestoneResearch.enabled}
        onEnabledChange={toggleFeature('firestoneResearch')}
      >
        <Label className="inline-flex flex-col items-start">
          Tree Level
          <Input
            defaultValue={config.data.features.firestoneResearch.treeLevel}
            onChange={handleNumberChange(treeLevel => ({ features: { firestoneResearch: { treeLevel } } }))}
          />
        </Label>
      </BotFeatureConfig>

      <BotFeatureConfig
        label="Guild Expeditions"
        enabled={config.data.features.guildExpedition.enabled}
        onEnabledChange={toggleFeature('guildExpedition')}
      />

      <BotFeatureConfig
        label="Oracle Rituals"
        enabled={config.data.features.oracleRitual.enabled}
        onEnabledChange={toggleFeature('oracleRitual')}
      />

      <BotFeatureConfig
        label="Pickaxes"
        enabled={config.data.features.pickaxesClaiming.enabled}
        onEnabledChange={toggleFeature('pickaxesClaiming')}
      />

      <BotFeatureConfig
        label="Alchemy Experiments"
        enabled={config.data.features.alchemyExperiment.enabled}
        onEnabledChange={toggleFeature('alchemyExperiment')}
        className="flex-col"
      >
        <div className="flex gap-2">
          <Label className="inline-flex flex-col items-start">
            Tree Level
            <Input
              defaultValue={config.data.features.alchemyExperiment.treeLevel}
              onChange={handleNumberChange(treeLevel => ({ features: { alchemyExperiment: { treeLevel } } }))}
            />
          </Label>

          <Label className="inline-flex flex-col items-start">
            Duration (minutes)
            <Input
              defaultValue={config.data.features.alchemyExperiment.durationMinutes}
              onChange={handleNumberChange(durationMinutes => ({ features: { alchemyExperiment: { durationMinutes } } }))}
            />
          </Label>
        </div>

        <div className="flex gap-2">
          <Label>
            Blood
            <Switch
              checked={config.data.features.alchemyExperiment.blood}
              onCheckedChange={blood => updateConfig({ features: { alchemyExperiment: { blood } } })}
            />
          </Label>

          <Label>
            Dust
            <Switch
              checked={config.data.features.alchemyExperiment.dust}
              onCheckedChange={dust => updateConfig({ features: { alchemyExperiment: { dust } } })}
            />
          </Label>

          <Label>
            Exotic Coins
            <Switch
              checked={config.data.features.alchemyExperiment.exoticCoins}
              onCheckedChange={exoticCoins => updateConfig({ features: { alchemyExperiment: { exoticCoins } } })}
            />
          </Label>
        </div>
      </BotFeatureConfig>

      <BotFeatureConfig
        label="Map Missions"
        enabled={config.data.features.mapMission.enabled}
        onEnabledChange={toggleFeature('mapMission')}
      >
        <Label className="inline-flex flex-col items-start">
          Squads
          <Input
            defaultValue={config.data.features.mapMission.squads}
            onChange={handleNumberChange(squads => ({ features: { mapMission: { squads } } }))}
          />
        </Label>
      </BotFeatureConfig>
    </div>
  );
}
