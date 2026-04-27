import { NextRequest, NextResponse } from "next/server";

export function proxy(req: NextRequest) {
  const pathname = req.nextUrl.pathname;

  if (pathname.includes("api")) return NextResponse.next();

  const token = req.cookies.get("token")?.value;

  if (token === "admin" && pathname === "/07_module_b/login") {
    return NextResponse.redirect(new URL("/07_module_b", req.url));
  }

  const isPublicPage = 
    pathname === "/07_module_b/verify" || 
    pathname === "/07_module_b/login" || 
    pathname.startsWith("/07_module_b/01/product/");

  if (!isPublicPage && !token) {
    return NextResponse.redirect(new URL("/07_module_b/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/07_module_b/:path*"],
};