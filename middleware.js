// middleware.js (ROOT)
import { NextResponse } from "next/server";

export function middleware(req) {
    console.log("🔥 MIDDLEWARE RUNNING:", req.nextUrl.pathname);
    return NextResponse.next();
}

export const config = {
    matcher: ["/admin/:path*", "/dashboard/:path*"],
};