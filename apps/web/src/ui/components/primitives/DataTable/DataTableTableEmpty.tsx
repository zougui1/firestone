"use client";

import { Table } from "../Table";
import { useDataTableContext } from "./context";

export interface DataTableTableEmptyProps extends Table.BodyProps {
  hoverEffect?: Table.RowProps["hoverEffect"];
  borderless?: Table.RowProps["borderless"];
  slotProps?: {
    row?: Partial<Table.RowProps>;
  };
}

export const DataTableTableEmpty = ({
  children,
  slotProps,
  borderless,
  ...props
}: DataTableTableEmptyProps) => {
  const { table } = useDataTableContext();
  const { rows } = table.getRowModel();

  if (rows.length) {
    return null;
  }

  return (
    <Table.Body {...props}>
      {children ?? (
        <Table.Row borderless={borderless} {...slotProps?.row}>
          <Table.Cell
            colSpan={table.getAllColumns().length}
            className="py-6 text-base font-medium"
          >
            No data
          </Table.Cell>
        </Table.Row>
      )}
    </Table.Body>
  );
};
