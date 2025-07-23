import prisma from "@/config/prisma";
import { NotFound } from "@/errors/not-found";
import { CreateItemType } from "@/schemas/item/create";
import { UpdateItemType } from "@/schemas/item/update";
import { MovementHistoryService } from "./movement-history";
import { isInStockWhere } from "@/utils/is-in-stock";
import { PaginationParamsType } from "@/schemas/_global/pagination";
import { MaintenanceStatusEnum } from "@/schemas/_enums/maintenance-status";

export class ItemService {
  static async countItemsByStockId(stockId: number) {
    const count = await prisma.item.count({
      where: {
        stockId,
        AND: isInStockWhere, // Ensure the item is in stock
      },
    });
    return count;
  }

  static async getNextItemCodeByItemModelId(itemModelId: number) {
    const itemModel = await prisma.itemModel.findUnique({
      where: { id: itemModelId },
      select: { categoryId: true },
    });

    if (!itemModel) {
      throw new NotFound("Item model not found");
    }

    const count = await prisma.item.count({
      where: { itemModel: { categoryId: itemModel.categoryId } },
    });

    return count + 1;
  }

  static async createItem(data: CreateItemType, userId: number) {
    const code = await ItemService.getNextItemCodeByItemModelId(
      data.itemModelId
    );

    const item = await prisma.item.create({
      data: {
        ...data,
        code,
      },
    });

    if (!item) {
      throw new NotFound("Item not created");
    }

    await MovementHistoryService.addMovementHistory(item, userId);

    return item;
  }

  static async createItems(
    data: CreateItemType,
    quantity: number,
    userId: number
  ) {
    if (quantity <= 0) {
      throw new Error("Quantity must be greater than 0");
    }

    const code = await ItemService.getNextItemCodeByItemModelId(
      data.itemModelId
    );

    const itemsCreateResult = await prisma.item.createMany({
      data: Array.from({ length: quantity }, (_, index) => ({
        ...data,
        code: code + index,
        itemModelId: data.itemModelId,
      })),
    });

    if (!itemsCreateResult || itemsCreateResult.count === 0) {
      throw new NotFound("Items not created");
    }

    // Fetch the created items to get all required properties
    const createdItems = await prisma.item.findMany({
      where: {
        itemModelId: data.itemModelId,
        code: {
          gte: code,
          lte: code + quantity - 1,
        },
      },
    });

    if (!createdItems || createdItems.length === 0) {
      throw new NotFound("No items were created");
    }

    // Add movement history for each created item
    for (const item of createdItems) {
      await MovementHistoryService.addMovementHistory(item, userId);
    }

    return createdItems;
  }

  static async getItems({ page = 1, pageSize = 10 }: PaginationParamsType) {
    const skip = (page - 1) * pageSize;
    const [items, totalItems] = await Promise.all([
      prisma.item.findMany({
        skip,
        take: pageSize,
        include: {
          itemModel: {
            include: {
              category: true,
            },
          },
        },
      }),
      prisma.item.count(),
    ]);

    if (!items || items.length === 0) {
      throw new NotFound("No items found");
    }

    return {
      items,
      totalItems,
      page,
      pageSize,
      totalPages: Math.ceil(totalItems / pageSize),
    };
  }

  static async getItemsByCategoryId(categoryId: number) {
    const items = await prisma.item.findMany({
      where: { itemModel: { categoryId: categoryId } },
      include: {
        itemModel: true,
      },
    });

    if (!items || items.length === 0) {
      throw new NotFound("No items found for this category");
    }

    return items;
  }

  static async getItemsByCategoryAndStockId(
    stockId: number,
    categoryId: number,
    pagination: PaginationParamsType = { page: 1, pageSize: 10 },
    filters: {
      status?:
        | "IN_STOCK"
        | "IN_USE"
        | "IN_REPAIR"
        | "OUT_OF_SERVICE"
        | "SOLD"
        | "BROKEN"
        | undefined;
      startDate?: Date | number | undefined;
      endDate?: Date | number | undefined;
      query?: string;
    } = {}
  ) {
    const { page = 1, pageSize = 10 } = pagination;
    const skip = (page - 1) * pageSize;

    const where: any = {
      stockId,
      itemModel: { categoryId },
      ...(filters.status
        ? {
            maintenanceStatus: {
              in: [filters.status],
            },
          }
        : {}),
      ...(filters.startDate || filters.endDate
        ? {
            updatedAt: {
              ...(filters.startDate && { gte: filters.startDate }),
              ...(filters.endDate && { lte: filters.endDate }),
            },
          }
        : {}),
      ...(filters.query && {
        OR: [
          {
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
          {
            technician: {
              name: {
                contains: filters.query,
                mode: "insensitive",
              },
            },
          },
          {
            itemLocation: {
              name: {
                contains: filters.query,
                mode: "insensitive",
              },
            },
          },
          {
            code: {
              equals: Number(filters.query),
            },
          },
        ],
      }),
    };

    const totalItems = await prisma.item.count({ where });
    const items = await prisma.item.findMany({
      where,
      include: {
        itemLocation: true,
        itemModel: {
          include: {
            category: true,
          },
        },
        // movementHistory: true,
        technician: true,
        stock: true,
      },
      orderBy: [{ updatedAt: "desc" }, { id: "desc" }],
      skip,
      take: pageSize,
    });

    return {
      items,
      totalItems,
      page,
      pageSize,
      totalPages: Math.ceil(totalItems / pageSize),
    };
  }

  static async getItemById(id: number) {
    const item = await prisma.item.findUnique({
      where: { id },
      include: {
        itemModel: {
          include: {
            category: true,
            datasheet: true,
          },
        },
        itemLocation: true,
        technician: true,
        stock: true,
      },
    });
    if (!item) {
      throw new NotFound("Item  not found");
    }
    return item;
  }

  static async updateItem(id: number, data: UpdateItemType, userId: number) {
    const previusItem = await prisma.item.findUnique({
      where: { id },
    });

    if (!previusItem) {
      throw new NotFound("Item not found");
    }

    const item = await prisma.item.update({
      where: { id },
      data: data,
    });

    if (!item) {
      throw new NotFound("Item not found");
    }

    await MovementHistoryService.addMovementHistory(item, userId, previusItem);

    return item;
  }

  static async deleteItem(id: number) {
    const item = await prisma.item.delete({
      where: { id },
    });
    return item;
  }
}
