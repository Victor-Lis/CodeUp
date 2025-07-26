import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { jwtDecode } from "jwt-decode";

export const nextAuthOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        credential: { label: "username", type: "text" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials, req) {
        try {
          // console.log("[NextAuth] authorize credentials", credentials);
          // console.log("[NextAuth] .env.API_URL", process.env.API_URL);

          const signInUrl = `${process.env.API_URL}/auth/sign-in`;
          // console.log("[NextAuth] fetch url", signInUrl);

          console.log("Crendentials to be sent:", {
            credential: credentials?.credential,
            password: credentials?.password,
          });

          const response = await fetch(signInUrl, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(credentials),
          })
            .then((res) => {
              // console.log("[NextAuth] authorize response status", res.status);
              return res;
            })
            .catch((error) => {
              console.error("[NextAuth] authorize fetch error", error);
              return null;
            });

          if (!response) {
            console.error("[NextAuth] authorize fetch failed");
            return null;
          }

          if (!response.ok) {
            console.error("[NextAuth] authorize error", response.statusText);
            return null;
          }

          const user = await response.json();

          // console.log("[NextAuth] authorize response", user);

          if (user) {
            return {
              ...user,
              sessionVersion: user.sessionVersion,
            };
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
    maxAge: 12 * 60 * 60, // 12 horas
  },
  callbacks: {
    async jwt({ token, user }: any) {
      if (user) {
        // Na primeira vez (login), salvamos os dados do 'authorize' no token do NextAuth
        token.user = user.user;
        token.accessToken = user.token;
      }
      return token;
    },
    async session({ session, token }: any) {
      // O 'token.accessToken' é a nossa fonte segura de dados, vinda do backend.
      if (token.accessToken) {
        // Decodificamos o token do backend para obter o payload.
        const decodedToken = jwtDecode<{
          user: { id: number; username: string; name: string; type: string };
        }>(token.accessToken);

        // Montamos o objeto 'user' da sessão com o formato desejado.
        session.user = {
          sub: decodedToken.user.id, // 'sub' (subject) geralmente é o ID do usuário
          username: decodedToken.user.username,
          name: decodedToken.user.name,
          type: decodedToken.user.type,
        };

        // Também passamos o token de acesso para o front-end.
        session.accessToken = token.accessToken;
      }

      return session;
    },
  },
};

// // console.log("NEXTAUTH_SECRET:", process.env.NEXTAUTH_SECRET);
