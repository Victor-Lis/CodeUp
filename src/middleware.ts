import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export const config = {
  matcher: "/((?!.*\\.|_next/static|_next/image|favicon.ico|api).*)",
};

export const publicRoutes: string[] = ["/", "/login"];
const adminRoutes: string[] = [];

export async function middleware(req: NextRequest) {
  // const pathname = req.nextUrl.pathname;

  // const session = await getServerSession();

  // if (!publicRoutes.includes(pathname) && !session) {
  //   return NextResponse.redirect(new URL("/login", req.nextUrl.origin));
  // }

  return NextResponse.next();
}
