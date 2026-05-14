import { NextResponse } from "next/server";
import { dbConnect } from "@/app/lib/dbConnect";
import Blog from "@/app/models/blog";

// BLOG LISTING API
export async function GET() {
    try {
        await dbConnect();

        const blogs = await Blog.find().sort({
            publishedAt: -1,
        });

        return NextResponse.json(
            { success: true, data: blogs },
            { status: 200 },
        );
    } catch (error) {
        return NextResponse.json(
            { success: false, error: error.message },
            { status: 500 },
        );
    }
}
