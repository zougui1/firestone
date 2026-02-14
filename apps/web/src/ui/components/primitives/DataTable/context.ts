"use client";

import { createContext, useContext } from "react";
import {
  type ColumnDef as TanstackColumnDef,
  type RowData,
  type Table,
} from "@tanstack/react-table";

export type ColumnDef<
  TData extends RowData,
  TValue = unknown,
> = TanstackColumnDef<TData, TValue> & {
  meta?: {
    width?: React.CSSProperties["width"];
    common?: React.HTMLAttributes<HTMLElement>;
    header?: React.HTMLAttributes<HTMLElement>;
    cell?: React.HTMLAttributes<HTMLElement>;
  };
  loading?: boolean;
  skeleton?: React.ReactNode;
};

export interface DataTableContextValue<
  TData extends RowData,
  TValue = unknown,
> {
  data: TData[];
  columns: ColumnDef<TData, TValue>[];
  table: Table<TData>;
}

const DataTableContext = createContext<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  DataTableContextValue<any, any> | undefined
>(undefined);

export const DataTableProvider = DataTableContext.Provider;

export const useDataTableContext = () => {
  const context = useContext(DataTableContext);

  if (!context) {
    throw new Error("You must use DataTable inside a DataTable.Root component");
  }

  return context;
};
