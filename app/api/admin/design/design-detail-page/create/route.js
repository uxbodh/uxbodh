import { dbConnect } from "@/app/lib/dbConnect"; // your MongoDB connection helper
import DesignPage from "@/app/models/DesignPage";
import DesignDetailPage from "@/app/models/DesignDetailPage";

export async function POST(req) {
    await dbConnect();

    try {
        const body = await req.json();
        const { slug, sections, imageList } = body;

        if (!slug || !sections || sections.length === 0) {
            return Response.json(
                { message: "Slug and sections are required" },
                { status: 400 },
            );
        }

        // Find parent design page
        const designPage = await DesignPage.findOne({ slug });
        if (!designPage) {
            return Response.json(
                { message: "Design page not found" },
                { status: 404 },
            );
        }

        // Check if detail already exists
        const exists = await DesignDetailPage.findOne({
            designPageId: designPage._id,
        });

        if (exists) {
            return Response.json(
                { message: "Detail already exists for this page" },
                { status: 409 },
            );
        }

        const detail = await DesignDetailPage.create({
            designPageId: designPage._id,
            sections,
            imageList: imageList || [],
        });

        return Response.json(
            {
                success: true,
                message: "Design detail page created successfully",
                data: detail,
            },
            { status: 201 },
        );
    } catch (err) {
        return Response.json(
            { message: "Server error", error: err.message },
            { status: 500 },
        );
    }
}
