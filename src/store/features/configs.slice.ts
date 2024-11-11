import { AIMergedModel, AIProvider } from "@/types/ai.type";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { DEFAULT_CONFIGS } from "@/constants/configs";

import { AI_MODELS } from "@/constants/data";

type ConfigsStateType = {
  platform: string;

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
