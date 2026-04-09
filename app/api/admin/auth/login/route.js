import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { dbConnect } from "@/app/lib/dbConnect";
import User from "@/app/models/Users";
import { generateToken } from "@/app/lib/auth";

export async function POST(req) {
    try {
        await dbConnect();

        const { userName, password } = await req.json();

        if (!userName || !password) {
            return NextResponse.json(
                { message: "userName and password required" },
                { status: 400 },
            );
        }

        const user = await User.findOne({ userName });

        if (!user) {
            return NextResponse.json(
                { message: "Invalid credentials" },
                { status: 401 },
            );
        }

        if (user.status === false) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Your account is inactive. Contact admin.",
                },
                { status: 403 },
            );
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return NextResponse.json(
                { message: "Invalid credentials" },
                { status: 401 },
            );
        }

        const token = generateToken(user);

        const response = NextResponse.json({
            success: true,
            user: {
                username: user?.userName,
            },
        });

        // PRODUCTION COMPATIBLE

        response.cookies.set("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "lax",
            maxAge: 60 * 60 * 24 * 7,
            path: "/",
        });

        // response.cookies.set("token", token, {
        //     httpOnly: true,
        //     secure: false, // ❗ localhost
        //     sameSite: "lax", // ❗ MUST
        //     maxAge: 60 * 60 * 24 * 7,
        //     path: "/",
        // });

        return response;
    } catch (error) {
        console.error("Login error:", error);
        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 },
        );
    }
}
