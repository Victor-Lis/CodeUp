import type { NextAuthOptions, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { jwtDecode } from "jwt-decode";

// Defina um tipo para o payload do seu token de backend
interface BackendTokenPayload {
  user: {
    id: number;
    name: string;
    username: string;
    type: string;
  };
  iat: number;
  exp: number;
}

export const nextAuthOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        credential: { label: "username", type: "text" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials): Promise<User | null> {
        try {
          const signInUrl = `${process.env.API_URL}/auth/sign-in`;
          console.log("[NextAuth] signInUrl", signInUrl);
          const response = await fetch(signInUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(credentials),
          });

          if (!response.ok) {
            console.error("[NextAuth] authorize error", response.statusText);
            return null;
          }

          const userAuth = await response.json();

          if (userAuth && userAuth.token) {
            return userAuth as User;
          }

          return null;
        } catch (error) {
          console.error("[NextAuth] authorize error", error);
          return null;
        }
      },
    }),
  ],

  pages: {
    signIn: "/login",
  },

  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 dias
  },

  callbacks: {
    async jwt({ token, user }: any) {
      // console.log("[NextAuth] JWT Callback", { token, user });
      if (user && user.token) {
        const backendToken = user.token as string;
        const decoded = jwtDecode<BackendTokenPayload>(backendToken);

        token.id = decoded.user.id;
        token.name = decoded.user.name;
        token.username = decoded.user.username;
        token.type = decoded.user.type;
        token.accessToken = backendToken;
      }

      return token;
    },

    // O callback 'session' é chamado DEPOIS do 'jwt'.
    async session({ session, token }) {
      // console.log("[NextAuth] Session Callback", { session, token });
      if (session.user && token.id) {
        session.user.id = token.id as number;
        session.user.name = token.name as string;
        session.user.username = token.username as string;
        session.user.type = token.type as string;
      }

      session.accessToken = token.accessToken as string;
      return session;
    },
  },
};
