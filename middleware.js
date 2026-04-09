import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(req) {
    const { pathname } = req.nextUrl;

    console.log("🔥 MIDDLEWARE RUNNING:", pathname);

    if (
        !pathname.startsWith("/admin") &&
        !pathname.startsWith("/dashboard")
    ) {
        return NextResponse.next();
    }

    // ✅ READ ENV INSIDE FUNCTION
    const jwtSecret = process.env.JWT_SECRET;

    console.log("🔑 JWT_SECRET length:", jwtSecret?.length);

    if (!jwtSecret) {
        console.error("❌ JWT_SECRET is missing");
        return NextResponse.redirect(new URL("/login", req.url));
    }

    const SECRET = new TextEncoder().encode(jwtSecret);

    const token = req.cookies.get("token")?.value;
    console.log("🍪 Token exists:", !!token);

    if (!token) {
        return NextResponse.redirect(new URL("/login", req.url));
    }

    try {
        await jwtVerify(token, SECRET);
        console.log("✅ Token verified");
        return NextResponse.next();
    } catch (err) {
        console.error("❌ Token invalid:", err.message);
        const res = NextResponse.redirect(new URL("/login", req.url));
        res.cookies.delete("token");
        return res;
    }
}

export const config = {
    matcher: ["/admin/:path*", "/dashboard/:path*"],
};