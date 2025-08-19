'use client';

import { useSelector } from '@xstate/store/react';
import { type ColumnDef, type CellContext } from '@tanstack/react-table';
import { isEqual } from 'radash';

import { cn, DataTable, Input } from '~/components/ui';

import { handleNumberInputChange } from '~/utils';

import { gameDataStore, type CrewHero } from '../gameData';

const handleLevelChange = (name: string, field: keyof CrewHero) => {
  return handleNumberInputChange(value => {
    gameDataStore.trigger.updateCrewHero({
      name,
      data: { [field]: value },
    });
  });
}

const getNumberInputColumn = (field: keyof CrewHero, label: string): ColumnDef<string> => {
  return {
    accessorKey: field,
    header: label,
    cell: function InputCell({ row }: CellContext<string, unknown>) {
      const name = row.original;
      const value = useSelector(gameDataStore, state => state.context.crewHeroes[name]?.[field]);

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
  getNumberInputColumn('attributeDamage', 'Damage'),
  getNumberInputColumn('attributeHealth', 'Health'),
  getNumberInputColumn('attributeArmor', 'Armor'),
];

export const HeroesTable = ({ className }: HeroesTableProps) => {
  const heroes = useSelector(
    gameDataStore,
    state => Object.keys(state.context.crewHeroes),
    isEqual,
  );

  return (
    <DataTable
      columns={columns}
      data={heroes}
      className={cn('[&_td]:p-1 max-h-[500px] overflow-y-auto', className)}
    />
  );
}

export interface HeroesTableProps {
  className?: string;
}
