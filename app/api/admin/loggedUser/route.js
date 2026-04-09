import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function GET() {
    try {
        const cookieStore = cookies(); // ✅ FIX
        const token = cookieStore.get("token")?.value;

        if (!token) {
            return NextResponse.json(
                { message: "Unauthorized" },
                { status: 401 }
            );
        }

        const secret = process.env.JWT_SECRET;

        if (!secret) {
            return NextResponse.json(
                { message: "JWT_SECRET missing" },
                { status: 500 }
            );
        }

        const decoded = jwt.verify(token, secret);

        return NextResponse.json({
            success: true,
            user: decoded,
        });
    } catch (err) {
        console.error("Token verification error:", err.message);

        return NextResponse.json(
            { message: "Invalid token" },
            { status: 401 }
        );
    }
}