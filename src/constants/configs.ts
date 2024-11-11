import { AIProvider, AIServiceOptions } from "@/types/ai.type";

export const DEFAULT_CONFIGS = {
  PLATFORM: "shutterstock",

  AI_PROVIDER: "gemini" as AIProvider,
  AI_MODEL: "gemini-pro" as AIServiceOptions["model"],

  CAN_PARAPHRASE: true,
  CAN_SHUFFLE: true,
  SHUFFLE_OFFSET: 8,
};
