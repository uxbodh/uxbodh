// app/api/sampleUpload/route.js
import { dbConnect } from "@/app/lib/dbConnect"; // your MongoDB connection helper
import SampleUpload from "@/app/models/SampleUploads";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        // Connect to MongoDB
        await dbConnect();

        // Parse request body
        const data = await req.json();

        // Validate required fields (optional, can be more thorough)
        const { thumbnail, image, contentHeading, content, markerPostion } =
            data;
        if (!thumbnail || !image || !contentHeading || !content) {
            return NextResponse.json(
                { success: false, message: "Missing required fields" },
                { status: 400 },
            );
        }

        // Create new document
        const newSample = await SampleUpload.create({
            thumbnail,
            image,
            contentHeading,
            content,
            markerPostion, // can be empty array if not provided
        });

        return NextResponse.json({
            success: true,
            message: "Sample uploaded successfully",
            data: newSample,
        });
    } catch (err) {
        console.error("DB Insert Error:", err);
        return NextResponse.json(
            { success: false, message: err.message },
            { status: 500 },
        );
    }
}
