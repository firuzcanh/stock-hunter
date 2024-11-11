import { ResponseType } from "./common.type";

export interface IAIService<TResponse = any> {
  completions: (
    prompt: string,
    options?: any
  ) => Promise<ResponseType<TResponse>>;

  paraphrase: (
    text: string,
    options?: any
  ) => Promise<ResponseType<AICompletionsType<TResponse>>>;
}

export type AIProvider = "chatgpt" | "gemini";

export type AIGeminiModel = "gemini-1.5-flash" | "gemini-pro";
export type AIChatGPTModel = "4o";
export type AIMergedModel = AIGeminiModel | AIChatGPTModel;

export type AIServiceOptions<TModel = AIMergedModel> = {
  model: TModel;
};

export type AICompletionsType<TResponse = any> = {
  text: string;
  response: TResponse;
};
