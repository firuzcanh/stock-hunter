import { ResponseType } from "@/types/common.type";
import {
  AICompletionsType,
  AIServiceOptions,
  IAIService,
} from "@/types/ai.type";

export class ChatGPTService implements IAIService<any> {
  private apiKey: string;
  private options: AIServiceOptions;

  constructor(apiKey: string, options?: Partial<AIServiceOptions>) {
    this.apiKey = apiKey;
    this.options = { model: "gemini-pro", ...options };
  }

  async completions(
    prompt: string
  ): Promise<ResponseType<AICompletionsType<any>>> {
    console.log(">>", prompt);
    alert("ChatGPT service is not ready yet.");
    console.log(this.apiKey, this.options);
    return { data: { text: "", response: "" }, error: null, status: true };
  }

  async paraphrase(
    text: string
  ): Promise<ResponseType<AICompletionsType<any>>> {
    return await this.completions(text);
  }
}
