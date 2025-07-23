import prisma from "@/config/prisma";
import { NotFound } from "@/errors/not-found";
import { UpdateStockType } from "@/schemas/stock/update";
import { CreateStockType } from "@/schemas/stock/create";

export class StockService {
  static async createStock(data: CreateStockType) {
    const stock = await prisma.stock.create({
      data,
    });
    return stock;
  }

  static async getStocksByStockLocationId(stockLocationId: number) {
    const stocks = await prisma.stock.findMany({
      where: { stockLocationId },
      include: {
        stockLocation: true,
      },
    });
    return stocks;
  }

  static async getStockById(id: number) {
    const stock = await prisma.stock.findUnique({
      where: { id },
      include: {
        stockLocation: true,
        movementHistory: true,
        item: true,
      },
    });
    if (!stock) {
      throw new NotFound();
    }
    return stock;
  }

  static async updateStock(id: number, data: UpdateStockType) {
    const stock = await prisma.stock.update({
      where: { id },
      data,
    });
    return stock;
  }

  static async getLastOperationByStockId(stockId: number) {
    const stock = await prisma.stock.findUnique({
      where: { id: stockId },
      include: {
        movementHistory: {
          orderBy: { createdAt: "desc" },
          take: 1,
          include: {
            operator: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    });
    if (!stock) {
      throw new NotFound();
    }
    return stock.movementHistory[0];
  }

  static async deleteStock(id: number) {
    const stock = await prisma.stock.delete({
      where: { id },
    });
    return stock;
  }
}
