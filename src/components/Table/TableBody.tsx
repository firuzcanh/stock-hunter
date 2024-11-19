import type { TableBodyProps } from "./types";

import { useContext } from "react";
import { flexRender } from "@tanstack/react-table";
import { Table } from "@radix-ui/themes";
import { twMerge } from "tailwind-merge";

import { TableContext } from "./context";

const TableBody: React.FC<TableBodyProps> = ({ className }) => {
  const { table } = useContext(TableContext);

  return (
    <Table.Root className={twMerge("w-full", className)} variant="surface">
      <Table.Header>
        {table.getHeaderGroups().map((headerGroup) => (
          <Table.Row key={headerGroup.id}>
            {headerGroup.headers.map((header) => {
              const headerContent = header.isPlaceholder
                ? null
                : flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  );

              return (
                <Table.ColumnHeaderCell
                  key={header.id}
                  colSpan={header.colSpan}
                  style={{ width: header.getSize() }}
                >
                  {headerContent}
                </Table.ColumnHeaderCell>
              );
            })}
          </Table.Row>
        ))}
      </Table.Header>

      <Table.Body>
        {table.getRowModel().rows.map((row) => (
          <Table.Row key={row.id} align="center">
            {row.getVisibleCells().map((cell) => (
              <Table.Cell
                key={cell.id}
                style={{
                  width: cell.column.getSize(),
                }}
              >
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </Table.Cell>
            ))}
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
};

export default TableBody;
