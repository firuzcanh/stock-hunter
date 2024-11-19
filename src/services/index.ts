import store from "@/store";
import { AIServiceFactory } from "./AI/core/AIFactory";
import { StockServiceFactory } from "./Stock/core/StockFactory";
import { FileService } from "./File/FileService";
import { MediaService } from "./Media/MediaService";
import { AdobeStockService } from "./AdobeStock/AdobeStockService";

export const Services = {
  get AI() {
    const { configs } = store.getState();
    return AIServiceFactory.createService(
      configs.ai?.apiKey,
      configs.ai?.provider,
      { model: configs.ai?.model }
    );
  },

  get Stock() {
    return StockServiceFactory.createService("shutterstock");
  },

  File: new FileService(),

  Media: new MediaService(),

  AdobeStock: new AdobeStockService(),
};
