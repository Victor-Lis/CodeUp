import prisma from "@/config/prisma";
import { NotFound } from "@/errors/not-found";
import { UpdateTechnicianType } from "@/schemas/technician/update";
import { CreateTechnicianType } from "@/schemas/technician/create";
import { PaginationParamsType } from "@/schemas/_global/pagination";

export class TechnicianService {
  static async createTechnician(data: CreateTechnicianType) {
    const technician = await prisma.technician.create({
      data,
    });
    return technician;
  }

  static async getTechnicians(pagination: PaginationParamsType = { page: 1, pageSize: 10 }) {
    const { page = 1, pageSize = 10 } = pagination;
    const skip = (page - 1) * pageSize;

    const totalItems = await prisma.technician.count();
    const technicians = await prisma.technician.findMany({
      skip,
      take: pageSize,
    });

    return {
      items: technicians,
      totalItems,
      page,
      pageSize,
      totalPages: Math.ceil(totalItems / pageSize),
    };
  }

  static async getTechnicianById(id: number) {
    const technician = await prisma.technician.findUnique({
      where: { id },
      include: {
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
    });
    if (!technician) {
      throw new NotFound();
    }
    return technician;
  }

  static async updateTechnician(id: number, data: UpdateTechnicianType) {
    const technician = await prisma.technician.update({
      where: { id },
      data,
    });
    return technician;
  }

  static async deleteTechnician(id: number) {
    const technician = await prisma.technician.delete({
      where: { id },
    });
    return technician;
  }
}
