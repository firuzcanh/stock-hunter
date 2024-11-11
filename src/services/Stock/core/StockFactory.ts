import { StockProviderType } from "@/types/stock.type";
import { ShutterStockService } from "../ShutterStockService";

export class StockServiceFactory {
  static createService(provider: StockProviderType) {
    switch (provider) {
      case "shutterstock":
        return new ShutterStockService();
      default:
        throw new Error("No any content provider found!");
    }
  }
}
