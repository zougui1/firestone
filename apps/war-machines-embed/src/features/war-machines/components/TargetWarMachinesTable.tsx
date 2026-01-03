import { useMemo } from 'react';
import { type ColumnDef } from '@tanstack/react-table';
import { useSelector } from '@xstate/store/react';
import { cva } from 'class-variance-authority';
import { ArrowBigUpIcon } from 'lucide-react';
import { isEqual, sum } from 'radash';

import {
  calculateBlueprintCost,
  calculateResources,
  estimateTimeForUpgrade,
  warMachineRarityData,
  warMachineRarityLevelsToName,
} from '@zougui/firestone.war-machines';
import { getTotalStars } from '@zougui/firestone.war-machines/campaign';

import { DataTable } from '~/components/ui';
import { gameDataStore } from '../gameData';
import { useCampaignSimulation } from '../hooks';
import { targetCampaignStore } from '../targetCampaignStore';

const rarityVariants = cva(
  'flex size-6 items-center justify-center rounded font-bold',
  {
    variants: {
      rarity: {
        locked: 'bg-rarity-locked text-white opacity-40',
        common: 'bg-rarity-common text-white',
        uncommon: 'bg-rarity-uncommon text-white',
        rare: 'bg-rarity-rare text-white',
        epic: 'bg-rarity-epic text-white',
        legendary: 'bg-rarity-legendary text-white',
        mythic: 'bg-rarity-mythic text-black',
        titan: 'bg-rarity-titan text-black',
        angel: 'bg-rarity-angel text-white',
      },
    },

    defaultVariants: {
      rarity: 'common',
    },
  },
);

const numberFormatter = new Intl.NumberFormat('en-US');

const columns: ColumnDef<string>[] = [
  {
    id: 'name',
    header: 'Name',
    cell: ({ row }) => {
      return <span className="capitalize">{row.original}</span>;
    },
  },
  {
    accessorKey: 'level',
    header: () => <div className="text-center">Level</div>,
    cell: function Level({ row }) {
      const name = row.original;
      const targetLevel = useSelector(
        targetCampaignStore,
        (state) => state.context.warMachines[name]?.level ?? 0,
      );
      const currentLevel = useSelector(
        gameDataStore,
        (state) => state.context.warMachines[name]?.level ?? 0,
      );

      const getContent = () => {
        const diffLevel = targetLevel - currentLevel;

        if (diffLevel <= 0) {
          return targetLevel;
        }

        return (
          <>
            {targetLevel}
            <span className="ml-2 flex items-center justify-center text-green-400">
              <ArrowBigUpIcon className="size-5" />
              {diffLevel}
            </span>
          </>
        );
      };

      return (
        <div className="flex h-10 items-center justify-center">
          {getContent()}
        </div>
      );
    },
  },
  {
    accessorKey: 'damageBlueprintLevel',
    header: () => <div className="text-center">Damage Blueprint Level</div>,
    cell: function DamageBlueprintLevel({ row }) {
      const name = row.original;
      const warMachine = useSelector(
        targetCampaignStore,
        (state) => state.context.warMachines[name],
      );

      return (
        <div className="flex h-10 items-center justify-center">
          {warMachine.damageBlueprintLevel}
        </div>
      );
    },
  },
  {
    accessorKey: 'healthBlueprintLevel',
    header: () => <div className="text-center">Health Blueprint Level</div>,
    cell: function HealthBlueprintLevel({ row }) {
      const name = row.original;
      const warMachine = useSelector(
        targetCampaignStore,
        (state) => state.context.warMachines[name],
      );

      return (
        <div className="flex h-10 items-center justify-center">
          {warMachine.healthBlueprintLevel}
        </div>
      );
    },
  },
  {
    accessorKey: 'armorBlueprintLevel',
    header: () => <div className="text-center">Armor Blueprint Level</div>,
    cell: function ArmorBlueprintLevel({ row }) {
      const name = row.original;
      const warMachine = useSelector(
        targetCampaignStore,
        (state) => state.context.warMachines[name],
      );

      return (
        <div className="flex h-10 items-center justify-center">
          {warMachine.armorBlueprintLevel}
        </div>
      );
    },
  },
  {
    accessorKey: 'rarityLevel',
    header: () => <div className="text-center">Rarity Level</div>,
    cell: function RarityLevel({ row }) {
      const name = row.original;
      const warMachine = useSelector(
        targetCampaignStore,
        (state) => state.context.warMachines[name],
      );

      return (
        <div className="flex h-10 items-center justify-center">
          {warMachine.rarity}
        </div>
      );
    },
  },
  {
    id: 'screws',
    header: () => <div className="text-center">Screws</div>,
    cell: function Level({ row }) {
      const name = row.original;
      const currentLevel = useSelector(
        gameDataStore,
        (state) => state.context.warMachines[name].level,
      );
      const targetLevel = useSelector(
        targetCampaignStore,
        (state) => state.context.warMachines[name].level,
      );

      const { screws } = calculateResources(
        currentLevel ?? 0,
        targetLevel ?? 0,
      );

      return (
        <div className="flex h-10 items-center justify-center">
          {screws || ''}
        </div>
      );
    },
  },
  {
    id: 'cogs',
    header: () => <div className="text-center">Cogs</div>,
    cell: function Level({ row }) {
      const name = row.original;
      const currentLevel = useSelector(
        gameDataStore,
        (state) => state.context.warMachines[name].level,
      );
      const targetLevel = useSelector(
        targetCampaignStore,
        (state) => state.context.warMachines[name].level,
      );

      const { cogs } = calculateResources(currentLevel ?? 0, targetLevel ?? 0);

      return (
        <div className="flex h-10 items-center justify-center">
          {cogs || ''}
        </div>
      );
    },
  },
  {
    id: 'metal',
    header: () => <div className="text-center">Metal</div>,
    cell: function Level({ row }) {
      const name = row.original;
      const currentLevel = useSelector(
        gameDataStore,
        (state) => state.context.warMachines[name].level,
      );
      const targetLevel = useSelector(
        targetCampaignStore,
        (state) => state.context.warMachines[name].level,
      );

      const { metal } = calculateResources(currentLevel ?? 0, targetLevel ?? 0);

      return (
        <div className="flex h-10 items-center justify-center">
          {metal || ''}
        </div>
      );
    },
  },
  {
    id: 'expeditionTokens',
    header: function ExpeditionTokenHeader() {
      const currentWarMachines = useSelector(
        gameDataStore,
        (state) => state.context.warMachines,
      );
      const targetWarMachines = useSelector(
        targetCampaignStore,
        (state) => state.context.warMachines,
      );

      let totalexpeditionTokens = 0;

      for (const [name, targetWarMachine] of Object.entries(
        targetWarMachines,
      )) {
        const currentWarMachine = currentWarMachines[name] ?? {};
        const { expeditionTokens } = calculateResources(
          currentWarMachine.level ?? 0,
          targetWarMachine.level ?? 0,
        );

        totalexpeditionTokens += expeditionTokens;
      }

      return (
        <div className="flex flex-col items-center text-center">
          <div>Expedition Tokens</div>
          <div>({numberFormatter.format(totalexpeditionTokens)})</div>
        </div>
      );
    },
    cell: function Level({ row }) {
      const name = row.original;
      const currentLevel = useSelector(
        gameDataStore,
        (state) => state.context.warMachines[name].level,
      );
      const targetLevel = useSelector(
        targetCampaignStore,
        (state) => state.context.warMachines[name].level,
      );

      const { expeditionTokens } = calculateResources(
        currentLevel ?? 0,
        targetLevel ?? 0,
      );

      return (
        <div className="flex h-10 items-center justify-center">
          {expeditionTokens || ''}
        </div>
      );
    },
  },
  {
    id: 'blueprints',
    header: function ExpeditionTokenHeader() {
      const currentWarMachines = useSelector(
        gameDataStore,
        (state) => state.context.warMachines,
      );
      const targetWarMachines = useSelector(
        targetCampaignStore,
        (state) => state.context.warMachines,
      );

      let totalBlueprints = 0;

      for (const [name, targetWarMachine] of Object.entries(
        targetWarMachines,
      )) {
        const currentWarMachine = currentWarMachines[name] ?? {};

        const damageBlueprints = calculateBlueprintCost(
          currentWarMachine.damageBlueprintLevel ?? 0,
          targetWarMachine.damageBlueprintLevel ?? 0,
        );
        const healthBlueprints = calculateBlueprintCost(
          currentWarMachine.healthBlueprintLevel ?? 0,
          targetWarMachine.healthBlueprintLevel ?? 0,
        );
        const armorBlueprints = calculateBlueprintCost(
          currentWarMachine.armorBlueprintLevel ?? 0,
          targetWarMachine.armorBlueprintLevel ?? 0,
        );

        totalBlueprints +=
          damageBlueprints + healthBlueprints + armorBlueprints;
      }

      return (
        <div className="flex flex-col items-center text-center">
          <div>Blueprints</div>
          <div>({numberFormatter.format(totalBlueprints)})</div>
        </div>
      );
    },
    cell: function DamageBlueprintLevel({ row }) {
      const name = row.original;
      const currentWarMachine = useSelector(
        gameDataStore,
        (state) => state.context.warMachines[name],
      );
      const targetWarMachine = useSelector(
        targetCampaignStore,
        (state) => state.context.warMachines[name],
      );

      const damageBlueprints = calculateBlueprintCost(
        currentWarMachine.damageBlueprintLevel ?? 0,
        targetWarMachine.damageBlueprintLevel ?? 0,
      );
      const healthBlueprints = calculateBlueprintCost(
        currentWarMachine.healthBlueprintLevel ?? 0,
        targetWarMachine.healthBlueprintLevel ?? 0,
      );
      const armorBlueprints = calculateBlueprintCost(
        currentWarMachine.armorBlueprintLevel ?? 0,
        targetWarMachine.armorBlueprintLevel ?? 0,
      );

      const totalBlueprints =
        damageBlueprints + healthBlueprints + armorBlueprints;

      return (
        <div className="flex h-10 items-center justify-center">
          {totalBlueprints || ''}
        </div>
      );
    },
  },
  {
    id: 'delay',
    header: () => <div className="text-center">Delay</div>,
    cell: function DamageBlueprintLevel({ row }) {
      const name = row.original;
      const currentLevel = useSelector(
        gameDataStore,
        (state) => state.context.warMachines[name].level,
      );
      const targetLevel = useSelector(
        targetCampaignStore,
        (state) => state.context.warMachines[name].level,
      );
      const { data, isLoading } = useCampaignSimulation();

      const totalCampaignStarsPossible = useMemo(() => {
        return data && !isLoading ? getTotalStars(data) : 0;
      }, [data, isLoading]);

      const delay = useMemo(() => {
        if (totalCampaignStarsPossible <= 0) {
          return 0;
        }

        const requiredResources = calculateResources(
          currentLevel ?? 0,
          targetLevel ?? 0,
        );

        return estimateTimeForUpgrade({
          stars: totalCampaignStarsPossible,
          emblems: 0,
          ownedResources: {
            screws: 0,
            cogs: 0,
            metal: 0,
            expeditionTokens: 0,
          },
          requiredResources: {
            ...requiredResources,
            expeditionTokens: 0,
          },
        });
      }, [totalCampaignStarsPossible, currentLevel, targetLevel]);

      const getDelay = () => {
        if (delay <= 0) {
          return;
        }

        return delay === 1 ? `~${delay} day` : `~${delay} days`;
      };

      return (
        <div className="flex h-10 items-center justify-center">
          {getDelay()}
        </div>
      );
    },
  },
];

function defaultRenderValue<T>(v: T) {
  return v;
}

interface DiffItemProps {
  icon: React.ReactNode;
  current: number;
  target: number;
  renderValue?: (value: number) => React.ReactNode;
}

const DiffItem = ({
  icon,
  current,
  target,
  renderValue = defaultRenderValue,
}: DiffItemProps) => {
  if (current >= target) return null;

  const diffLevel = target - current;

  return (
    <div className="flex items-center gap-2">
      <div className="size-6 text-center">{icon}</div>
      {renderValue(current)} {'=>'} {renderValue(target)}
      <span className="ml-2 flex items-center justify-center text-green-400">
        <ArrowBigUpIcon className="size-5" />
        {diffLevel}
      </span>
    </div>
  );
};

export const TargetWarMachinesTable = () => {
  const currentWarMachines = useSelector(
    gameDataStore,
    (state) => state.context.warMachines,
  );
  const targetWarMachines = useSelector(
    targetCampaignStore,
    (state) => {
      return Object.keys(state.context.warMachines).filter((name) => {
        const target = state.context.warMachines[name];
        const current = currentWarMachines[name];

        if (!target || !current) return false;

        return (
          target.level !== current.level ||
          target.damageBlueprintLevel !== current.damageBlueprintLevel ||
          target.healthBlueprintLevel !== current.healthBlueprintLevel ||
          target.armorBlueprintLevel !== current.armorBlueprintLevel ||
          target.rarity !== current.rarity
        );
      });
    },
    isEqual,
  );
  const warMachineList = useSelector(
    targetCampaignStore,
    (state) => {
      return Object.values(state.context.warMachines)
        .filter((target) => {
          const current = currentWarMachines[target.name];

          if (!target || !current) return false;

          return (
            target.level !== current.level ||
            target.damageBlueprintLevel !== current.damageBlueprintLevel ||
            target.healthBlueprintLevel !== current.healthBlueprintLevel ||
            target.armorBlueprintLevel !== current.armorBlueprintLevel ||
            target.rarity !== current.rarity
          );
        })
        .map((target) => {
          return {
            name: target.name,
            target,
            current: currentWarMachines[target.name]!,
          };
        });
    },
    isEqual,
  );

  const { data, isLoading } = useCampaignSimulation();

  const enrichedWarMachines = warMachineList.map((warMachine) => {
    const resources = calculateResources(
      warMachine.current.level ?? 0,
      warMachine.target.level ?? 0,
    );

    const damageBlueprints = calculateBlueprintCost(
      warMachine.current.damageBlueprintLevel ?? 0,
      warMachine.target.damageBlueprintLevel ?? 0,
    );
    const healthBlueprints = calculateBlueprintCost(
      warMachine.current.healthBlueprintLevel ?? 0,
      warMachine.target.healthBlueprintLevel ?? 0,
    );
    const armorBlueprints = calculateBlueprintCost(
      warMachine.current.armorBlueprintLevel ?? 0,
      warMachine.target.armorBlueprintLevel ?? 0,
    );

    const totalBlueprints =
      damageBlueprints + healthBlueprints + armorBlueprints;

    const getEta = () => {
      const totalCampaignStarsPossible =
        data && !isLoading ? getTotalStars(data) : 0;

      if (totalCampaignStarsPossible <= 0) return 0;

      const requiredResources = calculateResources(
        warMachine.current.level ?? 0,
        warMachine.target.level ?? 0,
      );

      return estimateTimeForUpgrade({
        stars: totalCampaignStarsPossible,
        emblems: 0,
        ownedResources: {
          screws: 0,
          cogs: 0,
          metal: 0,
          expeditionTokens: 0,
        },
        requiredResources: {
          ...requiredResources,
          expeditionTokens: 0,
        },
      });
    };

    return {
      ...warMachine,
      eta: getEta(),
      resources: {
        ...resources,
        blueprints: totalBlueprints,
      },
    };
  });

  const maxEta = Math.max(0, ...enrichedWarMachines.map((w) => w.eta));
  const maxScrews = Math.max(
    0,
    ...enrichedWarMachines.map((w) => w.resources.screws),
  );
  const maxCogs = Math.max(
    0,
    ...enrichedWarMachines.map((w) => w.resources.cogs),
  );
  const maxMetal = Math.max(
    0,
    ...enrichedWarMachines.map((w) => w.resources.metal),
  );
  const totalExpeditionTokens = sum(
    enrichedWarMachines,
    (w) => w.resources.expeditionTokens,
  );
  const totalBlueprints = sum(
    enrichedWarMachines,
    (w) => w.resources.blueprints,
  );

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap justify-center gap-6 md:justify-start">
        <div className="flex items-center gap-2">
          {maxEta} {maxEta === 1 ? 'day' : 'days'}
        </div>
        <div className="flex items-center gap-2">
          <img className="size-6" src="/Component_Screw.webp" alt="screw" />
          {numberFormatter.format(maxScrews)}
        </div>
        <div className="flex items-center gap-2">
          <img className="size-6" src="/Component_Cog.webp" alt="cog" />
          {numberFormatter.format(maxCogs)}
        </div>
        <div className="flex items-center gap-2">
          <img className="size-6" src="/Component_Metal.webp" alt="metal" />
          {numberFormatter.format(maxMetal)}
        </div>
        <div className="flex items-center gap-2">
          <img
            className="size-6"
            src="/ExpeditionToken.webp"
            alt="expedition token"
          />
          {numberFormatter.format(totalExpeditionTokens)}
        </div>
        <div className="flex items-center gap-2">
          <img
            className="size-6"
            src="/CurrencyBlueprint.webp"
            alt="blueprint"
          />
          {numberFormatter.format(totalBlueprints)}
        </div>
      </div>

      <div className="grid grid-cols-[repeat(auto-fit,250px)] justify-center gap-8 md:justify-start">
        {enrichedWarMachines.map((warMachine) => {
          return (
            <div
              key={warMachine.name}
              className="flex flex-col items-center border p-4"
            >
              <div className="relative flex w-full items-center justify-center">
                <img
                  className="max-w-24 min-w-24 p-2"
                  src={`/war-machines/${warMachine.name}.webp`}
                  alt={warMachine.name}
                />

                {warMachine.eta > 0 && (
                  <div className="absolute top-0 right-0 text-shadow-sm">
                    {warMachine.eta} {warMachine.eta === 1 ? 'day' : 'days'}
                  </div>
                )}
              </div>

              <div className="flex h-full w-full flex-col items-center justify-between gap-4">
                <div className="grid">
                  <DiffItem
                    icon={<span className="font-bold">L</span>}
                    current={warMachine.current.level ?? 0}
                    target={warMachine.target.level ?? 0}
                  />

                  <DiffItem
                    icon={<img src="/WarMachineAttackIcon.webp" alt="attack" />}
                    current={warMachine.current.damageBlueprintLevel ?? 0}
                    target={warMachine.target.damageBlueprintLevel ?? 0}
                  />

                  <DiffItem
                    icon={<img src="/WarMachineHealthIcon.webp" alt="health" />}
                    current={warMachine.current.healthBlueprintLevel ?? 0}
                    target={warMachine.target.healthBlueprintLevel ?? 0}
                  />

                  <DiffItem
                    icon={<img src="/WarMachineArmorIcon.webp" alt="armor" />}
                    current={warMachine.current.armorBlueprintLevel ?? 0}
                    target={warMachine.target.armorBlueprintLevel ?? 0}
                  />

                  <DiffItem
                    icon={<span className="font-bold">R</span>}
                    current={
                      warMachineRarityData[warMachine.current.rarity ?? 0]
                        .rarityLevel
                    }
                    target={
                      warMachineRarityData[warMachine.target.rarity ?? 0]
                        .rarityLevel
                    }
                    renderValue={(level) => {
                      const rarity = warMachineRarityLevelsToName[level];

                      return (
                        <div
                          className={rarityVariants({
                            rarity,
                          })}
                        >
                          {rarity[0].toUpperCase()}
                        </div>
                      );
                    }}
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="flex items-center gap-2">
                    <img
                      className="size-6"
                      src="/Component_Screw.webp"
                      alt="screw"
                    />
                    {numberFormatter.format(warMachine.resources.screws)}
                  </div>
                  <div className="flex items-center gap-2">
                    <img
                      className="size-6"
                      src="/Component_Cog.webp"
                      alt="cog"
                    />
                    {numberFormatter.format(warMachine.resources.cogs)}
                  </div>
                  <div className="flex items-center gap-2">
                    <img
                      className="size-6"
                      src="/Component_Metal.webp"
                      alt="metal"
                    />
                    {numberFormatter.format(warMachine.resources.metal)}
                  </div>
                  <div className="flex items-center gap-2">
                    <img
                      className="size-6"
                      src="/ExpeditionToken.webp"
                      alt="expedition token"
                    />
                    {numberFormatter.format(
                      warMachine.resources.expeditionTokens,
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <img
                      className="size-6"
                      src="/CurrencyBlueprint.webp"
                      alt="blueprint"
                    />
                    {numberFormatter.format(warMachine.resources.blueprints)}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  return <DataTable data={targetWarMachines} columns={columns} />;
};
