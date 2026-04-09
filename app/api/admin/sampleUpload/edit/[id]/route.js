// app/api/admin/sampleUpload/edit/[id]/route.js
import { dbConnect } from "@/app/lib/dbConnect";
import SampleUpload from "@/app/models/SampleUploads";
import { NextResponse } from "next/server";

export async function PATCH(req, { params }) {
    console.log('params',params)
    try {
        await dbConnect();

        const { id } = await params;

        if (!id) {
            return NextResponse.json(
                { success: false, message: "ID is required" },
                { status: 400 },
            );
        }

        const body = await req.json();

        const updatedRecord = await SampleUpload.findByIdAndUpdate(id, body, {
            new: true,
        });

        if (!updatedRecord) {
            return NextResponse.json(
                { success: false, message: "Record not found" },
                { status: 404 },
            );
        }

        return NextResponse.json({
            success: true,
            message: "Sample updated successfully",
            data: updatedRecord,
        });
    } catch (err) {
        return NextResponse.json(
            { success: false, message: err.message },
            { status: 500 },
        );
    }
}
