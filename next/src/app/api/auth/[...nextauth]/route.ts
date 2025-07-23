import { AuthService } from "@/_services/auth";
import { jwtDecode } from "jwt-decode";
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
        if (!credentials?.username || !credentials?.password) {
          throw new Error("Username and password are required");
        }

        const user = await AuthService.signIn({
          credential: credentials?.username,
          password: credentials?.password,
        });

        return { ...user } as UserType;
      },
    }),
    // GoogleProvider({
    //   clientId: process.env.GOOGLE_CLIENT_ID || "",
    //   clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    // }),
    // // Add other providers here if needed
  ],
  pages: {
    signIn: `${process.env.NEXT_PUBLIC_BASE_URL?.replace(/\/api$/, "")}/login`,
  },
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60 * 30, // 24 horas * 30 => 30 dias
  },
  callbacks: {
    async jwt({ token, user }) {
      user && (token.user = user);
      return token;
    },
    async session({ session, token }: { session: any; token: any }) {
      if (token && token.user) {
        session.user = token.user as UserType;
      }

      session.token = token;

      return session;
    },
  },
});

export { handler as GET, handler as POST };
