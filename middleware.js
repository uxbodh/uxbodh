// middleware.js
import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

const SECRET = new TextEncoder().encode(process.env.JWT_SECRET);

export async function middleware(req) {
    const pathname = req.nextUrl.pathname;

    console.log("🔥 MIDDLEWARE RUNNING:", pathname);

    const cookieStore = req.cookies;
    const token = cookieStore.get("token")?.value;

    console.log("🍪 All cookies:", cookieStore.getAll());
    console.log("🔐 Token value:", token);

    if (!token) {
        console.log("❌ No token → redirect");
        return NextResponse.redirect(new URL("/login", req.url));
    }

    try {
        const payload = await jwtVerify(token, SECRET);
        console.log("✅ Token verified:", payload.payload);
        return NextResponse.next();
    } catch (err) {
        console.log("❌ Token invalid:", err.message);
        const res = NextResponse.redirect(new URL("/login", req.url));
        res.cookies.delete("token");
        return res;
    }
}

export const config = {
    matcher: ["/dashboard", "/dashboard/:path*", "/admin", "/admin/:path*"],
};
