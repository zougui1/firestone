'use client';

import { useSelector } from '@xstate/store/react';
import { type ColumnDef, type CellContext } from '@tanstack/react-table';
import { isEqual } from 'radash';

import { cn, DataTable, Input } from '~/components/ui';

import { handleNumberInputChange } from '~/utils';

import { gameDataStore, type ArtifactType } from '../gameData';

const handleLevelChange = (name: string, field: keyof ArtifactType['percents']) => {
  return handleNumberInputChange(value => {
    gameDataStore.trigger.updateArtifactTypes({
      name,
      data: { [field]: value },
    });
  });
}

const getPercentColumn = (percentage: keyof ArtifactType['percents']): ColumnDef<string> => {
  return {
    accessorKey: `${percentage}%`,
    header: `# of ${percentage}`,
    cell: function InputCell({ row }: CellContext<string, unknown>) {
      const name = row.original;
      const value = useSelector(gameDataStore, state => state.context.artifactTypes[name]?.percents[percentage]);

      return (
        <Input
          value={value ?? ''}
          onChange={handleLevelChange(name, percentage)}
        />
      );
    },
  };
}

const columns: ColumnDef<string>[] = [
  {
    id: 'name',
    header: 'Artifact Type',
    cell: ({ row }) => {
      return <span className="capitalize">{row.original}</span>;
    },
  },
  getPercentColumn(30),
  getPercentColumn(35),
  getPercentColumn(40),
  getPercentColumn(45),
  getPercentColumn(50),
  getPercentColumn(55),
  getPercentColumn(60),
  getPercentColumn(65),
];

export const ArtifactTypesTable = ({ className }: ArtifactTypesTableProps) => {
  const artifactTypes = useSelector(
    gameDataStore,
    state => Object.keys(state.context.artifactTypes),
    isEqual,
  );

  return (
    <DataTable
      columns={columns}
      data={artifactTypes}
      className={cn('[&_td]:p-1', className)}
    />
  );
}

export interface ArtifactTypesTableProps {
  className?: string;
}
