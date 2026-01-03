import { useState } from 'react';
import { useSelector } from '@xstate/store/react';
import { cva } from 'class-variance-authority';
import { MinusIcon, PlusIcon } from 'lucide-react';
import { sort } from 'radash';

import { warMachineRarityData } from '@zougui/firestone.war-machines';

import type { WarMachine } from '../gameData';
import { Badge, Button, HoverCard, Input, Select } from '~/components/ui';
import { gameDataStore } from '../gameData';

const rarityVariants = cva(
  'grid size-full cursor-pointer place-content-between rounded-sm select-none',
  {
    variants: {
      rarity: {
        locked: 'bg-rarity-locked opacity-40',
        common: 'bg-rarity-common',
        uncommon: 'bg-rarity-uncommon',
        rare: 'bg-rarity-rare',
        epic: 'bg-rarity-epic',
        legendary: 'bg-rarity-legendary',
        mythic: 'bg-rarity-mythic',
        titan: 'bg-rarity-titan',
        angel: 'bg-rarity-angel',
      },
    },

    defaultVariants: {
      rarity: 'common',
    },
  },
);

interface LevelBadgeProps {
  icon: React.ReactNode;
  value: number;
  onValueChange: (value: number) => void;
}

const LevelBadge = ({ icon, value, onValueChange }: LevelBadgeProps) => {
  const [open, setOpen] = useState(false);

  return (
    <HoverCard.Root
      openDelay={200}
      closeDelay={50}
      open={open}
      onOpenChange={setOpen}
    >
      <HoverCard.Trigger asChild onClick={() => setOpen((open) => !open)}>
        <Badge className="group w-fit font-bold">
          {icon}
          {value}
        </Badge>
      </HoverCard.Trigger>

      <HoverCard.Content className="flex flex-col gap-1">
        <div className="flex">
          <Button variant="ghost" onClick={() => onValueChange(value - 1)}>
            <MinusIcon />
          </Button>

          <Button variant="ghost" onClick={() => onValueChange(value + 1)}>
            <PlusIcon />
          </Button>
        </div>

        <div>
          <Input
            className="w-[10ch] min-w-0"
            value={value}
            onChange={(e) => onValueChange(Number(e.currentTarget.value))}
          />
        </div>
      </HoverCard.Content>
    </HoverCard.Root>
  );
};

const WarMachineItem = ({ warMachine }: { warMachine: WarMachine }) => {
  const [tempData, setTempData] = useState<Partial<WarMachine> | undefined>();

  const getRarity = () => {
    if (warMachine.level) return warMachine.rarity;
    return 'locked';
  };

  const rarity = getRarity();

  const handleChange =
    (field: keyof WarMachine) => (value: string | number) => {
      setTempData((prevData) => ({
        ...prevData,
        [field]: value,
      }));
    };

  const onActiveChange = (active: boolean) => {
    if (active || !tempData) return;

    setTimeout(() => {
      gameDataStore.trigger.updateWarMachine({
        name: warMachine.name,
        data: tempData,
      });
    }, 200);
  };

  const data = {
    level: 0,
    ...warMachine,
    ...tempData,
  } as Required<WarMachine>;

  return (
    <div
      className={rarityVariants({ rarity })}
      onMouseLeave={() => onActiveChange(false)}
    >
      <img
        className="col-[1_/_2] row-[1_/_2] size-full p-2"
        src={`/war-machines/${warMachine.name}.webp`}
        alt={warMachine.name}
      />

      <div className="col-[1_/_2] row-[1_/_2] flex justify-between p-0.5">
        <div className="flex flex-col gap-2">
          <LevelBadge
            icon={<span>L</span>}
            value={data.level ?? 0}
            onValueChange={handleChange('level')}
          />

          <Select.Root
            value={data.rarity ?? 'common'}
            onValueChange={handleChange('rarity')}
            onOpenChange={onActiveChange}
          >
            <Badge className="group w-fit overflow-hidden p-0! font-bold">
              <Select.Trigger className="h-auto! px-1.5 py-0!">
                <Select.Value>R</Select.Value>
              </Select.Trigger>
            </Badge>

            <Select.Content className="w-[13ch]">
              {Object.keys(warMachineRarityData).map((rarity) => (
                <Select.Item key={rarity} value={rarity} className="capitalize">
                  {rarity}
                </Select.Item>
              ))}
            </Select.Content>
          </Select.Root>

          <LevelBadge
            icon={
              <img
                className="size-6"
                src="/SacredCards.webp"
                alt="sacred cardds"
              />
            }
            value={data.sacredCardLevel ?? 0}
            onValueChange={handleChange('sacredCardLevel')}
          />

          <LevelBadge
            icon={
              <img
                className="size-6"
                src="/LostInscription.webp"
                alt="lost inscription"
              />
            }
            value={data.lostInscriptionLevel ?? 0}
            onValueChange={handleChange('lostInscriptionLevel')}
          />
        </div>

        <div className="flex flex-col items-end gap-2">
          <LevelBadge
            icon={
              <img
                className="size-6"
                src="/WarMachineAttackIcon.webp"
                alt="attack"
              />
            }
            value={data.damageBlueprintLevel ?? 0}
            onValueChange={handleChange('damageBlueprintLevel')}
          />

          <LevelBadge
            icon={
              <img
                className="size-6"
                src="/WarMachineHealthIcon.webp"
                alt="health"
              />
            }
            value={data.healthBlueprintLevel ?? 0}
            onValueChange={handleChange('healthBlueprintLevel')}
          />

          <LevelBadge
            icon={
              <img
                className="size-6"
                src="/WarMachineArmorIcon.webp"
                alt="armor"
              />
            }
            value={data.armorBlueprintLevel ?? 0}
            onValueChange={handleChange('armorBlueprintLevel')}
          />
        </div>
      </div>
    </div>
  );
};

const rarityPriorityMapping = {
  common: 0,
  uncommon: 1,
  rare: 2,
  epic: 3,
  legendary: 4,
  mythic: 5,
  titan: 6,
  angel: 7,
} as const;

export const WarMachinesList = () => {
  const warMachines = useSelector(
    gameDataStore,
    (state) => state.context.warMachines,
  );

  const getPriority = (warMachines: WarMachine) => {
    const rarityPriority = rarityPriorityMapping[warMachines.rarity] * 100_000;

    return rarityPriority * (warMachines.level ?? 0);
  };

  return (
    <div className="grid auto-rows-[130px] grid-cols-[repeat(auto-fit,130px)] gap-6">
      {sort(Object.values(warMachines), getPriority, true).map((warMachine) => (
        <WarMachineItem key={warMachine.name} warMachine={warMachine} />
      ))}
    </div>
  );
};
