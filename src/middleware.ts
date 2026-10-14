import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const COOKIE_NAME = "1mmw_auth_token";
const JWT_SECRET = process.env.JWT_SECRET || "1mmw-super-secret-production-key-2025-worship";
const secretKey = new TextEncoder().encode(JWT_SECRET);

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get(COOKIE_NAME)?.value;

  let isValid = false;
  if (token) {
    try {
      await jwtVerify(token, secretKey);
      isValid = true;
    } catch {
      isValid = false;
    }
  }

  // 1. Protected routes: /admin and any sub-routes
  const isProtectedRoute = pathname.startsWith("/admin");
  if (isProtectedRoute) {
    if (!isValid) {
      const loginUrl = new URL("/auth/login", request.url);
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }
    return NextResponse.next();
  }

  // 2. Auth routes: /auth/login and /auth/register
  const isAuthRoute = pathname.startsWith("/auth/login") || pathname.startsWith("/auth/register");
  if (isAuthRoute) {
    if (isValid) {
      const adminUrl = new URL("/admin", request.url);
      return NextResponse.redirect(adminUrl);
    }
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/admin", "/auth/login", "/auth/register"],
};
