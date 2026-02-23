import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * Middleware function that checks for the 'access_token' cookie.
 * If the user is missing the token and trying to access a protected route,
 * they are redirected to the login page.
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Define public routes that don't require authentication
  const isPublicRoute =
    pathname.startsWith('/auth/login') ||
    pathname.startsWith('/auth/register') ||
    pathname.startsWith('/_next') ||
    pathname.includes('/favicon.ico');

  // Check for the 'access_token' cookie
  const accessToken = request.cookies.get('access_token');

  // If there's no access token and it's not a public route, redirect to login
  if (!accessToken && !isPublicRoute) {
    const loginUrl = new URL('/auth/login', request.url);
    // Optionally preserve the attempted URL to redirect back after login
    // loginUrl.searchParams.set('callbackUrl', encodeURIComponent(pathname));
    return NextResponse.redirect(loginUrl);
  }

  // Allow the request to proceed
  return NextResponse.next();
}

// Optionally, you can also set a matcher to limit where this middleware runs
// export const config = {
//   matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
// };
