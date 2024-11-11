import store from "@/store";
import { AIServiceFactory } from "./AI/core/AIFactory";
import { StockServiceFactory } from "./Stock/core/StockFactory";

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
};
