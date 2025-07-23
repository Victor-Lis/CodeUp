import { env } from "@/config/env";
import prisma from "@/config/prisma";
import { InvalidCredentials } from "@/errors/invalid-credentials";
import { OperatorType } from "@/schemas/operator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export class AuthService {
  static async hashPassword(password: string) {
    return await bcrypt.hash(password, 10);
  }

  static async verifyUser(credential: string, password: string) {
    const operator = await prisma.operator.findFirst({
      where: {
        OR: [{ email: credential }, { username: credential }],
        isActive: true,
      },
    });

    if (operator && (await bcrypt.compare(password, operator.password))) {
      const { password, ...result } = operator;
      return result;
    }

    return null;
  }

  static async login(data: Omit<OperatorType, "password">) {
    const secretKey = process.env.JWT_SECRET as string;
    return jwt.sign(
      {
        user: {
          id: data.id,
          name: data.name,
          username: data.username,
          type: data.operatorType,
        },
      },
      secretKey,
      {
        expiresIn: "12h",
      }
    );
  }
}
