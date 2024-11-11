import { ContentCategoryType, ContentType } from "./content.type";

export interface IStockService<TJson = any> {
  parseJSON(jsonString: string): TJson;
  convertToContentJSON(json: TJson): Promise<ContentType>;
}

export type StockProviderType = "shutterstock";

export type JSONShutterStockType = {
  id: string;
  title: string;
  description: string;
  keywords: string[];
  isEditorial: false;
  categories: ContentCategoryType[];
  src: string;
  status: number;
};
