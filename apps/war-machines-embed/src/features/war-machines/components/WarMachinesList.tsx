import { useSelector } from "@xstate/store/react";
import { sort } from 'radash';
import { cva } from "class-variance-authority"
import { MinusIcon, PlusIcon } from 'lucide-react';

import { warMachineRarityData } from "@zougui/firestone.war-machines";

import { Badge, Button, HoverCard, Input, Select } from "~/components/ui";

import { gameDataStore, type WarMachine } from "../gameData";
import { useState } from "react";

const rarityVariants = cva('rounded-sm select-none size-full grid cursor-pointer place-content-between', {
  variants: {
    rarity: {
      locked: 'bg-gray-500 opacity-40',
      common: 'bg-yellow-900',
      uncommon: 'bg-green-700',
      rare: 'bg-blue-800',
      epic: 'bg-purple-800',
      legendary: 'bg-orange-700',
      mythic: 'bg-cyan-500',
      titan: 'bg-yellow-500',
      angel: 'bg-red-600',
    },
  },

  defaultVariants: {
    rarity: 'common',
  },
});

interface LevelBadgeProps {
  icon: React.ReactNode;
  value: number;
  onValueChange: (value: number) => void;
}

const LevelBadge = ({ icon, value, onValueChange }: LevelBadgeProps) => {
  return (
    <HoverCard.Root openDelay={200} closeDelay={50}>
      <HoverCard.Trigger asChild>
        <Badge className="group font-bold w-fit">
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
          onChange={e => onValueChange(Number(e.currentTarget.value))}
        />
        </div>
      </HoverCard.Content>
    </HoverCard.Root>
  );
}

const WarMachineItem = ({ warMachine }: { warMachine: WarMachine }) => {
  const [tempData, setTempData] = useState<Partial<WarMachine> | undefined>();

  const getRarity = () => {
    if (warMachine.level) return warMachine.rarity;
    return 'locked';
  }

  const rarity = getRarity();

  const handleChange = (field: keyof WarMachine) => (value: string | number) => {
    setTempData(prevData => ({
      ...prevData,
      [field]: value,
    }));
  }

  const onActiveChange = (active: boolean) => {
    if (active || !tempData) return;

    setTimeout(() => {
      gameDataStore.trigger.updateWarMachine({
        name: warMachine.name,
        data: tempData
      });
    }, 200);
  }

  const data = {
    level: 0,
    ...warMachine,
    ...tempData,
  } as Required<WarMachine>;

  return (
    <div className={rarityVariants({ rarity })} onMouseLeave={() => onActiveChange(false)}>
      <img
        className="size-full p-2 col-[1_/_2] row-[1_/_2]"
        src={`/war-machines/${warMachine.name}.webp`}
        alt={warMachine.name}
      />

      <div className="flex justify-between col-[1_/_2] row-[1_/_2] p-0.5">
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
            <Badge className="group font-bold overflow-hidden w-fit p-0!">
              <Select.Trigger className="px-1.5 py-0! h-auto!">
                <Select.Value>R</Select.Value>
              </Select.Trigger>
            </Badge>

            <Select.Content className="w-[13ch]">
              {Object.keys(warMachineRarityData).map(rarity => (
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
}

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
  const warMachines = useSelector(gameDataStore, state => state.context.warMachines);

  const getPriority = (warMachines: WarMachine) => {
    const rarityPriority = rarityPriorityMapping[warMachines.rarity] * 100_000;

    return rarityPriority * (warMachines.level ?? 0);
  }

  return (
    <div className="grid grid-cols-[repeat(auto-fit,130px)] auto-rows-[130px] gap-6">
      {sort(Object.values(warMachines), getPriority, true).map(warMachine => (
        <WarMachineItem key={warMachine.name} warMachine={warMachine} />
      ))}
    </div>
  );
}
