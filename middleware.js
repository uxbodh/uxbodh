import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

const SECRET = new TextEncoder().encode(process.env.JWT_SECRET);

export async function middleware(req) {
    const { pathname } = req.nextUrl;

    console.log("🟡 Middleware triggered:", pathname);

    const isProtectedRoute =
        pathname.startsWith("/admin") || pathname.startsWith("/dashboard");

    if (!isProtectedRoute) {
        console.log("🟢 Public route, skipping auth");
        return NextResponse.next();
    }

    // ✅ CORRECT way to read cookie in middleware
    const token = req.cookies.get("token")?.value;

    console.log("🔐 Token exists:", !!token);

    if (!token) {
        console.log("🔴 No token found, redirecting to /login");
        return NextResponse.redirect(new URL("/login", req.url));
    }

    try {
        const decoded = await jwtVerify(token, SECRET);
        console.log("✅ JWT verified:", decoded.payload);

        return NextResponse.next();
    } catch (err) {
        console.error("❌ JWT verification failed:", err.message);

        const response = NextResponse.redirect(new URL("/login", req.url));
        response.cookies.delete("token");

        return response;
    }
}

export const config = {
    matcher: ["/admin/:path*", "/dashboard/:path*"],
};