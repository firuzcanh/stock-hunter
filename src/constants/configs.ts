import { AIProvider, AIServiceOptions } from "@/types/ai.type";
import type { ThemeMode } from "@/store/features/configs.slice";

export const DEFAULT_CONFIGS = {
  PLATFORM: "shutterstock",

  THEME: "system" as ThemeMode,
  ACCENT_COLOR: "gray",

  AI_PROVIDER: "gemini" as AIProvider,
  AI_MODEL: "gemini-pro" as AIServiceOptions["model"],

  CAN_PARAPHRASE: true,
  CAN_SHUFFLE: true,
  SHUFFLE_OFFSET: 8,

  RECOMMENDED_PARAPHRASED_TITLE_SIZE: 200,
};
