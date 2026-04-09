import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function GET(req) {
    try {
        const token = cookies().get("token")?.value;

        if (!token) {
            return NextResponse.json(
                { message: "Unauthorized: No token found" },
                { status: 401 }
            );
        }

        const secret = process.env.JWT_SECRET;
        if (!secret) {
            return NextResponse.json(
                { message: "Server misconfigured: JWT_SECRET missing" },
                { status: 500 }
            );
        }

        const decoded = jwt.verify(token, secret);

        return NextResponse.json({
            success: true,
            user: {
                id: decoded.id,
                userName: decoded.userName,
                emailId: decoded.emailId,
                fullName: decoded.fullName,
            },
        });
    } catch (err) {
        console.error("Token verification error:", err.message);
        return NextResponse.json(
            { message: "Invalid or expired token" },
            { status: 401 }
        );
    }
}