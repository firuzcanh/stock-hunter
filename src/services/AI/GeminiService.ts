import { ResponseType } from "@/types/common.type";
import {
  AICompletionsType,
  AIServiceOptions,
  IAIService,
} from "@/types/ai.type";

import { GenerativeModel, GoogleGenerativeAI } from "@google/generative-ai";

export class GeminiService implements IAIService<any> {
  private apiKey: string;
  private options: AIServiceOptions;
  private model: GenerativeModel;

  constructor(apiKey: string, options?: Partial<AIServiceOptions>) {
    this.apiKey = apiKey;
    this.options = { model: "4o", ...options };

    const genAI = new GoogleGenerativeAI(this.apiKey);
    this.model = genAI.getGenerativeModel({ model: this.options.model });
  }

  async completions(
    prompt: string
  ): Promise<ResponseType<AICompletionsType<any>>> {
    const { response } = await this.model.generateContent(prompt);
    return {
      data: { text: response.text(), response },
      error: null,
      status: true,
    };
  }

  async paraphrase(
    text: string
  ): Promise<ResponseType<AICompletionsType<any>>> {
    const length = import.meta.env.VITE_APP_MAX_TITLE_LENGTH || 200;
    const respose = await this.completions(
      `
       Follow Rules below to create new text. We have 4 rules.

       Rules:
       1. Pharaphrase and make text more understandable. 
       2. It's important to make new text using understandable and common words.
       3. Dont't keep it long. Keep max lenght up to ${length} character.
       4. Don't add any captions like pharaphrased, simplified.
       
       Text: ${text}
      `
    );

    const newText = respose.data.text.replace("**Paraphrased:**", "").trim();
    respose.data.text = newText;

    return respose;
  }
}
