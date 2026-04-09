import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

const SECRET = new TextEncoder().encode(process.env.JWT_SECRET);

export async function middleware(req) {
    const { pathname } = req.nextUrl;

    const isProtectedRoute =
        pathname.startsWith("/admin") || pathname.startsWith("/dashboard");

    if (!isProtectedRoute) {
        return NextResponse.next();
    }

    const token = cookies().get("token")?.value;

    if (!token) {
        return NextResponse.redirect(new URL("/login", req.url));
    }

    try {
        await jwtVerify(token, SECRET);
        return NextResponse.next();
    } catch (err) {
        const response = NextResponse.redirect(new URL("/login", req.url));
        response.cookies.delete("token");
        return response;
    }
}

export const config = {
    matcher: ["/admin/:path*", "/dashboard/:path*"],
};
