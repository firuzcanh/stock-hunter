import type { TableContextType } from "./types";

import { createContext } from "react";

export const TableContext = createContext<TableContextType>(
  {} as TableContextType
);
