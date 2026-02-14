"use client";

import { useSelector } from "@xstate/store/react";
import { type ColumnDef, type CellContext } from "@tanstack/react-table";
import { isEqual } from "radash";

import { cn, DataTable, Input, NumberField } from "~/ui";

import { handleNumberInputChange } from "~/utils";

import { gameDataStore, type ArtifactType } from "../gameData";
import {
  artifactTypeBaseData,
  type ArtifactRarity,
} from "@zougui/firestone.war-machines";
import { useState } from "react";
import { useTRPC } from "~/utils/trpc";
import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";

const handleLevelChange = (
  name: string,
  field: keyof ArtifactType["percents"],
) => {
  return handleNumberInputChange((value) => {
    gameDataStore.trigger.updateArtifactTypes({
      name,
      data: { [field]: value },
    });
  });
};

const getPercentColumn = (
  rarity: ArtifactRarity,
): ColumnDef<"damage" | "health" | "armor"> => {
  const percentage = artifactTypeBaseData.toPercent[rarity];

  return {
    accessorKey: `${percentage}%`,
    header: `# of ${percentage}`,
    cell: function InputCell({ row }) {
      const attribute = row.original;
      const [tempData, setTempData] = useState<number | undefined>();

      const trpc = useTRPC();
      const queryClient = useQueryClient();

      const { data } = useSuspenseQuery(
        trpc.artifact.findAll.queryOptions(undefined, {
          select: (artifacts) =>
            artifacts.find((a) => a.attribute === attribute)?.items[rarity],
        }),
      );

      const updateArtifact = useMutation(
        trpc.artifact.updateOne.mutationOptions({
          onSuccess: async () => {
            await queryClient.invalidateQueries(trpc.artifact.pathFilter());
          },
        }),
      );

      const displayValue = (tempData ?? data) || null;

      return (
        <NumberField.Root
          value={displayValue}
          onValueChange={(value) => {
            const fallbackValue = displayValue === null ? 1 : 0;
            setTempData(value || fallbackValue);
          }}
          onBlur={() => {
            if (tempData !== undefined) {
              updateArtifact.mutate({
                attribute,
                rarity,
                count: tempData,
              });
            }
          }}
        >
          <NumberField.Input />
        </NumberField.Root>
      );
    },
  };
};

const columns: ColumnDef<"damage" | "health" | "armor">[] = [
  {
    id: "name",
    header: "Artifact Type",
    cell: ({ row }) => {
      return <span className="capitalize">{row.original}</span>;
    },
  },
  getPercentColumn("epic"),
  getPercentColumn("legendary"),
  getPercentColumn("mythic"),
  getPercentColumn("titan"),
  getPercentColumn("angel"),
  getPercentColumn("celestial"),
  getPercentColumn("immortal"),
  getPercentColumn("primordial"),
];

export const ArtifactTypesTable = ({ className }: ArtifactTypesTableProps) => {
  return (
    <DataTable.Root
      columns={columns}
      data={["damage", "health", "armor"]}
      className={cn("[&_td]:p-1 max-w-[800px]", className)}
      getRowId={(row) => row}
    >
      <DataTable.Viewport>
        <DataTable.Table>
          <DataTable.TableHeader sticky />
          <DataTable.TableBody hoverEffect="highlight" />
          <DataTable.TableEmpty />
        </DataTable.Table>
      </DataTable.Viewport>
    </DataTable.Root>
  );
};

export interface ArtifactTypesTableProps {
  className?: string;
}
