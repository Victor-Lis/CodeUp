import NextAuth, { AuthOptions } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { Prisma } from "../../prisma/generated/prisma";
import { AuthService } from "@/_services/auth";

export const authOptions: AuthOptions = {
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async session({ session, token }) {
      if (token && token.sub) {
        session.user.id = token.sub;
        try {
          const userFromDb = await AuthService.getUserByCredential(token.sub);

          if (userFromDb) {
            session.user.name = userFromDb.name;
            session.user.email = userFromDb.email;
            session.user.image = userFromDb.image;
            session.user.emailVerified = userFromDb.emailVerified
              ? userFromDb.emailVerified.toISOString()
              : null;
            session.user.role = userFromDb.role;
          }
        } catch (error) {
          console.error("Error fetching user for session:", error);
        }
      }

      if (token.exp) {
        session.expires = new Date(Number(token.exp) * 1000);
      }
      session.token = token as any;

      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.sub = user.id;
        token.user = {
          id: user.id,
          name: user.name,
          email: user.email,
          image: user.image,
          role: (user as any).role,
          password: null,
        };
      }
      return token;
    },
  },
  adapter: PrismaAdapter(Prisma),
  providers: [],
};

export const { handlers, auth, signIn, signOut } = NextAuth(authOptions);
