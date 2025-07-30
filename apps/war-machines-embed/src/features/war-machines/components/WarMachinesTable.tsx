'use client';

import { useSelector } from '@xstate/store/react';
import { type ColumnDef, type CellContext } from '@tanstack/react-table';
import { isEqual } from 'radash';

import { warMachineRarityData, type WarMachineRarity } from '@zougui/firestone.war-machines';
import { cn, DataTable, Input, Select } from '~/components/ui';

import { handleNumberInputChange } from '~/utils';

import { gameDataStore, type WarMachine } from '../gameData';

const handleLevelChange = (name: string, field: keyof WarMachine) => {
  return handleNumberInputChange(value => {
    gameDataStore.trigger.updateWarMachine({
      name,
      data: { [field]: value },
    });
  });
}

const getNumberInputColumn = (field: keyof WarMachine, label: string): ColumnDef<string> => {
  return {
    accessorKey: field,
    meta: { className: 'w-1/9' },
    header: label,
    cell: function InputCell({ row }: CellContext<string, unknown>) {
      const name = row.original;
      const value = useSelector(gameDataStore, state => state.context.warMachines[name]?.[field]);

      return (
        <Input
          value={value ?? ''}
          onChange={handleLevelChange(name, field)}
        />
      );
    },
  };
}

const columns: ColumnDef<string>[] = [
  {
    id: 'name',
    header: 'Name',
    cell: ({ row }) => {
      return <span className="capitalize">{row.original}</span>;
    },
  },
  getNumberInputColumn('level', 'Level'),
  getNumberInputColumn('sacredCardLevel', 'Sacred Card Level'),
  getNumberInputColumn('lostInscriptionLevel', 'Lost Inscription Level'),
  getNumberInputColumn('damageBlueprintLevel', 'Damage Blueprint Level'),
  getNumberInputColumn('healthBlueprintLevel', 'Health Blueprint Level'),
  getNumberInputColumn('armorBlueprintLevel', 'Armor Blueprint Level'),
  {
    accessorKey: 'rarityLevel',
    header: 'Rarity Level',
    cell: function RarityLevel({ row }) {
      const name = row.original;
      const warMachine = useSelector(gameDataStore, state => state.context.warMachines[name]);

      const handleChange = (value: string) => {
        gameDataStore.trigger.updateWarMachineRarity({
          name,
          rarity: value as WarMachineRarity,
        });
      }

      return (
        <Select.Root
          value={warMachine?.rarity ?? 'common'}
          onValueChange={handleChange}
        >
          <Select.Trigger className="w-[16ch]">
            <Select.Value />
          </Select.Trigger>

          <Select.Content className="w-[13ch]">
            {Object.keys(warMachineRarityData).map(rarity => (
              <Select.Item key={rarity} value={rarity} className="capitalize">
                {rarity}
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Root>
      );
    },
  },
];

export const WarMachinesTable = ({ className }: WarMachinesTableProps) => {
  const warMachines = useSelector(
    gameDataStore,
    state => Object.keys(state.context.warMachines),
    isEqual,
  );

  return (
    <DataTable
      columns={columns}
      data={warMachines}
      className={cn('[&_td]:p-1', className)}
    />
  );
}

export interface WarMachinesTableProps {
  className?: string;
}
