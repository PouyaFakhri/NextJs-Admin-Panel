import { NextResponse } from "next/server";

export function middleware(req) {
  const token = req.cookies.get("token")?.value;
  const { pathname } = req.nextUrl;
  const validPath = ["/", "/dashboard", "/register"];

  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/Fonts') ||
    pathname.startsWith('/images') ||
    pathname.match(/\.(woff2?|ttf|otf|eot|png|jpg|jpeg|gif|svg|css|js)$/)
  ) {
    return NextResponse.next();
  }

  const isValidPath = validPath.some((path) => {
    return path === pathname;
  });

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
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
