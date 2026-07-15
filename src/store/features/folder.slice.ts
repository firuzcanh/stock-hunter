import type { RootState } from "..";
import type { FolderType } from "@/types/folder.type";

import {
  createSlice,
  createEntityAdapter,
  PayloadAction,
} from "@reduxjs/toolkit";

// No sortComparer: folder order is manual (drag-and-drop sortable),
// preserved as the insertion/`ids` order.
const entityAdapter = createEntityAdapter<FolderType>();

type ExtraState = {
  activeFolderId: string | null;
};

export const folderSlice = createSlice({
  name: "folder",
  initialState: entityAdapter.getInitialState<ExtraState>({
    activeFolderId: null,
  }),
  reducers: {
    addOne(state, action: PayloadAction<FolderType>) {
      entityAdapter.addOne(state, action.payload);
      state.activeFolderId = action.payload.id;
    },

    renameOne(state, action: PayloadAction<{ id: string; name: string }>) {
      entityAdapter.updateOne(state, {
        id: action.payload.id,
        changes: { name: action.payload.name },
      });
    },

    removeOne(state, action: PayloadAction<string>) {
      entityAdapter.removeOne(state, action.payload);
      if (state.activeFolderId === action.payload) {
        state.activeFolderId = null;
      }
    },

    setActiveFolder(state, action: PayloadAction<string | null>) {
      state.activeFolderId = action.payload;
    },

    reorder(state, action: PayloadAction<string[]>) {
      // Keep only known ids, in the new order (defensive against stale drags)
      const known = new Set(state.ids as string[]);
      const next = action.payload.filter((id) => known.has(id));
      if (next.length === state.ids.length) {
        state.ids = next;
      }
    },
  },
});

export const FolderSelectors = {
  ...entityAdapter.getSelectors((state: RootState) => state.folder),
  selectActiveFolderId: (state: RootState) => state.folder.activeFolderId,
};

export const FolderActions = folderSlice.actions;
