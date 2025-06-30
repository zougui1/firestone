'use client';

import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';

import { Table } from './Table';
import { cn } from './utils';

export function DataTable<TData, TValue>(props: DataTableProps<TData, TValue>) {
  const {
    columns,
    data,
    onHoverRow,
    getHighlightedRow,
    className,
  } = props;

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className={cn('rounded-md border', className)}>
      <Table.Root className="table-fixed">
        <Table.Header>
          {table.getHeaderGroups().map((headerGroup) => (
            <Table.Row key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <Table.Head key={header.id} {...header.column.columnDef.meta}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </Table.Head>
                )
              })}
            </Table.Row>
          ))}
        </Table.Header>

        <Table.Body>
          {table.getRowModel().rows.length ? (
            table.getRowModel().rows.map((row) => (
              <Table.Row
                key={row.id}
                data-state={row.getIsSelected() && 'selected'}
                data-highlighted={getHighlightedRow?.(row.original)}
                onMouseEnter={e => onHoverRow?.(e, row.original)}
                onMouseLeave={onHoverRow}
              >
                {row.getVisibleCells().map((cell) => (
                  <Table.Cell key={cell.id}  {...cell.column.columnDef.meta}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </Table.Cell>
                ))}
              </Table.Row>
            ))
          ) : (
            <Table.Row>
              <Table.Cell colSpan={columns.length} className="h-24 text-center">
                No results.
              </Table.Cell>
            </Table.Row>
          )}
        </Table.Body>
      </Table.Root>
    </div>
  )
}

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  onHoverRow?: (event: React.MouseEvent<HTMLTableRowElement>, data?: TData) => void;
  getHighlightedRow?: (data: TData) => boolean;
  className?: string;
}
