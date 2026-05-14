import { NextResponse } from "next/server";
import { dbConnect } from "@/app/lib/dbConnect"; // your MongoDB connection helper
import Blog from "@/app/models/blog";
import slugify from "slugify";
import { message } from "antd";

// ADD BLOG
export async function POST(req) {
    await dbConnect();
    try {
        const body = await req.json();

        const {
            blogTitle,
            blogContent,
            blogImage,
            seoTitle,
            seoDescription,
            seoKeywords,
            isPublished,
        } = body;

        if (!blogTitle || !blogContent || !blogImage) {
            return NextResponse.json(
                { error: "blogTitle, blogContent and blogImage are required" },
                { status: 400 },
            );
        }

        const blogSlug = slugify(blogTitle, {
            lower: true,
            strict: true,
        });

        const exists = await Blog.findOne({ blogSlug });

        if (exists) {
            return Response.json(
                { message: "Page already exists" },
                { status: 409 },
            );
        }

        const blog = await Blog.create({
            blogTitle,
            blogSlug,
            blogContent,
            blogImage,
            seoTitle,
            seoDescription,
            seoKeywords,
            publishedAt: isPublished ? new Date() : null,
        });

        return NextResponse.json(
            { success: true, message: "Blog created successfully", data: blog },
            { status: 201 },
        );
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
