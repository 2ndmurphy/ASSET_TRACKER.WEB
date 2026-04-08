"use server";

import { cookies } from "next/headers";

/**
 * Sets the 'access_token' cookie as HttpOnly.
 * This is meant to be called from the client side after a successful login or token refresh.
 */
export async function setAuthCookiesAction(
  accessToken: string,
  refreshToken: string,
) {
  const cookieStore = await cookies();

  cookieStore.set("access_token", accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });

  cookieStore.set("refresh_token", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30, // 30 days
  });
}

/**
 * Removes the 'access_token' cookie.
 * Meant for logging out.
 */
export async function deleteAuthCookiesAction() {
  const cookieStore = await cookies();
  cookieStore.delete("access_token");
}
