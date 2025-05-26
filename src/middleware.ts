import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const session = request.cookies.get("session")?.value;

  if (pathname.startsWith("/dashboard") || pathname.startsWith("/travel")){
    if (!session) {
      // No session found, redirect to sign-in
      const url = new URL("/sign-in", request.url);
      return NextResponse.redirect(url);
    }
  }

  // Protect /sign-in route
  if (pathname === "/sign-in") {
    if (session) {
      // Session exists, redirect to dashboard
      const url = new URL("/", request.url);
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/sign-in", "/dashboard/:path*", "/travel/:path*"],
};
