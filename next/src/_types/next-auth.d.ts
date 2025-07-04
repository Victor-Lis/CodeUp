import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      id: string;
      name?: string;
      email: string;
      emailVerified: string | null;
      password: string;
      image: string | null;
      role: "USER" | "ADMIN";
    };
    expires: Date;
    token: {
      name: string | null;
      email: string | null;
      picture: string | null;
      sub: string | null;
      user: {
        id: string | null;
        name: string | null;
        email: string | null;
        emailVerified: string | null;
        password: string | null;
        image: string | null;
        role: "USER" | "ADMIN";
      };
      iat: number;
      exp: number;
      jti: string;
    };
  }
}
