import prisma from "@/config/prisma";
import { TestCaseType } from "@/schemas/test-case";
import { CreateTestCaseType } from "@/schemas/test-case/create";

export class TestCaseService {
  static async createTestCase(data: CreateTestCaseType) {
    const testCase = await prisma.testCase.create({
      data,
    });
    return testCase;
  }
  static async getTestCasesByChallengeId(challengeId: number) {
    const testCases = await prisma.testCase.findMany({
      where: { challengeId },
    });
    return testCases;
  }
  // static async getTestCaseById(id: number) {
  //   const testCase = await prisma.testCase.findUnique({
  //     where: { id },
  //   });
  //   return testCase;
  // }
  static async updateTestCase(
    id: number,
    data: Partial<Omit<TestCaseType, "id" | "createdAt" | "challengeId">>
  ) {
    const testCase = await prisma.testCase.update({
      where: { id },
      data,
    });
    return testCase;
  }
  static async deleteTestCase(id: number) {
    const testCase = await prisma.testCase.delete({
      where: { id },
    });
    return testCase;
  }
}
