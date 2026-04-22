import { dbConnect } from "@/app/lib/dbConnect"; // your MongoDB connection helper
import DesignPage from "@/app/models/DesignPage";

export async function GET() {
    await dbConnect();

    try {
        const data = await DesignPage.aggregate([
            {
                $lookup: {
                    from: "designdetailpages", // MongoDB collection name
                    localField: "_id",
                    foreignField: "designPageId",
                    as: "detail",
                },
            },
            {
                $unwind: {
                    path: "$detail",
                    preserveNullAndEmptyArrays: true, // agar detail na ho
                },
            },
            {
                $project: {
                    heading: 1,
                    subHeading: 1,
                    mainImage: 1,
                    slug: 1,
                    status: 1,
                    createdAt: 1,

                    // detail fields
                    sections: "$detail.sections",
                    imageList: "$detail.imageList",
                },
            },
            { $sort: { createdAt: -1 } },
        ]);

        return Response.json(
            {
                success: true,
                count: data.length,
                data,
            },
            { status: 200 },
        );
    } catch (err) {
        return Response.json(
            { success: false, message: err.message },
            { status: 500 },
        );
    }
}
