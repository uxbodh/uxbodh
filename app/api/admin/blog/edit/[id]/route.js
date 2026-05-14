import { NextResponse } from "next/server";
import { dbConnect } from "@/app/lib/dbConnect";
import Blog from "@/app/models/blog";
import slugify from "slugify";

// EDIT BLOG
export async function PUT(req, { params }) {
    await dbConnect();

    try {
        const { id } = await params;
        const body = await req.json();

        const {
            blogTitle,
            blogContent,
            blogImage,
            seoTitle,
            seoDescription,
            seoKeywords,
        } = body;

        if (!blogTitle || !blogContent || !blogImage) {
            return NextResponse.json(
                { error: "blogTitle, blogContent and blogImage are required" },
                { status: 400 },
            );
        }

        // Generate new slug from updated title
        const blogSlug = slugify(blogTitle, {
            lower: true,
            strict: true,
        });

        // Check slug conflict (exclude current blog)
        const slugExists = await Blog.findOne({
            blogSlug,
            _id: { $ne: id },
        });

        if (slugExists) {
            return NextResponse.json(
                { message: "Blog with same title already exists" },
                { status: 409 },
            );
        }

        const updatedBlog = await Blog.findByIdAndUpdate(
            id,
            {
                blogTitle,
                blogSlug,
                blogContent,
                blogImage,
                seoTitle,
                seoDescription,
                seoKeywords,
            },
            { new: true },
        );

        if (!updatedBlog) {
            return NextResponse.json(
                { message: "Blog not found" },
                { status: 404 },
            );
        }

        return NextResponse.json(
            {
                success: true,
                message: "Blog updated successfully",
                data: updatedBlog,
            },
            { status: 200 },
        );
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
