import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export class AuthService {
  static async createUser(credentials: { credential: string; password: string }) {
    const { credential, password } = credentials;

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        email: credential.toLowerCase(),
        password: hashedPassword,
      },
    });
    
    return { ...user };
  }

  static async signIn(credentials: { credential: string; password: string }) {
    const { credential, password } = credentials;

    const user = await prisma.user.findUnique({
      where: {
        email: credential.toLowerCase(),
      },
    });

    if (!user || !user.password || !password) {
      throw new Error("Invalid credentials");
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      throw new Error("Invalid credentials");
    }

    return { ...user };
  }
}