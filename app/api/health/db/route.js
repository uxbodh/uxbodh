import { dbConnect } from "@/app/lib/dbConnect";

export async function GET() {
    try {
        await dbConnect();
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
