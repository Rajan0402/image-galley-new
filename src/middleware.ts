import { NextRequest, NextResponse } from "next/server";
import { verifyAuth } from "./utils/auth";

export async function middleware(req: NextRequest) {
  console.log("in middleware fn -------");
  const cookie = req.cookies.get("Authorization");
  if (!cookie) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  const jwt = cookie.value;

  try {
    const verifiedToken = await verifyAuth(jwt).catch((err) => {
      console.log(err);
    });
    if (verifiedToken) {
      console.log("token present---------------");
    }

    if (verifiedToken && req.nextUrl.pathname.includes("/signin")) {
      return NextResponse.redirect(new URL("/", req.url));
    }
    return NextResponse.next();
  } catch (err) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

export const config = {
  matcher: ["/img"],
};
