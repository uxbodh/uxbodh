import { NextResponse } from "next/server";
import User from "@/app/models/Users";
import { dbConnect } from "@/app/lib/dbConnect";

export async function GET() {
    try {
        await dbConnect();

        const users = await User.find({}, {
            password: 0,   // exclude password
            __v: 0,
        }).sort({ createdAt: -1 });

        return NextResponse.json(
            {
                success: true,
                data: users,
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("Get Users Error:", error);
        return NextResponse.json(
            {
                success: false,
                message: "Failed to fetch users",
            },
            { status: 500 }
        );
    }
}