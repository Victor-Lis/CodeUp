import prisma from "@/config/prisma";
import { NotFound } from "@/errors/not-found";
import { CreateStockLocationType } from "@/schemas/stock-location/create";
import { UpdateStockLocationType } from "@/schemas/stock-location/update";

export class StockItemLocationService {
  static async createStockLocation(data: CreateStockLocationType) {
    const stockLocation = await prisma.stockLocation.create({
      data,
    });
    return stockLocation;
  }

  static async getStockLocations() {
    const stockLocations = await prisma.stockLocation.findMany();
    return stockLocations;
  }

  static async getStockLocationById(id: number) {
    const stockLocation = await prisma.stockLocation.findUnique({
      where: { id },
    });
    if (!stockLocation) {
      throw new NotFound("Stock location not found");
    }
    return stockLocation;
  }

  static async updateStockLocation(id: number, data: UpdateStockLocationType) {
    const stockLocation = await prisma.stockLocation.update({
      where: { id },
      data,
    });
    return stockLocation;
  }

  static async deleteStockLocation(id: number) {
    const stockLocation = await prisma.stockLocation.delete({
      where: { id },
    });
    return stockLocation;
  }
}
