export async function GET() {
    return Response.json({
        status: "ok",
        service: "nextjs-api",
        timestamp: new Date().toISOString(),
    });
}
