import { MediaType } from "@/types/media.type";
import {
  createEntityAdapter,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";

const entityAdapter = createEntityAdapter<MediaType>();

export const mediaSlice = createSlice({
  name: "media",
  initialState: entityAdapter.getInitialState(),
  reducers: {
    upsertOne(state, action: PayloadAction<MediaType>) {
      entityAdapter.upsertOne(state, action.payload);
    },

    upsertMany(state, action: PayloadAction<MediaType[]>) {
      entityAdapter.upsertMany(state, action.payload);
    },

    removeOne(state, action: PayloadAction<MediaType["id"]>) {
      entityAdapter.removeOne(state, action.payload);
    },

    removeMany(state, action: PayloadAction<MediaType["id"][]>) {
      entityAdapter.removeMany(state, action.payload);
    },

    updateOne(state, action: PayloadAction<MediaType>) {
      const { id, ...changes } = action.payload;
      entityAdapter.updateOne(state, {
        id,
        changes,
      });
    },

    updateMany(state, action: PayloadAction<MediaType[]>) {
      entityAdapter.updateMany(
        state,
        action.payload.map(({ id, ...changes }) => ({
          id,
          changes,
        }))
      );
    },
  },
});

export const MediaSelectors = entityAdapter.getSelectors();

export const MediaActions = mediaSlice.actions;
