import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import User from "@/app/models/Users";
import { dbConnect } from "@/app/lib/dbConnect";

export async function PUT(req, { params }) {
    try {
        await dbConnect();

        const { id } = await params;
        const body = await req.json();

        const {
            fullName,
            userName,
            emailId,
            password,
            status,
        } = body;

        // Check user exists
        const user = await User.findById(id);
        if (!user) {
            return NextResponse.json(
                { success: false, message: "User not found" },
                { status: 404 }
            );
        }

        // Duplicate check (exclude current user)
        if (emailId || userName) {
            const duplicate = await User.findOne({
                _id: { $ne: id },
                $or: [
                    emailId ? { emailId } : null,
                    userName ? { userName } : null,
                ].filter(Boolean),
            });

            if (duplicate) {
                return NextResponse.json(
                    { success: false, message: "Username or Email already exists" },
                    { status: 409 }
                );
            }
        }

        // Update fields
        if (fullName !== undefined) user.fullName = fullName;
        if (userName !== undefined) user.userName = userName;
        if (emailId !== undefined) user.emailId = emailId;
        if (status !== undefined) user.status = status;

        // Password update (optional)
        if (password) {
            user.password = await bcrypt.hash(password, 10);
        }

        await user.save();

        return NextResponse.json(
            {
                success: true,
                message: "User updated successfully",
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("Update User Error:", error);
        return NextResponse.json(
            { success: false, message: "Internal server error" },
            { status: 500 }
        );
    }
}