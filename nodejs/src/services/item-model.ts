import prisma from "@/config/prisma";
import { NotFound } from "@/errors/not-found";
import { PaginationParamsType } from "@/schemas/_global/pagination";
import { CreateItemModelType } from "@/schemas/item-model/create";
import { UpdateItemModelType } from "@/schemas/item-model/update";

import { FirebaseImageService } from "./firebase-image";
import { FirebaseImageType } from "@/schemas/firebase-image";

export class ItemModelService {
  static async createItemModel(data: CreateItemModelType) {
    let datasheet: FirebaseImageType | null = null;
    if (data?.datasheet?.buffer) {
      datasheet = await FirebaseImageService.uploadImage({
        path: `datasheets`,
        fileData: data.datasheet.buffer,
        fileName: data.datasheet.originalname,
      });
    }

    const prismaData: {
      name: string;
      categoryId: number;
      minQuantity: number;
      description: string | null;
      observation: string | null;
      datasheet?: { connect: { id: number } };
    } = {
      name: data.name,
      categoryId: data.categoryId,
      minQuantity: data.minQuantity,
      description: data.description || null,
      observation: data.observation || null,
    };

    if (datasheet?.id) {
      prismaData.datasheet = {
        connect: { id: datasheet.id },
      };
    }

    const itemModel = await prisma.itemModel.create({
      data: prismaData,
    });
    return itemModel;
  }

  static async getItemModels() {
    const itemModels = await prisma.itemModel.findMany({
      include: {
        datasheet: true,
      },
    });
    return itemModels;
  }

  static async getItemModelsByStockAndCategoryId(
    stockId: number,
    categoryId: number,
    pagination: PaginationParamsType = { page: 1, pageSize: 10 },
    filters: {
      query?: string;
      startDate?: Date | number | undefined;
      endDate?: Date | number | undefined;
    } = {}
  ) {
    const { page = 1, pageSize = 10 } = pagination;
    const skip = (page - 1) * pageSize;

    const where: any = {
      ...(filters.query && {
        category: {
          name: {
            contains: filters.query,
            mode: "insensitive",
          },
        },
      }),
      ...((filters.query &&
        !isNaN(Number(filters.query)) && {
          minQuantity: {
            equals: Number(filters.query),
          },
        }) ||
        {}),
      ...(filters.startDate || filters.endDate
        ? {
            updatedAt: {
              ...(filters.startDate && { gte: filters.startDate }),
              ...(filters.endDate && { lte: filters.endDate }),
            },
          }
        : {}),
      categoryId,
    };

    const totalItems = await prisma.itemModel.count({ where });
    const itemModels = await prisma.itemModel.findMany({
      where,
      include: {
        _count: {
          select: {
            item: {
              where: { stockId },
            },
          },
        },
        category: true,
        datasheet: true,
      },
    });

    const response = itemModels.map(({ _count, ...model }) => ({
      ...model,
      itemsCount: _count.item,
    }));

    return {
      items: response,
      totalItems,
      page,
      pageSize,
      totalPages: Math.ceil(totalItems / pageSize),
    };
  }

  static async getItemModelById(id: number) {
    const itemModel = await prisma.itemModel.findUnique({
      where: { id },
    });
    if (!itemModel) {
      throw new NotFound("Item model not found");
    }
    return itemModel;
  }

  static async updateItemModel(id: number, data: UpdateItemModelType) {
    let datasheet: FirebaseImageType | null = null;
    if (data?.datasheet?.buffer) {
      datasheet = await FirebaseImageService.uploadImage({
        path: `datasheets`,
        fileData: data.datasheet.buffer,
        fileName: data.datasheet.originalname,
      });
    }

    const prismaData: {
      name: string | undefined;
      minQuantity: number | undefined;
      description: string | undefined;
      observation: string | undefined;
      datasheet?: { connect: { id: number } };
    } = {
      name: data.name || undefined,
      minQuantity: data.minQuantity || undefined,
      description: data.description || undefined,
      observation: data.observation || undefined,
    };

    if (datasheet?.id) {
      prismaData.datasheet = {
        connect: { id: datasheet.id },
      };
    }

    const initialItemModel = await prisma.itemModel.findUnique({
      where: { id },
      include: {
        datasheet: true,
      },
    });

    if (initialItemModel?.datasheet?.id && data?.datasheet?.buffer) {
      await FirebaseImageService.deleteImage({
        id: initialItemModel.datasheet.id,
      });
    }

    const itemModel = await prisma.itemModel.update({
      where: { id },
      data: prismaData,
    });

    return itemModel;
  }

  static async deleteItemModel(id: number) {
    const itemModelExists = await prisma.itemModel.findFirst({
      where: { id },
      include: {
        datasheet: true,
      },
    });

    if (itemModelExists?.datasheet?.id) {
      await FirebaseImageService.deleteImage({
        id: itemModelExists.datasheet.id,
      });
    }

    const itemModel = await prisma.itemModel.delete({
      where: { id },
    });
    return itemModel;
  }
}
