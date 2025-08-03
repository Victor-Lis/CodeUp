import prisma from "@/config/prisma";
import { NotFoundError } from "@/errors/not-found";
import { RunType } from "@/schemas/run";
import { CreateRunType } from "@/schemas/run/create";

export class RunService {
  static async getNextRunNumber() {
    const lastRun = await prisma.run.findFirst({
      orderBy: { id: "desc" },
    });

    return lastRun ? lastRun.id + 1 : 1;
  }

  static async createRun(data: CreateRunType) {
    const run = await prisma.run.create({
      data,
    });
    return run;
  }

  static async getRunById(id: number) {
    const run = await prisma.run.findUnique({
      where: { id },
      include: { challenge: { include: { testCases: true } } },
    });

    if (!run) {
      throw new NotFoundError(`Run with ID ${id} not found.`);
    }
    return run;
  }

  static async updateRun(id: number, data: Partial<RunType>) {
    const run = await prisma.run
      .update({
        where: { id },
        data: {
          approved: data.approved,
          fileUrl: data.fileUrl,
        },
      })
      .catch((error) => {
        console.error("Error updating run:", error);
      });
    return run;
  }

  // static async deleteRun(id: number) {
  //   const run = await prisma.run.delete({
  //     where: { id },
  //   });
  //   return run;
  // }
}
