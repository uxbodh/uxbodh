import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function GET(req) {
    try {
        const token = req.cookies.get("token")?.value;

        if (!token) {
            return NextResponse.json(
                { message: "Unauthorized" },
                { status: 401 }
            );
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        return NextResponse.json({
            success: true,
            user: {
                id: decoded.id,
                userName: decoded.userName,
                emailId: decoded.emailId,
                fullName: decoded.fullName
            },
        });
    } catch (err) {
        return NextResponse.json(
            { message: "Invalid token" },
            { status: 401 }
        );
    }
}