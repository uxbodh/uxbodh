import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import User from "@/app/models/Users";
import { dbConnect } from "@/app/lib/dbConnect";

export async function POST(req) {
    try {
        await dbConnect();

        const body = await req.json();
        const { fullName, userName, emailId, password, status } = body;

        // Validation
        if (!fullName || !userName || !emailId || !password) {
            return NextResponse.json(
                { message: "All fields are required" },
                { status: 400 },
            );
        }

        // Duplicate check
        const existingUser = await User.findOne({
            $or: [{ emailId }, { userName }],
        });

        if (existingUser) {
            return NextResponse.json(
                {
                    success: false,
                    message: "User already exists"
                },
                { status: 409 },
            );
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Save user
        const user = new User({
            fullName,
            userName,
            emailId,
            password: hashedPassword,
            status: status ?? true,
        });

        await user.save();

        return NextResponse.json(
            { 
                success: true,
                message: "User created successfully" 
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("Add User Error:", error);
        return NextResponse.json(
            { 
                success: false,
                message: "Internal server error" 
            },
            { status: 500 }
        );
    }
}
