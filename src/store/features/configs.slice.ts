import { AIMergedModel, AIProvider } from "@/types/ai.type";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { DEFAULT_CONFIGS } from "@/constants/configs";

import { AI_MODELS } from "@/constants/data";

export type ThemeMode = "light" | "dark" | "system";
export type ContentsViewMode = "grid" | "list";

type ConfigsStateType = {
  platform: string;

  appearance: {
    theme: ThemeMode;
    accentColor: string;
  };

  contents: {
    viewMode: ContentsViewMode;
    gridColumns: number;
  };

  ai: {
    provider: AIProvider;
    model: AIMergedModel;
    apiKey: string | undefined;
  };

  options: Partial<{
    canParaphrase: boolean;
    canShuffle: boolean;
    shuffleOffset: number;
  }>;
};

const initialState: ConfigsStateType = {
  platform: DEFAULT_CONFIGS.PLATFORM,

  appearance: {
    theme: DEFAULT_CONFIGS.THEME,
    accentColor: DEFAULT_CONFIGS.ACCENT_COLOR,
  },

  contents: {
    viewMode: DEFAULT_CONFIGS.CONTENTS_VIEW,
    gridColumns: DEFAULT_CONFIGS.GRID_COLUMNS,
  },

  ai: {
    provider: DEFAULT_CONFIGS.AI_PROVIDER,
    model: DEFAULT_CONFIGS.AI_MODEL,
    apiKey: undefined,
  },

  options: {
    canParaphrase: DEFAULT_CONFIGS.CAN_PARAPHRASE,
    canShuffle: DEFAULT_CONFIGS.CAN_SHUFFLE,
    shuffleOffset: DEFAULT_CONFIGS.SHUFFLE_OFFSET,
  },
};

export const configsSlice = createSlice({
  name: "configs",
  initialState,
  reducers: {
    setPlatform(state, action: PayloadAction<string>) {
      state.platform = action.payload;
    },

    setTheme(state, action: PayloadAction<ThemeMode>) {
      state.appearance.theme = action.payload;
    },

    setAccentColor(state, action: PayloadAction<string>) {
      state.appearance.accentColor = action.payload;
    },

    setContentsViewMode(state, action: PayloadAction<ContentsViewMode>) {
      state.contents.viewMode = action.payload;
    },

    setContentsGridColumns(state, action: PayloadAction<number>) {
      state.contents.gridColumns = action.payload;
    },

    setAIProvider(state, action: PayloadAction<AIProvider>) {
      state.ai.provider = action.payload;
      state.ai.model = AI_MODELS[action.payload]?.[0]?.value as AIMergedModel;
    },

    setAIModel(state, action: PayloadAction<AIMergedModel>) {
      state.ai.model = action.payload;
    },

    setAIApiKey(state, action: PayloadAction<string>) {
      state.ai.apiKey = action.payload;
    },

    setOptions(state, action: PayloadAction<ConfigsStateType["options"]>) {
      state.options = {
        ...state.options,
        ...action.payload,
      };
    },
  },
});

export const ConfigActions = configsSlice.actions;
