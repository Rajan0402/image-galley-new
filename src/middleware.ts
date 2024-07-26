import { cookies } from "next/headers";
import { NextRequest } from "next/server";
import * as jose from "jose";
import { redirect } from "next/navigation";

export async function middleware(req : NextRequest) {
  const cookie = cookies().get("Authorization");
  if (!cookie) {
    redirect("/login")
  }

  // Validate it
  const secret = new TextEncoder().encode(process.env.JWT_SECRET);
  const jwt = cookie.value;

  try {
    const { payload } = await jose.jwtVerify(jwt, secret, {});
    console.log(payload);
  } catch (err) {
    redirect("/login")
  }
}

export const config = {
  matcher: ['/'],
};