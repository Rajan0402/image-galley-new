import { NextRequest, NextResponse } from "next/server";
import * as jose from "jose";

export async function middleware(req : NextRequest) {
  const cookie = req.cookies.get("Authorization");
  if (!cookie) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  const secret = new TextEncoder().encode(process.env.JWT_SECRET);
  const jwt = cookie.value;

  try {
    const { payload } = await jose.jwtVerify(jwt, secret, {});
    console.log(payload);
    return NextResponse.next();
  } catch (err) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

export const config = {
  matcher: ['/', '/img'],
};