import prisma from "@/config/prisma";
import { NotFound } from "@/errors/not-found";
import { PaginationParamsType } from "@/schemas/_global/pagination";
import { ItemType } from "@/schemas/item";
import { CreateMovementHistoryType } from "@/schemas/movement-history/create";
import { isInStock } from "@/utils/is-in-stock";

export class MovementHistoryService {
  static async CreateMovementHistory(data: CreateMovementHistoryType) {
    const movementHistory = await prisma.movementHistory.create({
      data,
    });
    return movementHistory;
  }

  static async addMovementHistory(
    item: ItemType,
    userId: number,
    previusItem?: ItemType
  ) {
    const hasDifference =
      (previusItem ? isInStock({ item: previusItem }) : !isInStock({ item })) !=
      isInStock({ item });

    if (!hasDifference) return;

    if (!isInStock({ item })) {
      MovementHistoryService.CreateMovementHistory({
        itemId: item.id,
        operatorId: userId,
        stockId: item.stockId,
        movementType: "OUT",
      });
      return;
    }

    MovementHistoryService.CreateMovementHistory({
      itemId: item.id,
      operatorId: userId,
      stockId: item.stockId,
      movementType: "IN",
    });
  }

  static async getMovementHistoriesByStockId(
    stockId: number,
    pagination: PaginationParamsType = { page: 1, pageSize: 10 },
    filters: {
      type?: "IN" | "OUT";
      startDate?: Date | number | undefined;
      endDate?: Date | number | undefined;
      query?: string;
    } = {}
  ) {
    const { page = 1, pageSize = 10 } = pagination;
    const skip = (page - 1) * pageSize;

    const where: any = {
      stockId,
      movementType: {
        in: ["IN", "OUT"].filter(
          (type) => !filters.type || type === filters.type
        ),
      },
      ...(filters.startDate || filters.endDate
        ? {
            createdAt: {
              ...(filters.startDate && { gte: filters.startDate }),
              ...(filters.endDate && { lte: filters.endDate }),
            },
          }
        : {}),
      ...(filters.query && {
        OR: [
          {
            item: {
              ...(Number.isFinite(Number(filters.query))
                ? { code: Number(filters.query) }
                : {}),
            },
          },
          {
            item: {
              itemModel: {
                name: {
                  contains: filters.query,
                  mode: "insensitive",
                },
              },
            },
          },
          {
            item: {
              itemModel: {
                category: {
                  name: {
                    contains: filters.query,
                    mode: "insensitive",
                  },
                  prefix: {
                    contains: filters.query,
                    mode: "insensitive",
                  },
                },
              },
            },
          },
          {
            operator: {
              name: {
                contains: filters.query,
                mode: "insensitive",
              },
            },
          },
        ].filter(
          (clause) => !(clause.item && Object.keys(clause.item).length === 0)
        ),
      }),
    };

    const totalItems = await prisma.movementHistory.count({ where });
    const movementHistories = await prisma.movementHistory.findMany({
      where,
      include: {
        operator: true,
        stock: true,
        item: {
          include: {
            itemModel: {
              include: {
                category: true,
              },
            },
          },
        },
      },
      orderBy: [{ createdAt: "desc" }, { id: "desc" }],
      skip,
      take: pageSize,
    });

    return {
      items: movementHistories,
      totalItems,
      page,
      pageSize,
      totalPages: Math.ceil(totalItems / pageSize),
    };
  }

  static async getMovementHistoriesByStockLocationId(
    stockLocationId: number,
    pagination: PaginationParamsType = { page: 1, pageSize: 10 }
  ) {
    const { page = 1, pageSize = 10 } = pagination;
    const skip = (page - 1) * pageSize;

    const [movementHistories, totalItems] = await Promise.all([
      prisma.movementHistory.findMany({
        where: { stock: { stockLocationId } },
        include: {
          operator: true,
          stock: true,
          item: {
            include: {
              itemModel: {
                include: {
                  category: true,
                },
              },
            },
          },
        },
        orderBy: { createdAt: "desc" },
        skip,
        take: pageSize,
      }),
      prisma.movementHistory.count({
        where: { stock: { stockLocationId } },
      }),
    ]);

    if (!movementHistories || movementHistories.length === 0) {
      throw new NotFound(
        "Movement history not found for the given stock location ID"
      );
    }

    return {
      items: movementHistories,
      totalItems,
      page,
      pageSize,
      totalPages: Math.ceil(totalItems / pageSize),
    };
  }
}
