import "next-auth";
import "next-auth/jwt";

interface CustomJWT {
  id: number;
  name: string;
  username: string;
  type: string;
  accessToken: string;
}

interface CustomUser {
  id: number;
  name: string;
  username: string;
  type: string;
}

declare module "next-auth" {
  interface User {
    token: string;
  }

  interface Session {
    user: CustomUser;
    accessToken: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends CustomJWT {}
}
