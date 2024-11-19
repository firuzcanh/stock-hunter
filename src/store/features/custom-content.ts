import { CustomContentType } from "@/types/custom-content.type";
import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 } from "uuid";
import { RootState } from "..";
import { MediaType } from "@/types/media.type";
import { MediaSelectors } from "./media.slice";

type PromptGeneratorInputType = { value: string; is_locked: boolean };

export type CustomContentstateType = {
  inputs: Array<PromptGeneratorInputType>;
  contents: CustomContentType[];
};

const initialState: CustomContentstateType = {
  inputs: [{ value: "", is_locked: false }],
  contents: [],
};

export const customContentSlice = createSlice({
  name: "customContent",
  initialState,
  reducers: {
    appendInput(state) {
      if (!state.inputs) {
        state.inputs = initialState.inputs;
      } else {
        state.inputs.push({ value: "", is_locked: false });
      }
    },

    updateInput(
      state,
      action: PayloadAction<{
        index: number;
        changes: Partial<PromptGeneratorInputType>;
      }>
    ) {
      const prev = state.inputs[action.payload.index];
      state.inputs[action.payload.index] = {
        ...prev,
        ...action.payload?.changes,
      };
    },

    clearUnlockedInputs(state) {
      state.inputs.forEach((input) => {
        if (!input.is_locked) {
          input.value = "";
        }
      });
    },

    removeOneInput(state, action: PayloadAction<number>) {
      state.inputs = state.inputs.filter(
        (_, index) => index !== action.payload
      );
    },

    appendManyContent(
      state,
      action: PayloadAction<Partial<Omit<CustomContentType, "id">>[]>
    ) {
      const newContents = action.payload?.map(
        (content) =>
          ({
            id: v4(),
            createdAt: new Date(),
            ...content,
          } as CustomContentType)
      );
      state.contents.push(...newContents);
    },

    removeOneContent(state, action: PayloadAction<string>) {
      state.contents = state.contents.filter(
        (content) => content.id !== action.payload
      );
    },

    removeAllContent(state) {
      state.contents = [];
    },
  },
});

export const CustomContentSelectors = {
  ...customContentSlice.selectors,
  selectMatchedMedias: createSelector(
    [
      (state: RootState) => state.media,
      (state: RootState) => state.customContent,
    ],
    (media, customContent) => {
      const medias: MediaType[] = MediaSelectors.selectAll(media) || [];
      const contentIds = customContent.contents?.map((content) => content.id);

      console.log({ contentIds });

      return medias.filter(
        (media) => media.contentId && contentIds.indexOf(media.contentId) !== -1
      );
    }
  ),

  selectContentsById: createSelector(
    (state: RootState) => state.customContent,
    (state) =>
      state.contents?.reduce((acc, content) => {
        acc[content.id] = content;
        return acc;
      }, {} as Record<string, CustomContentType>)
  ),
};

export const CustomContentActions = customContentSlice.actions;
