import {
  ColumnDef,
  InitialTableState,
  OnChangeFn,
  RowSelectionState,
  Table,
  TableState,
} from "@tanstack/react-table";

export type TableContextType = {
  table: Table<unknown>;
};

export type TableRootProps = {
  data: any[];
  columns: ColumnDef<any, any>[];
  children: React.ReactNode;
  state?: Partial<TableState>;
  initialState?: InitialTableState;
  listeners?: {
    onRowSelectionChange?: OnChangeFn<RowSelectionState>;
    onGlobalFilterChange?: OnChangeFn<string>;
  };
};

export type TableBodyProps = {
  className?: string;
};
