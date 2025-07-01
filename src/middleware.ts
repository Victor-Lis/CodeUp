import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { jwtDecode } from "jwt-decode";

interface Payload {
  user: {
    id: number;
    name: string;
    username: string;
  };
}

interface Token {
  user: {
    token: string;
  };
}

export const config = {
  matcher: "/((?!.*\\.|_next/static|_next/image|favicon.ico|api).*)",
};

export const publicRoutes: string[] = ["/", "/login"];
const adminRoutes: string[] = [];

export async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;

  const token = (await getToken({ req })) as Token | null;

  if (!token) {
    if (!publicRoutes.includes(pathname)) {
      return NextResponse.redirect(new URL("/login", req.nextUrl.origin));
    }

    return NextResponse.next();
  }

  const user = token?.user;

  if (!publicRoutes.includes(pathname) && !user) {
    return NextResponse.redirect(new URL("/login", req.nextUrl.origin));
  }

  return NextResponse.next();
}
