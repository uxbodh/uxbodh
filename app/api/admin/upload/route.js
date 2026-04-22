import { put } from "@vercel/blob";
export const runtime = "nodejs";

export async function POST(req) {
    try {
        const formData = await req.formData();
        const file = formData.get("thumbnail") || formData.get("image");
        const folder = formData.get("folder");
        // expected: blog | homepage-slider | design

        if (!file || !folder) {
            return Response.json(
                { success: false, message: "File or folder missing" },
                { status: 400 },
            );
        }

        // 🔐 allow only these folders
        const allowedFolders = ["blog", "homepage-slider", "design"];
        if (!allowedFolders.includes(folder)) {
            return Response.json(
                { success: false, message: "Invalid folder" },
                { status: 403 },
            );
        }

        const fileName = `${folder}/${Date.now()}-${file.name}`;

        const blob = await put(fileName, file, {
            access: "public",
        });

        return Response.json({
            success: true,
            message: "File uploaded successfully",
            uploaded: [
                {
                    url: blob.url,
                    path: fileName,
                },
            ],
        });
    } catch (error) {
        console.error(error);
        return Response.json(
            { success: false, message: "Upload failed" },
            { status: 500 },
        );
    }
}
