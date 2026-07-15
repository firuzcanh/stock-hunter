import type { RootState } from "..";
import type { FolderType } from "@/types/folder.type";

import {
  createSlice,
  createEntityAdapter,
  PayloadAction,
} from "@reduxjs/toolkit";

const entityAdapter = createEntityAdapter<FolderType>({
  sortComparer: (a, b) => a.createdAt - b.createdAt,
});

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
  },
});

export const FolderSelectors = {
  ...entityAdapter.getSelectors((state: RootState) => state.folder),
  selectActiveFolderId: (state: RootState) => state.folder.activeFolderId,
};

export const FolderActions = folderSlice.actions;
