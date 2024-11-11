import { ContentType } from "@/types/content.type";
import { IStockService, JSONShutterStockType } from "@/types/stock.type";

import { v4 } from "uuid";

import store from "@/store";

import { shuffleArray } from "@/utils/functions";
import { Services } from "..";

export class ShutterStockService
  implements IStockService<JSONShutterStockType>
{
  parseJSON(jsonString: string): JSONShutterStockType {
    if (!jsonString) throw new Error("JSON cannot be an empty!");
    return JSON.parse(jsonString);
  }

  async convertToContentJSON(json: JSONShutterStockType): Promise<ContentType> {
    if (!json) throw new Error("JSON cannot be an empty!");
    const { configs } = store.getState();

    let titleParaphrased = json.title;
    let keywords = json.keywords;

    if (configs.options?.canParaphrase) {
      titleParaphrased = await Services.AI.paraphrase(json.title).then(
        (res) => res.data.text
      );
    }

    if (configs.options?.canShuffle) {
      keywords = shuffleArray(json.keywords, configs.options.shuffleOffset);
    }

    return {
      id: v4(),
      stockId: json.id,
      title: json.title,
      titleParaphrased: titleParaphrased,
      description: json.description,
      keywords: keywords,
      categories: json.categories,
      status: "TODO",
      isEditorial: json.isEditorial,
      src: json.src,
      createdAt: new Date(),
    };
  }
}
