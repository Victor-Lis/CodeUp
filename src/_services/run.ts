import { prisma } from "@/lib/prisma";

export class RunService {
  static async createRun(data: CreateRunType) {
    const run = await prisma.run.create({
      data
    });
    return run;
  }

  static async getRunsByChallengeId(challengeId: number) {
    const runs = await prisma.run.findMany({
      where: { challengeId },
      include: { user: true }
    });
    return runs;
  }

  static async getRunById(id: number) {
    const run = await prisma.run.findUnique({
      where: { id },
      include: { user: true }
    });
    return run;
  }

  static async updateRun(id: number, data: Partial<RunType>) {
    const run = await prisma.run.update({
      where: { id },
      data
    });
    return run;
  }

  static async deleteRun(id: number) {
    const run = await prisma.run.delete({
      where: { id }
    });
    return run;
  }
}
