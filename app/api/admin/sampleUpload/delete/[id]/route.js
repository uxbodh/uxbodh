import { dbConnect } from "@/app/lib/dbConnect";
import SampleUpload from "@/app/models/SampleUploads";
import { NextResponse } from "next/server";

export async function DELETE(req, { params }) {
    try {
        await dbConnect();

        const { id } = await params;

        if (!id) {
            return NextResponse.json(
                { success: false, message: "ID is required" },
                { status: 400 }
            );
        }

        const deletedRecord = await SampleUpload.findByIdAndDelete(id);

        if (!deletedRecord) {
            return NextResponse.json(
                { success: false, message: "Record not found" },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            message: "Record deleted successfully",
            data: deletedRecord,
        });
    } catch (err) {
        return NextResponse.json(
            { success: false, message: err.message },
            { status: 500 }
        );
    }
}