import { env } from "@/config/env";
import prisma from "@/config/prisma";
import bcrypt from "bcrypt";

export class SeedService {
  static async createAdmin() {
    const existingAdmin = await prisma.user.findFirst({
      where: {
        username: env.ADMIN_USERNAME,
      },
    });

    // console.log("Existing admin check:", existingAdmin);
    if (existingAdmin) {
      return;
    }

    // console.log("Creating admin user...");
    await prisma.user.create({
      data: {
        username: env.ADMIN_USERNAME,
        password: await bcrypt.hash(env.ADMIN_PASSWORD, 10),
        name: "Admin",
        email: "",
        userType: "ADMIN",
      },
    });

    console.log("Admin user created successfully.");
  }
}
