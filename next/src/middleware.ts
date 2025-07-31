import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { jwtDecode } from "jwt-decode";

// interface Payload {
//   user: {
//     id: number;
//     name: string;
//     username: string;
//   };
// }

interface Token {
  id: number;
  name: string;
  username: string;
  type: string;
  accessToken: string;
}

export const config = {
  matcher: "/((?!.*\\.|_next/static|_next/image|favicon.ico|api).*)",
};

export const publicRoutes: string[] = ["/", "/login"];
const adminRoutes: string[] = ["/challenge"];

export async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;

  const token = (await getToken({ req })) as Token | null;
  // console.log("Token:", token);

  if (!token && !publicRoutes.includes(pathname)) {
    // console.log("No token found, redirecting to login");
    return NextResponse.redirect(new URL("/login", req.nextUrl.origin));
  }

  const userRole = token?.type;

  if (adminRoutes.includes(pathname) && userRole !== "ADMIN") {
    // console.log("User is not admin, redirecting to dashboard");
    return NextResponse.redirect(new URL("/dashboard", req.nextUrl.origin));
  }

  // // console.log("User is authorized, proceeding to next middleware or route");
  return NextResponse.next();
}
