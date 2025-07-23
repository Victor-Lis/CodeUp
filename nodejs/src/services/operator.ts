import prisma from "@/config/prisma";
import { NotFound } from "@/errors/not-found";
import { UpdateOperatorType } from "@/schemas/operator/update";
import { CreateOperatorType } from "@/schemas/operator/create";
import { AuthService } from "./auth";

export class OperatorService {
  static async createOperator(data: CreateOperatorType) {
    const operator = await prisma.operator.create({
      data: {
        ...data,
        password: await AuthService.hashPassword(data.password),
      },
    });
    return operator;
  }

  static async getOperators() {
    const operators = await prisma.operator.findMany();
    return operators;
  }

  static async getOperatorByUsername(username: string) {
    const operator = await prisma.operator.findUnique({
      where: { username },
    });
    if (!operator) {
      throw new NotFound("Operator not found");
    }
    return operator;
  }

  static async getOperatorById(id: number) {
    const operator = await prisma.operator.findUnique({
      where: { id },
    });
    if (!operator) {
      throw new NotFound();
    }
    return operator;
  }

  static async updateOperator(id: number, data: UpdateOperatorType) {
    const existingOperator = await prisma.operator.findFirst({
      where: { id },
    });

    const operator = await prisma.operator.update({
      where: { id },
      data: {
        ...data,
        password: data?.password
          ? await AuthService.hashPassword(data?.password)
          : existingOperator?.password,
      },
    });
    return operator;
  }
}
