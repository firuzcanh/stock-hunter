import { MediaType } from "@/types/media.type";
import {
  createEntityAdapter,
  createSelector,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import store, { RootState } from "..";
import { ContentSelectors } from "./content.slice";

const entityAdapter = createEntityAdapter<MediaType>();

export const mediaSlice = createSlice({
  name: "media",
  initialState: entityAdapter.getInitialState(),
  reducers: {
    upsertOne(state, action: PayloadAction<MediaType>) {
      entityAdapter.upsertOne(state, action.payload);
    },

    upsertMany(state, action: PayloadAction<MediaType[]>) {
      console.log(action.payload);

      entityAdapter.upsertMany(state, action.payload);
    },

    removeOne(state, action: PayloadAction<MediaType["id"]>) {
      entityAdapter.removeOne(state, action.payload);
    },

    removeMany(state, action: PayloadAction<MediaType["id"][]>) {
      entityAdapter.removeMany(state, action.payload);
    },

    updateOne(state, action: PayloadAction<Partial<MediaType>>) {
      const { id, ...changes } = action.payload;
      entityAdapter.updateOne(state, {
        id: id!,
        changes,
      });
    },

    updateMany(state, action: PayloadAction<Partial<MediaType>[]>) {
      entityAdapter.updateMany(
        state,
        action.payload.map(({ id, ...changes }) => ({
          id: id!,
          changes,
        }))
      );
    },
  },
});

export const MediaSelectors = {
  ...entityAdapter.getSelectors(),

  selectMatchedsWithContents: createSelector(
    (state: RootState) => state,
    ({ content, media }) => {
      const contents = ContentSelectors.selectAll(content);
      const medias = MediaSelectors.selectAll(media);

      const matched: MediaType[] = medias.filter((media) =>
        contents.some(({ id }) => media.contentId === id)
      );

      const unmatched: MediaType[] = medias.filter(
        (media) => !contents.some(({ id }) => media.contentId === id)
      );

      return { matched, unmatched };
    }
  ),
};

export const MediaActions = {
  ...mediaSlice.actions,

  syncWithContents: () => {
    const state = store.getState();

    const medias = MediaSelectors.selectAll(state.media).filter(
      ({ contentId }) => !contentId
    );

    const changes = medias.map((media) => {
      // Get content by stockId
      const content = ContentSelectors.selectAll(state.content)?.find(
        (content) => content.stockId === media.stockId
      );

      return {
        id: media.id,
        contentId: content?.id,
        stockId: content?.stockId,
      };
    });

    return MediaActions.updateMany(changes);
  },
};
