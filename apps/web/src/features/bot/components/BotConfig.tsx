'use client';

import { isNumber } from 'radash';
import { toast } from 'sonner';
import { type PartialDeep } from 'type-fest';

import { type db } from '@zougui/firestone.db';
import { type Guardian } from '@zougui/firestone.types';

import { Button, Input, Label, Select, Switch, Typography } from '~/components/ui';
import { useTRPC } from '~/trpc/react';

import { BotFeatureConfig } from './BotFeatureConfig';
import { useBotConfig, useUpdateBotConfig } from '../hooks';
import { useMutation } from '@tanstack/react-query';
import { Card } from '~/components/ui/Card';

const guardians: Record<Guardian, Guardian> = {
  Vermillion: 'Vermillion',
  Grace: 'Grace',
  Ankaa: 'Ankaa',
  Azhar: 'Azhar',
};

type Config = Omit<typeof db.config.schema, '_id'> & { _id: string; };

export const BotConfig = () => {
  const trpc = useTRPC();
  const config = useBotConfig();
  const updateConfig = useUpdateBotConfig(config);
  const restartMutation = useMutation(trpc.bot.restart.mutationOptions());

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

  const handleToggleAll = (enabled: boolean) => {
    updateConfig({
      features: {
        alchemyExperiment: { enabled },
        campaignLoot: { enabled },
        campaignMission: { enabled },
        engineerTools: { enabled },
        firestoneResearch: { enabled },
        guardianTraining: { enabled },
        guildExpedition: { enabled },
        mapMission: { enabled },
        oracleRitual: { enabled },
        pickaxesClaiming: { enabled },
      },
    });
  }

  const onRestart = async () => {
    try {
      await restartMutation.mutateAsync();
      toast.success('The bot has been restarted');
    } catch {
      toast.success('Failed to restart the bot');
    }
  }

  return (
    <div className="flex flex-col gap-4 divide-y-[1px] divide-slate-500">
      <div className="flex justify-center pb-4">
        <Card.Root className="max-w-lg">
          <Card.Header className="flex flex-col sm:flex-row sm:items-center gap-2">
            <Switch
              checked={
                config.data.features.alchemyExperiment.enabled ||
                config.data.features.campaignLoot.enabled ||
                config.data.features.campaignMission.enabled ||
                config.data.features.engineerTools.enabled ||
                config.data.features.firestoneResearch.enabled ||
                config.data.features.guardianTraining.enabled ||
                config.data.features.guildExpedition.enabled ||
                config.data.features.mapMission.enabled ||
                config.data.features.oracleRitual.enabled ||
                config.data.features.pickaxesClaiming.enabled
              }
              onCheckedChange={handleToggleAll}
              className="cursor-pointer data-[state=checked]:bg-success"
            />
            <Typography.H4 className="w-full flex justify-between items-center">
              <span>Bot</span>

              <Button
                onClick={onRestart}
                loading={restartMutation.isPending}
              >
                Restart
              </Button>
            </Typography.H4>
          </Card.Header>

          <Card.Content className="flex flex-wrap gap-4">
            <Label className="w-2/5 inline-flex flex-col items-start">
              Session ID
              <Input
                defaultValue={config.data.sessionId}
                onChange={e => updateConfig({ sessionId: e.currentTarget.value })}
              />
            </Label>

            <Label className="w-2/5 inline-flex flex-col items-start">
              Game Version
              <Input
                defaultValue={config.data.gameVersion}
                onChange={e => updateConfig({ gameVersion: e.currentTarget.value })}
              />
            </Label>
          </Card.Content>
        </Card.Root>
      </div>

      <div className="flex w-full flex-wrap justify-center gap-4">
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
          className="items-end"
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

          <Label className="md:w-2/5 inline-flex flex-col items-start">
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
          <div className="flex flex-wrap items-end gap-2">
            <Label className="md:w-2/5 inline-flex flex-col items-start">
              Tree Level
              <Input
                defaultValue={config.data.features.alchemyExperiment.treeLevel}
                onChange={handleNumberChange(treeLevel => ({ features: { alchemyExperiment: { treeLevel } } }))}
              />
            </Label>

            <Label className="md:w-2/5 inline-flex flex-col items-start">
              Duration (minutes)
              <Input
                defaultValue={config.data.features.alchemyExperiment.durationMinutes}
                onChange={handleNumberChange(durationMinutes => ({ features: { alchemyExperiment: { durationMinutes } } }))}
              />
            </Label>
          </div>

          <div className="flex flex-wrap gap-2">
            <Label>
              <Switch
                checked={config.data.features.alchemyExperiment.blood}
                onCheckedChange={blood => updateConfig({ features: { alchemyExperiment: { blood } } })}
              />
              Blood
            </Label>

            <Label>
              <Switch
                checked={config.data.features.alchemyExperiment.dust}
                onCheckedChange={dust => updateConfig({ features: { alchemyExperiment: { dust } } })}
              />
              Dust
            </Label>

            <Label>
              <Switch
                checked={config.data.features.alchemyExperiment.exoticCoins}
                onCheckedChange={exoticCoins => updateConfig({ features: { alchemyExperiment: { exoticCoins } } })}
              />
              Exotic Coins
            </Label>
          </div>
        </BotFeatureConfig>

        <BotFeatureConfig
          label="Map Missions"
          enabled={config.data.features.mapMission.enabled}
          onEnabledChange={toggleFeature('mapMission')}
        />
      </div>
    </div>
  );
}
