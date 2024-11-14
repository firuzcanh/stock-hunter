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

  getCategories(): { label: string; value: string }[] {
    return [
      { label: "Transportation", value: "0" },
      { label: "Animals/Wildlife", value: "1" },
      { label: "Buildings/Landmarks", value: "2" },
      { label: "Backgrounds/Textures", value: "3" },
      { label: "Business/Finance", value: "4" },
      { label: "Education", value: "5" },
      { label: "Food and Drink", value: "6" },
      { label: "Healthcare/Medical", value: "7" },
      { label: "Holidays", value: "8" },
      { label: "Objects", value: "9" },
      { label: "Industrial", value: "10" },
      { label: "Nature", value: "12" },
      { label: "People", value: "13" },
      { label: "Religion", value: "14" },
      { label: "Science", value: "15" },
      { label: "Technology", value: "16" },
      { label: "Signs/Symbols", value: "17" },
      { label: "Sports/Recreation", value: "18" },
      { label: "Interiors", value: "21" },
      { label: "Vintage", value: "24" },
      { label: "Parks/Outdoor", value: "25" },
      { label: "Abstract", value: "26" },
      { label: "Beauty/Fashion", value: "27" },
    ];
  }
}
