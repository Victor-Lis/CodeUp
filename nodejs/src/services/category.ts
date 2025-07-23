import prisma from "@/config/prisma";
import { NotFound } from "@/errors/not-found";
import { UpdateCategoryType } from "@/schemas/category/update";
import { CreateCategoryType } from "@/schemas/category/create";
import { AuthService } from "./auth";

export class CategoryService {
  static async createCategory(data: CreateCategoryType) {
    const category = await prisma.category.create({ data });
    return category;
  }

  static async getCategories() {
    const categorys = await prisma.category.findMany({
      orderBy: { prefix: "asc" },
      include: {
        itemModel: true,
      },
    });
    return categorys;
  }

  // static async getCategoryPrefixByItemModelId(itemModelid: number) {
  //   const itemModel = await prisma.itemModel.findUnique({
  //     where: { id: itemModelId },
  //     select: { categoryId: true },
  //   });

  //   if (!itemModel) {
  //     throw new NotFound("Item model not found");
  //   }

  //   const category = await prisma.category.findUnique({
  //     where: { id: itemModel.categoryId },
  //     select: { prefix: true },
  //   });
  //   if (!category) {
  //     throw new NotFound("Category not found");
  //   }
  //   return category.prefix;
  // }

  static async getCategoryById(id: number) {
    const category = await prisma.category.findUnique({
      where: { id },
    });
    if (!category) {
      throw new NotFound();
    }
    return category;
  }

  static async updateCategory(id: number, data: UpdateCategoryType) {
    const category = await prisma.category.update({
      where: { id },
      data,
    });
    return category;
  }

  static async deleteCategory(id: number) {
    const category = await prisma.category.delete({
      where: { id },
    });
    return category;
  }
}
