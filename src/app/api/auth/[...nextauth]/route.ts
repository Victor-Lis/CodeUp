import { prisma } from "@/lib/prisma";
import NextAuth from "next-auth";

import CredentialsProvider from "next-auth/providers/credentials";
// import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const user = await prisma.user.findUnique({
          where: {
            email: credentials?.username,
            password: credentials?.password,
          },
        });

        if (!user) {
          throw new Error("User not found");
        }

        return { ...user };
      },
    }),
    // GoogleProvider({
    //   clientId: process.env.GOOGLE_CLIENT_ID || "",
    //   clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    // }),
    // // Add other providers here if needed
  ],
  callbacks: {
    session({ session }) {
      return session; 
    },
  },
});

export { handler as GET, handler as POST };