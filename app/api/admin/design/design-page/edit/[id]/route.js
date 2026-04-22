import { dbConnect } from "@/app/lib/dbConnect";
import DesignPage from "@/app/models/DesignPage";
import slugify from "slugify";

export async function PUT(req, { params }) {
    await dbConnect();

    try {
        const { id } = await params;
        const body = await req.json();
        const { heading, subHeading, mainImage } = body;

        const slug = slugify(heading, {
            lower: true,
            strict: true,
        });
        const updatedPage = await DesignPage.findByIdAndUpdate(
            id,
            {
                heading,
                subHeading,
                mainImage,
                slug,
            },
            { new: true }
        );

        if (!updatedPage) {
            return Response.json(
                { message: "Design page not found" },
                { status: 404 }
            );
        }

        return Response.json({
            success: true,
            message: "Design page updated successfully",
            data: updatedPage,
        });
    } catch (err) {
        return Response.json(
            { message: "Server error", error: err.message },
            { status: 500 }
        );
    }
}