import { prisma } from "@/lib/prisma";

export class ChallengeService {
  static async getChallenges(userId: string) {
    const challenges = await prisma.challenge.findMany({
      include: {
        runs: {
          include: {
            user: true, 
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return challenges.map((challenge) => {
      const run = challenge.runs.find((r) => r.userId === userId) || null;
      const otherRuns = challenge.runs.filter((r) => r.userId !== userId);

      return {
        ...challenge,
        run,
        runs: otherRuns,
      };
    });
  }

  static async getChallengeById(id: number) {
    const challenge = await prisma.challenge.findUnique({
      where: { id },
      include: { runs: true },
    });
    return challenge;
  }

  static async createChallenge(data: CreateChallengeType) {
    const challenge = await prisma.challenge.create({
      data,
    });
    return challenge;
  }

  static async updateChallenge(id: number, data: Partial<CreateChallengeType>) {
    const challenge = await prisma.challenge.update({
      where: { id },
      data,
    });
    return challenge;
  }

  static async deleteChallenge(id: number) {
    const challenge = await prisma.challenge.delete({
      where: { id },
    });
    return challenge;
  }
}
