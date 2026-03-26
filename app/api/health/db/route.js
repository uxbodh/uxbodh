import { connectDB } from "@/app/lib/mongodb";

export async function GET() {
    try {
        await connectDB();
        return Response.json({
            status: "ok",
            database: "connected",
        });
    } catch (err) {
        return Response.json(
            {
                status: "error",
                database: "down",
            },
            { status: 500 },
        );
    }
}
