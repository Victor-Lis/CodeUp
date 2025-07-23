import { env } from "@/config/env";
import prisma from "@/config/prisma";
import bcrypt from "bcrypt";

export class SeedService {
  static async createAdmin() {
    const existingAdmin = await prisma.operator.findFirst({
      where: {
        username: env.ADMIN_USERNAME,
      },
    });

    console.log("Existing admin check:", existingAdmin);
    if (existingAdmin) {
      return;
    }

    console.log("Creating admin operator...");
    await prisma.operator.create({
      data: {
        username: env.ADMIN_USERNAME,
        password: await bcrypt.hash(env.ADMIN_PASSWORD, 10),
        name: "Admin",
        email: "",
        operatorType: "ADMIN",
      },
    });

    console.log("Admin operator created successfully.");
  }
}
