import { env } from "@/config/env";
import prisma from "@/config/prisma";
import { InvalidCredentials } from "@/errors/invalid-credentials";
import { SignUpType } from "@/schemas/auth/sign-up";
import { UserType } from "@/schemas/user";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export class AuthService {
  static async hashPassword(password: string) {
    return await bcrypt.hash(password, 10);
  }

  static async verifyUser(credential: string, password: string) {
    const user = await prisma.user.findFirst({
      where: {
        OR: [{ email: credential }, { username: credential }],
        isActive: true,
      },
    });

    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...result } = user;
      return result;
    }

    return null;
  }

  static async login(data: Omit<UserType, "password">) {
    const secretKey = process.env.JWT_SECRET as string;
    return jwt.sign(
      {
        user: {
          id: data.id,
          name: data.name,
          username: data.username,
          type: data.userType,
        },
      },
      secretKey,
      {
        expiresIn: "30d",
      }
    );
  }

  static async createUser({ name, credential, password }: SignUpType) {
    const hashedPassword = await this.hashPassword(password);
    return await prisma.user.create({
      data: {
        name,
        username: credential,
        email: credential,
        password: hashedPassword,       
      },
    });
  }
}