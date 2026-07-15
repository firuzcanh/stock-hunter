import { createContext, useContext } from "react";

type ContentDrawerContextType = {
  selectedId: string | null;
  open: (id: string) => void;
  close: () => void;
};

export const ContentDrawerContext = createContext<ContentDrawerContextType>({
  selectedId: null,
  open: () => {},
  close: () => {},
});

export const useContentDrawer = () => useContext(ContentDrawerContext);
