import { dbConnect } from "@/app/lib/dbConnect";
import designPage from "@/app/models/DesignPage";
import { NextResponse } from "next/server";

export async function PATCH(req, context) {
    try {
        await dbConnect();

        // Unwrap params
        const params = await context.params;
        const { id } = params;

        if (!id) {
            return NextResponse.json(
                { success: false, message: "ID is required" },
                { status: 400 },
            );
        }

        // Find current record
        const record = await designPage.findById(id);
        if (!record) {
            return NextResponse.json(
                { success: false, message: "Record not found" },
                { status: 404 },
            );
        }

        // Toggle the status
        record.status = !record.status;
        await record.save();

        return NextResponse.json({
            success: true,
            message: `Status updated to ${record.status ? "Active" : "Inactive"}`,
            updated: record,
        });
    } catch (err) {
        return NextResponse.json(
            { success: false, message: err.message },
            { status: 500 },
        );
    }
}
