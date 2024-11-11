import { AIProvider, AIServiceOptions, IAIService } from "@/types/ai.type";
import { ChatGPTService } from "../ChatGPTService";
import { GeminiService } from "../GeminiService";

export class AIServiceFactory {
  static createService(
    apiKey?: string,
    provider?: AIProvider,
    options?: Partial<AIServiceOptions>
  ): IAIService {
    if (!apiKey) {
      throw new Error("apiKey doesn't provided");
    }

    switch (provider) {
      case "chatgpt":
        return new ChatGPTService(apiKey, options);
      case "gemini":
        return new GeminiService(apiKey, options);
      default:
        throw new Error("Unknown AI service type");
    }
  }
}
