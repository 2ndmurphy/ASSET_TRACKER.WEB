import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Middleware function that checks for the 'access_token' cookie.
 * If the user is missing the token and trying to access a protected route,
 * they are redirected to the login page.
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const accessToken = request.cookies.get("access_token")?.value;

  // Skip static & internal
  if (pathname.startsWith("/_next") || pathname.includes("/favicon.ico")) {
    return NextResponse.next();
  }

  // ✅ Handle API Requests: Don't redirect API calls like pages
  if (pathname.startsWith("/api/")) {
    if (accessToken) {
      const requestHeaders = new Headers(request.headers);
      requestHeaders.set("Authorization", `Bearer ${accessToken}`);
      return NextResponse.next({ request: { headers: requestHeaders } });
    }
    return NextResponse.next();
  }

  const isAuthPage = pathname.startsWith("/auth");
  const isRoot = pathname === "/";
  const isProtected = !isAuthPage && !isRoot;

  // ✅ Case 1: belum login → akses protected
  if (!accessToken && isProtected) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  // ✅ Case 2: sudah login → akses auth page
  if (accessToken && isAuthPage) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // ✅ Case 3: root handling
  if (isRoot) {
    return NextResponse.redirect(
      new URL(accessToken ? "/dashboard" : "/auth/login", request.url),
    );
  }

  console.log({
    path: pathname,
    token: accessToken,
  });

  return NextResponse.next();
}

// Config to specify which paths the middleware should run on
export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
