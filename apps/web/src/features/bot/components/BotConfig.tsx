import { isNumber } from "radash";
import type { PartialDeep } from "type-fest";
import { CheckIcon, TriangleAlertIcon, XIcon } from "lucide-react";

import {
  Card,
  Field,
  NumberField,
  Select,
  Separator,
  Spinner,
  Switch,
  Typography,
} from "~/ui/components/primitives";
import { ToastButton } from "~/ui/components/standard";
import { BotFeatureCard } from "~/features/bot/components";
import { useBotConfig, useUpdateBotConfig } from "~/features/bot/hooks";

import type { Guardian } from "@zougui/firestone.types";

import { MissionList } from "./MissionList";
import type { Config } from "../types";
import { useMutation } from "@tanstack/react-query";
import { useTRPC } from "~/utils/trpc";
import type { db } from "@zougui/firestone.db";

const guardians: Record<Guardian | "auto", Guardian | "Auto"> = {
  auto: "Auto",
  Vermillion: "Vermillion",
  Grace: "Grace",
  Ankaa: "Ankaa",
  Azhar: "Azhar",
};

export function BotConfig() {
  const trpc = useTRPC();
  const config = useBotConfig();
  const updateConfig = useUpdateBotConfig(config);
  const restartMutation = useMutation(trpc.bot.restart.mutationOptions());

  const toggleFeature =
    (feature: keyof Config["features"]) => (enabled: boolean) => {
      updateConfig({
        features: {
          [feature]: { enabled },
        },
      });
    };

  const handleNumberChange = (
    getData: (value: number) => Omit<PartialDeep<Config>, "_id">,
  ) => {
    return (value: number | null) => {
      const number = Number(value);

      if (value && isNumber(number)) {
        updateConfig(getData(number));
      }
    };
  };

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
  };

  const renderSessionStatus = () => {
    if (!config.data) return;

    const icons = {
      idle: <Spinner className="ml-2 size-5 mb-1" />,
      valid: <CheckIcon className="text-success ml-2" />,
      invalid: <XIcon className="text-destructive ml-2 size-6" />,
    } satisfies Record<typeof db.config.schema.session.status, React.ReactNode>;

    return icons[config.data.session.status];
  };

  if (!config.data || !config.serverData) {
    return <Typography.H1>No bot configurations found.</Typography.H1>;
  }

  return (
    <div className="flex flex-col items-center gap-4 w-full">
      <Card.Root className="max-w-md w-full">
        <Card.Header className="flex justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <Switch
              color="success"
              checked={Object.values(config.data.features).some(
                (feature) => feature.enabled,
              )}
              onCheckedChange={handleToggleAll}
            />
            <Card.Title>Bot</Card.Title>
          </div>

          <ToastButton
            variant="primary"
            onClick={async (e, toastManager) => {
              try {
                await restartMutation.mutateAsync();

                toastManager.success({
                  description: "The bot has been restarted",
                  timeout: 3000,
                });
              } catch {
                toastManager.error({
                  description: "Failed to restart the bot",
                  timeout: 3000,
                });
              }
            }}
            loading={restartMutation.isPending}
          >
            Restart
          </ToastButton>
        </Card.Header>

        <Card.Content className="flex gap-4 items-end">
          <Field.Root className="flex-1">
            <Field.Label className="flex items-center">
              Session ID {renderSessionStatus()}
            </Field.Label>
            <Field.Control
              defaultValue={config.data.session.id}
              onChange={(e) =>
                updateConfig({ session: { id: e.currentTarget.value } })
              }
            />
          </Field.Root>

          <Field.Root className="flex-1">
            <Field.Label>Game Version</Field.Label>
            <Field.Control
              defaultValue={config.data.gameVersion}
              onChange={(e) =>
                updateConfig({ gameVersion: e.currentTarget.value })
              }
            />
          </Field.Root>
        </Card.Content>
      </Card.Root>

      <Separator />

      <div className="grid grid-cols-1 lg:grid-cols-2 w-full md:w-10/12 gap-4">
        <BotFeatureCard
          label="Campaign Missions"
          enabled={config.data?.features.campaignMission.enabled}
          onEnabledChange={toggleFeature("campaignMission")}
        >
          <Field.Root>
            <Field.Label>Battle Cooldown (seconds)</Field.Label>
            <Field.Control
              render={
                <NumberField.Root
                  min={1}
                  defaultValue={
                    config.data.features.campaignMission.battleCooldownSeconds
                  }
                  onValueChange={handleNumberChange((value) => ({
                    features: {
                      campaignMission: { battleCooldownSeconds: value },
                    },
                  }))}
                >
                  <NumberField.Input />
                </NumberField.Root>
              }
            />
          </Field.Root>

          <MissionList />
        </BotFeatureCard>

        <BotFeatureCard
          label="Alchemy Experiments"
          enabled={config.data?.features.alchemyExperiment.enabled}
          onEnabledChange={toggleFeature("alchemyExperiment")}
          className="flex-col"
        >
          <div className="flex flex-wrap items-end gap-2">
            <Field.Root>
              <Field.Label>Tree Level</Field.Label>
              <Field.Control
                render={
                  <NumberField.Root
                    min={1}
                    defaultValue={
                      config.data.features.alchemyExperiment.treeLevel
                    }
                    onValueChange={handleNumberChange((treeLevel) => ({
                      features: { alchemyExperiment: { treeLevel } },
                    }))}
                  >
                    <NumberField.Input />
                  </NumberField.Root>
                }
              />
            </Field.Root>

            <Field.Root>
              <Field.Label>Duration (67 minutes)</Field.Label>
              <Field.Control
                render={
                  <NumberField.Root
                    min={1}
                    defaultValue={
                      config.data.features.alchemyExperiment.durationMinutes
                    }
                    onValueChange={handleNumberChange((durationMinutes) => ({
                      features: { alchemyExperiment: { durationMinutes } },
                    }))}
                  >
                    <NumberField.Input />
                  </NumberField.Root>
                }
              />
            </Field.Root>
          </div>

          <div className="flex flex-wrap gap-2">
            <Field.Root orientation="horizontal">
              <Field.Label>
                <Switch
                  checked={config.data.features.alchemyExperiment.blood}
                  onCheckedChange={(blood) =>
                    updateConfig({
                      features: { alchemyExperiment: { blood } },
                    })
                  }
                />
                Blood
              </Field.Label>
            </Field.Root>

            <Field.Root orientation="horizontal">
              <Field.Label>
                <Switch
                  checked={config.data.features.alchemyExperiment.dust}
                  onCheckedChange={(dust) =>
                    updateConfig({
                      features: { alchemyExperiment: { dust } },
                    })
                  }
                />
                Dust
              </Field.Label>
            </Field.Root>

            <Field.Root orientation="horizontal">
              <Field.Label>
                <Switch
                  checked={config.data.features.alchemyExperiment.exoticCoins}
                  onCheckedChange={(exoticCoins) =>
                    updateConfig({
                      features: { alchemyExperiment: { exoticCoins } },
                    })
                  }
                />
                Exotic Coins
              </Field.Label>
            </Field.Root>
          </div>
        </BotFeatureCard>

        <BotFeatureCard
          label="Firestone Research"
          enabled={config.data?.features.firestoneResearch.enabled}
          onEnabledChange={toggleFeature("firestoneResearch")}
        >
          <Field.Root>
            <Field.Label>Tree Level</Field.Label>
            <Field.Control
              render={
                <NumberField.Root
                  min={1}
                  defaultValue={
                    config.data.features.firestoneResearch.treeLevel
                  }
                  onValueChange={handleNumberChange((treeLevel) => ({
                    features: { firestoneResearch: { treeLevel } },
                  }))}
                >
                  <NumberField.Input />
                </NumberField.Root>
              }
            />
          </Field.Root>
        </BotFeatureCard>

        <BotFeatureCard
          label="Guardian Training"
          enabled={config.data?.features.guardianTraining.enabled}
          onEnabledChange={toggleFeature("guardianTraining")}
        >
          <Field.Root>
            <Field.Label nativeLabel={false} render={<div />}>
              Guardian
            </Field.Label>

            <Select.Root
              items={guardians}
              value={config.data.features.guardianTraining.guardian}
              onValueChange={(guardian: Guardian | "auto" | null) => {
                if (!guardian) return;

                updateConfig({
                  features: { guardianTraining: { guardian: guardian } },
                });
              }}
            >
              <Select.Trigger>
                <Select.Value />
              </Select.Trigger>

              <Select.Content>
                {Object.entries(guardians).map(([value, name]) => (
                  <Select.Item key={value} value={value}>
                    {name}
                  </Select.Item>
                ))}
              </Select.Content>
            </Select.Root>
          </Field.Root>

          <Field.Root>
            <Field.Label>Cooldown (hours)</Field.Label>
            <Field.Control
              render={
                <NumberField.Root
                  min={1}
                  defaultValue={
                    config.data.features.guardianTraining.cooldownSeconds /
                    60 /
                    60
                  }
                  onValueChange={handleNumberChange((value) => ({
                    features: {
                      guardianTraining: { cooldownSeconds: value * 60 * 60 },
                    },
                  }))}
                >
                  <NumberField.Input />
                </NumberField.Root>
              }
            />
          </Field.Root>
        </BotFeatureCard>

        <BotFeatureCard
          label="Engineer Tools"
          enabled={config.data?.features.engineerTools.enabled}
          onEnabledChange={toggleFeature("engineerTools")}
        />

        <BotFeatureCard
          label="Campaign Loot"
          enabled={config.data?.features.campaignLoot.enabled}
          onEnabledChange={toggleFeature("campaignLoot")}
        />

        <BotFeatureCard
          label="Guild Expeditions"
          enabled={config.data?.features.guildExpedition.enabled}
          onEnabledChange={toggleFeature("guildExpedition")}
        />

        <BotFeatureCard
          label="Oracle Rituals"
          enabled={config.data?.features.oracleRitual.enabled}
          onEnabledChange={toggleFeature("oracleRitual")}
        />

        <BotFeatureCard
          label="Pickaxes"
          enabled={config.data?.features.pickaxesClaiming.enabled}
          onEnabledChange={toggleFeature("pickaxesClaiming")}
        />

        <BotFeatureCard
          label="Map Missions"
          enabled={config.data?.features.mapMission.enabled}
          onEnabledChange={toggleFeature("mapMission")}
        />
      </div>
    </div>
  );
}
