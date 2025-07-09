import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

type CreateUserProps = {
  name: string;
  credential: string;
  password: string;
}

export class AuthService {
  static async createUser(credentials: CreateUserProps) {
    const { credential, password, name } = credentials;

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        name,
        email: credential.toLowerCase(),
        password: hashedPassword,
      },
    });
    
    return { ...user } as UserType;
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

    return { ...user } as UserType;
  }

  static async getUserByCredential(credential: string) {
    const user = await prisma.user.findUnique({
      where: {
        email: credential.toLowerCase(),
      },
    });

    if (!user) {
      return null;
    }

    return { ...user } as UserType;
  }
}