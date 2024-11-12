import type { RootState } from "..";
import type { ContentType } from "@/types/content.type";

import {
  createSlice,
  createEntityAdapter,
  PayloadAction,
  createSelector,
} from "@reduxjs/toolkit";

import { format, getTime } from "date-fns";

const entityAdapter = createEntityAdapter<ContentType>({
  sortComparer: (a, b) => getTime(b.createdAt) - getTime(a.createdAt),
});

export const contentSlice = createSlice({
  name: "content",
  initialState: entityAdapter.getInitialState(),
  reducers: {
    upsertOne(state, action: PayloadAction<ContentType>) {
      const contents = Object.values(state.entities);
      const matchedContent = contents.find(
        ({ stockId }) => stockId === action.payload.stockId
      );

      if (matchedContent) action.payload.id = matchedContent.id;

      entityAdapter.upsertOne(state, action.payload);
    },

    upsertMany(state, action: PayloadAction<ContentType[]>) {
      const contents = Object.values(state.entities);

      const payload = action.payload.map((content) => {
        const matchedContent = contents.find(
          ({ stockId }) => stockId === content.stockId
        );

        if (matchedContent) content.id = matchedContent.id;

        return content;
      });

      entityAdapter.upsertMany(state, payload);
    },

    removeOne(state, action: PayloadAction<ContentType["id"]>) {
      entityAdapter.removeOne(state, action.payload);
    },

    removeMany(state, action: PayloadAction<ContentType["id"][]>) {
      entityAdapter.removeMany(state, action.payload);
    },

    removeAll(state) {
      entityAdapter.removeAll(state);
    },

    updateOne(state, action: PayloadAction<Partial<ContentType>>) {
      const { id, ...changes } = action.payload;
      entityAdapter.updateOne(state, {
        id: id!,
        changes,
      });
    },

    updateMany(state, action: PayloadAction<Partial<ContentType>[]>) {
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

export const ContentSelectors = {
  ...entityAdapter.getSelectors(),
  selectGroupByDate: createSelector(
    (state: RootState) => state.content,
    (state) => {
      const contents = Object.values(state.entities);
      contents.reverse();

      const grouppedContents = contents.reduce((acc, content) => {
        const dateID = format(content.createdAt, "dd MMM yyyy");

        if (!acc[dateID]) {
          acc[dateID] = {
            date: dateID,
            contents: [],
          };
        }

        acc[dateID].contents.push(content);

        return acc;
      }, {} as Record<string, { date: string; contents: ContentType[] }>);

      return Object.values(grouppedContents || {});
    }
  ),
};

export const ContentActions = contentSlice.actions;
