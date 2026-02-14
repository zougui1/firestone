"use client";

import { mergeProps } from "@base-ui/react";
import { flexRender, type Header } from "@tanstack/react-table";
import { ArrowDown, ArrowUp, ArrowUpDown } from "lucide-react";

import { useDataTableContext, type ColumnDef } from "./context";
import { Table } from "../Table";

export interface DataTableTableHeaderProps extends Table.HeaderProps {}

export const DataTableTableHeader = ({
  children,
  borderless,
  ...props
}: DataTableTableHeaderProps) => {
  const { table } = useDataTableContext();

  const renderHeader = (header: Header<unknown, unknown>) => {
    if (header.isPlaceholder) return;

    const { column } = header;
    const columnDef = column.columnDef as ColumnDef<unknown>;
    const content = flexRender(columnDef.header, header.getContext());
    const isSorted = column.getIsSorted();

    const renderSortIcon = () => {
      if (isSorted === "asc") {
        return <ArrowUp data-slot="sort-icon" className="size-5" />;
      }

      if (isSorted === "desc") {
        return <ArrowDown data-slot="sort-icon" className="size-5" />;
      }

      if (columnDef.enableSorting) {
        return (
          <ArrowUpDown
            data-slot="sortable-icon"
            className="hidden size-5 group-hover:inline-block"
          />
        );
      }
    };

    return (
      <button
        className="group inline-flex items-center gap-2"
        onClick={() => column.toggleSorting()}
      >
        {content}
        {renderSortIcon()}
      </button>
    );
  };

  return (
    <Table.Header {...props} borderless={borderless}>
      {children ?? (
        <>
          {table.getHeaderGroups().map((group) => (
            <Table.Row key={group.id} borderless={borderless}>
              {group.headers.map((header) => {
                const columnDef = header.column.columnDef as ColumnDef<unknown>;
                const meta = columnDef.meta ?? {};
                const headerProps = mergeProps(
                  meta.common ?? {},
                  meta.header ?? {},
                );

                return (
                  <Table.Head
                    key={header.id}
                    {...headerProps}
                    style={{
                      width: meta.width,
                      ...(headerProps.style as React.CSSProperties),
                    }}
                  >
                    {renderHeader(header)}
                  </Table.Head>
                );
              })}
            </Table.Row>
          ))}
        </>
      )}
    </Table.Header>
  );
};
