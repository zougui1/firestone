"use client";

import { useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  type RowData,
  type SortingState,
  getSortedRowModel,
  type RowSelectionState,
  type Row,
} from "@tanstack/react-table";

import { DataTableProvider, type DataTableContextValue } from "./context";
import { Table } from "../Table";

export interface DataTableRootProps<
  TData extends RowData = RowData,
  TValue = unknown,
>
  extends Table.RootProps, Omit<DataTableContextValue<TData, TValue>, "table"> {
  getRowId: (row: TData, index: number, parent?: Row<TData>) => string;
}

export function DataTableRoot<
  TData extends RowData = RowData,
  TValue = unknown,
>({ data, columns, getRowId, ...props }: DataTableRootProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [selection, setSelection] = useState<RowSelectionState>({
    [data[2]?.invoice]: true,
  });

  const table = useReactTable({
    data,
    columns,
    getRowId,

    getCoreRowModel: getCoreRowModel(),

    manualSorting: false,
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    enableSortingRemoval: true,

    enableRowSelection: true,
    onRowSelectionChange: setSelection,

    state: {
      sorting,
      rowSelection: selection,
    },
  });

  return (
    <DataTableProvider
      value={{
        data,
        columns,
        table,
      }}
    >
      <Table.Root {...props} />
    </DataTableProvider>
  );
}
