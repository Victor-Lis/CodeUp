import prisma from "@/config/prisma";
import { NotFound } from "@/errors/not-found";
import { UpdateUserType } from "@/schemas/user/update";
import { CreateUserType } from "@/schemas/user/create";
import { AuthService } from "./auth";

export class UserService {
  static async createUser(data: CreateUserType) {
    const user = await prisma.user.create({
      data: {
        ...data,
        password: await AuthService.hashPassword(data.password),
      },
    });
    return user;
  }

  static async getUsers() {
    const users = await prisma.user.findMany();
    return users;
  }

  static async getUserByUsername(username: string) {
    const user = await prisma.user.findUnique({
      where: { username },
    });
    if (!user) {
      throw new NotFound("User not found");
    }
    return user;
  }

  static async getUserById(id: number) {
    const user = await prisma.user.findUnique({
      where: { id },
    });
    if (!user) {
      throw new NotFound();
    }
    return user;
  }

  static async updateUser(id: number, data: UpdateUserType) {
    const existingUser = await prisma.user.findFirst({
      where: { id },
    });

    const user = await prisma.user.update({
      where: { id },
      data: {
        ...data,
        password: data?.password
          ? await AuthService.hashPassword(data?.password)
          : existingUser?.password,
      },
    });
    return user;
  }
}
