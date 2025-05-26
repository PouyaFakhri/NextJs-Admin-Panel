import { NextResponse } from "next/server";

export function middleware(req) {
  const token = req.cookies.get("token")?.value;
  const { pathname } = req.nextUrl;
  const validPath = ["/", "/dashboard", "/register"];

  const isValidPath = validPath.some((path) => {
    return path === pathname;
  });

  console.log(isValidPath);

  if (!isValidPath) {
   return token
      ? NextResponse.redirect(new URL("/dashboard"  , req.url))
      : NextResponse.redirect(new URL("/" , req.url));
  }

  if (!token && pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (token && (pathname === "/" || pathname === "/register")) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|api).*)"],
};
