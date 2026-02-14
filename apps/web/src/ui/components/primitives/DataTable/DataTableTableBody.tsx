"use client";

import { mergeProps } from "@base-ui/react";
import { flexRender, type Cell } from "@tanstack/react-table";

import { Table } from "../Table";
import { useDataTableContext, type ColumnDef } from "./context";
import { cn } from "~/ui/utils";

export interface DataTableTableBodyProps extends Table.BodyProps {
  hoverEffect?: Table.RowProps["hoverEffect"];
  borderless?: Table.RowProps["borderless"];
  slotProps?: {
    row?: Partial<Table.RowProps>;
  };
}

export const DataTableTableBody = ({
  children,
  slotProps,
  hoverEffect,
  borderless,
  ...props
}: DataTableTableBodyProps) => {
  const { table } = useDataTableContext();

  const renderCell = (cell: Cell<unknown, unknown>) => {
    const columnDef = cell.column.columnDef as ColumnDef<unknown>;

    return flexRender(columnDef.cell, cell.getContext());
  };

  const { rows } = table.getRowModel();

  if (!children && !rows.length) {
    return null;
  }

  return (
    <Table.Body {...props}>
      {children ??
        rows.map((row) => (
          <Table.Row
            key={row.id}
            data-state={row.getIsSelected() ? "selected" : undefined}
            hoverEffect={hoverEffect}
            borderless={borderless}
            {...slotProps?.row}
          >
            {row.getVisibleCells().map((cell) => {
              const columnDef = cell.column.columnDef as ColumnDef<unknown>;
              const meta = columnDef.meta ?? {};
              const cellProps = mergeProps(meta.common ?? {}, meta.cell ?? {});

              return (
                <Table.Cell
                  {...cellProps}
                  style={{
                    maxWidth: meta.width,
                    width: meta.width,
                    ...(cellProps.style as React.CSSProperties),
                  }}
                  className={cn(
                    "wrap-break-word whitespace-normal",
                    meta.common?.className,
                    meta.cell?.className,
                  )}
                  key={cell.id}
                >
                  {renderCell(cell)}
                </Table.Cell>
              );
            })}
          </Table.Row>
        ))}
    </Table.Body>
  );
};
