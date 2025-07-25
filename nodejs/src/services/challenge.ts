import prisma from "@/config/prisma";
import { NotFound } from "@/errors/not-found";
import { UpdateChallengeType } from "@/schemas/challenge/update";
import { CreateChallengeType } from "@/schemas/challenge/create";
import { AuthService } from "./auth";

export class ChallengeService {
  static async getNextChallengeNumber() {
    const lastChallenge = await prisma.challenge.findFirst({
      orderBy: { id: "desc" },
    });

    return lastChallenge ? lastChallenge.id + 1 : 1;
  }

  static async createChallenge(
    data: CreateChallengeType & { fileUrl: string }
  ) {
    const challenge = await prisma.challenge.create({
      data: {
        fileUrl: data.fileUrl,
      },
    });
    return challenge;
  }

  static async getChallenges() {
    const challenges = await prisma.challenge.findMany();
    return challenges;
  }

  static async getChallengeById(id: number) {
    const challenge = await prisma.challenge.findUnique({
      where: { id },
    });
    if (!challenge) {
      throw new NotFound();
    }
    return challenge;
  }

  static async updateChallenge(
    id: number,
    data: UpdateChallengeType & { fileUrl: string }
  ) {
    const challenge = await prisma.challenge.update({
      where: { id },
      data: {
        fileUrl: data.fileUrl,
      },
    });
    return challenge;
  }
}
