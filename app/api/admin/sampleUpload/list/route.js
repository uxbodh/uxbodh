import { dbConnect } from "@/app/lib/dbConnect";
import SampleUpload from "@/app/models/SampleUploads";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await dbConnect();

    // const samples = await SampleUpload.find({ status: true }).sort({ createdAt: -1 });
    const samples = await SampleUpload.find().sort({ createdAt: -1 });

    return NextResponse.json({
      success: true,
      data: samples,
    });
  } catch (err) {
    return NextResponse.json(
      { success: false, message: err.message },
      { status: 500 }
    );
  }
}