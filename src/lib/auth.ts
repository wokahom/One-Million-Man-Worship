import { SignJWT, jwtVerify } from "jose";
import { NextRequest, NextResponse } from "next/server";

export const COOKIE_NAME = "1mmw_auth_token";
const JWT_SECRET = process.env.JWT_SECRET || "1mmw-super-secret-production-key-2025-worship";
const secretKey = new TextEncoder().encode(JWT_SECRET);

export interface TokenPayload {
  sub: string;
  email: string;
  name: string;
  role: string;
  [key: string]: unknown;
}

/**
 * Sign JWT token valid for 7 days
 */
export async function signToken(payload: TokenPayload): Promise<string> {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(secretKey);
}

/**
 * Verify JWT token from string or cookie
 */
export async function verifyToken(token: string): Promise<TokenPayload | null> {
  try {
    const { payload } = await jwtVerify(token, secretKey);
    return payload as unknown as TokenPayload;
  } catch {
    return null;
  }
}

/**
 * Extract authenticated user from NextRequest cookies or Authorization header
 */
export async function getAuthUser(request: NextRequest): Promise<TokenPayload | null> {
  const tokenFromCookie = request.cookies.get(COOKIE_NAME)?.value;
  const authHeader = request.headers.get("authorization");
  const tokenFromHeader = authHeader?.startsWith("Bearer ")
    ? authHeader.substring(7)
    : null;

  const token = tokenFromCookie || tokenFromHeader;
  if (!token) return null;

  return await verifyToken(token);
}

/**
 * Set HTTP-only secure cookie on NextResponse
 */
export function setAuthCookie(response: NextResponse, token: string): void {
  response.cookies.set({
    name: COOKIE_NAME,
    value: token,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });
}

/**
 * Remove auth cookie on logout
 */
export function clearAuthCookie(response: NextResponse): void {
  response.cookies.set({
    name: COOKIE_NAME,
    value: "",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });
}
