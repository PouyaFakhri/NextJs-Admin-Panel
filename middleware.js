import { NextResponse } from "next/server";

export function middleware(req) {
  const token = req.cookies.get("token")?.value
  const { pathname } = req.nextUrl;
  if (!token && pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (token && (pathname === "/" || pathname === "/register")) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/", "/register"],
};
