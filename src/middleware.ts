import { type NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";
import { auth } from "./lib/auth";
import { headers } from "next/headers";

export async function middleware(request: NextRequest) {
  const session = await auth.api.getSession({
    headers: await headers(),
  })
  if(!session) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  const isAdmin = session.user.role === "admin";
  const isDriverPage = request.nextUrl.pathname.startsWith("/drivers");
  const isLoginPage = request.nextUrl.pathname === "/login";
  const isOnRoot = request.nextUrl.pathname === "/";
  if(isAdmin && isLoginPage) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }
  if(!isAdmin && !isDriverPage) {
    return NextResponse.redirect(new URL("/drivers", request.url));
  }
  if(isAdmin && isDriverPage) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }
  if(isOnRoot) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  return NextResponse.next();
}

export const config = {
  runtime: "nodejs",
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};