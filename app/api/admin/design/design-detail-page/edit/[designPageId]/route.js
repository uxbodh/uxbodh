import { dbConnect } from "@/app/lib/dbConnect";
import DesignDetailPage from "@/app/models/DesignDetailPage";

export async function PUT(req, { params }) {
    await dbConnect();

    try {
        const { designPageId } = await params;
        const body = await req.json();
        const { sections, imageList } = body;

        if (!sections || sections.length === 0) {
            return Response.json(
                { message: "Sections are required" },
                { status: 400 }
            );
        }

        const updatedDetail = await DesignDetailPage.findOneAndUpdate(
            { designPageId },
            {
                sections,
                imageList: imageList || [],
            },
            { new: true }
        );

        if (!updatedDetail) {
            return Response.json(
                { message: "Design detail page not found" },
                { status: 404 }
            );
        }

        return Response.json({
            success: true,
            message: "Design detail page updated successfully",
            data: updatedDetail,
        });
    } catch (err) {
        return Response.json(
            { message: "Server error", error: err.message },
            { status: 500 }
        );
    }
}