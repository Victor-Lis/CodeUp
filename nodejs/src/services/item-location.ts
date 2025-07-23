import prisma from "@/config/prisma";
import { NotFound } from "@/errors/not-found";
import { PaginationParamsType } from "@/schemas/_global/pagination";
import { CreateItemLocationType } from "@/schemas/item-location/create";
import { UpdateItemLocationType } from "@/schemas/item-location/update";

export class ItemLocationService {
  static async createItemLocation(data: CreateItemLocationType) {
    const location = await prisma.itemLocation.create({
      data,
    });
    return location;
  }

  static async getItemLocations(pagination: PaginationParamsType = { page: 1, pageSize: 10 }) {
    const { page = 1, pageSize = 10 } = pagination;
    const skip = (page - 1) * pageSize;

    const totalItems = await prisma.itemLocation.count();
    const locations = await prisma.itemLocation.findMany({
      skip,
      take: pageSize,
    });
    
    return {
      items: locations,
      totalItems,
      page,
      pageSize,
      totalPages: Math.ceil(totalItems / pageSize),
    }
  }

  static async getItemLocationById(id: number) {
    const location = await prisma.itemLocation.findUnique({
      where: { id },
    });
    if (!location) {
      throw new NotFound();
    }
    return location;
  }

  static async updateItemLocation(id: number, data: UpdateItemLocationType) {
    const location = await prisma.itemLocation.update({
      where: { id },
      data,
    });
    return location;
  }

  static async deleteItemLocation(id: number) {
    const location = await prisma.itemLocation.delete({
      where: { id },
    });
    return location;
  }
}
