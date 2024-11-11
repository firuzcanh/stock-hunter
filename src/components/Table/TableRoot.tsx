import type { TableRootProps } from "./types";

import { useState } from "react";
import {
  type PaginationState,
  type RowSelectionState,
  type OnChangeFn,
  useReactTable,
  getSortedRowModel,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
} from "@tanstack/react-table";
import { TableContext } from "./context";

const TableRoot: React.FC<TableRootProps> = ({
  data,
  columns,
  state,
  initialState: _initialState,
  listeners,
  children,
}) => {
  const initialState = {
    ..._initialState,
    pagination: {
      pageIndex: 0,
      pageSize: 20,
      ..._initialState?.pagination,
    },
  };

  const [pagination, setPagination] = useState<PaginationState>(
    initialState.pagination
  );
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [globalFilter, setGlobalFilter] = useState<string>("");

  const onRowSelectionChange: OnChangeFn<RowSelectionState> = (
    updaterOrValue
  ) => {
    if (!state?.rowSelection) {
      setRowSelection(updaterOrValue);
    } else {
      listeners?.onRowSelectionChange?.(updaterOrValue);
    }
  };

  const onGlobalFilterChange: OnChangeFn<string> = (updaterOrValue) => {
    if (!state?.globalFilter) {
      setGlobalFilter(updaterOrValue);
    } else {
      listeners?.onGlobalFilterChange?.(updaterOrValue);
    }
  };

  const table = useReactTable({
    data,
    columns,

    state: {
      pagination,
      rowSelection,
      globalFilter,
      ...state,
    },

    initialState,

    enableRowSelection: true,

    onRowSelectionChange,
    onGlobalFilterChange,

    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
  });

  return (
    <TableContext.Provider value={{ table }}>{children}</TableContext.Provider>
  );
};

export default TableRoot;
