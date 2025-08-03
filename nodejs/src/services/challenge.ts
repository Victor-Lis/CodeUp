import prisma from "@/config/prisma";
import { CreateChallengeType } from "@/schemas/challenge/create";
import { ChallengeType } from "@/schemas/challenge";
import { FilebaseService } from "./firebase";
import { NotFoundError } from "@/errors/not-found";

export class ChallengeService {
  static async getNextChallengeNumber() {
    const lastChallenge = await prisma.challenge.findFirst({
      orderBy: { id: "desc" },
    });

    return lastChallenge ? lastChallenge.id + 1 : 1;
  }

  static async getChallenges(userId: number) {
    const challenges = await prisma.challenge.findMany({
      include: {
        runs: {
          include: {
            user: true,
          },
        },
        testCases: true,
      },
      take: 10,
      orderBy: { createdAt: "desc" },
    });

    return challenges?.map((challenge: ChallengeType) => {
      const run =
        challenge?.runs?.find((r) => r.userId === userId) || null;
      
      return {
        ...challenge,
        run: run,
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
      data: {
        fileUrl: data.fileUrl,
      }
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
    const existingChallenge = await prisma.challenge.findUnique({
      where: { id },
    });

    if (!existingChallenge) {
      throw new NotFoundError("Challenge not found");
    }

    const fileDelete = await FilebaseService.deleteFile({
      fileUrl: existingChallenge?.fileUrl,
    });

    const challenge = await prisma.challenge.delete({
      where: { id },
    });

    return challenge;
  }
}
