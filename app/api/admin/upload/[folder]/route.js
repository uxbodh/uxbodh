import { NextResponse } from "next/server";
import formidable from "formidable";
import fs from "fs";
import path from "path";
import { Readable } from "stream";

export const dynamic = "force-dynamic";

const ALLOWED_FOLDERS = ["sample", "blogs", "profile"];

const toNodeRequest = async (req) => {
    const buffer = Buffer.from(await req.arrayBuffer());
    const stream = new Readable();
    stream.push(buffer);
    stream.push(null);
    stream.headers = Object.fromEntries(req.headers.entries());
    stream.method = req.method;
    stream.url = "";
    return stream;
};

const uniqueFileName = (dir, name) => {
    const ext = path.extname(name);
    const base = path.basename(name, ext);
    let filename = name;
    let i = 1;
    while (fs.existsSync(path.join(dir, filename))) {
        filename = `${base}-${i}${ext}`;
        i++;
    }
    return filename;
};

// ⚡ Correct POST signature
export async function POST(req, context) {
    try {
        // ✅ unwrap the params promise
        const params = await context.params;
        const folder = params?.folder;

        if (!folder || !ALLOWED_FOLDERS.includes(folder)) {
            return NextResponse.json(
                { success: false, message: "Invalid upload folder" },
                { status: 400 },
            );
        }

        const uploadDir = path.join(process.cwd(), "public", "images", folder);
        fs.mkdirSync(uploadDir, { recursive: true });

        const form = formidable({
            uploadDir,
            keepExtensions: true,
            maxFileSize: 5 * 1024 * 1024,
            multiples: true,
            filter: ({ mimetype }) => mimetype?.startsWith("image/"),
        });

        const nodeReq = await toNodeRequest(req);

        const { files } = await new Promise((resolve, reject) => {
            form.parse(nodeReq, (err, fields, files) => {
                if (err) reject(err);
                resolve({ fields, files });
            });
        });

        const uploadedFiles = [];

        for (const fieldName in files) {
            const fieldFiles = Array.isArray(files[fieldName])
                ? files[fieldName]
                : [files[fieldName]];

            for (const file of fieldFiles) {
                const safeName = file.originalFilename
                    .replace(/\s+/g, "-")
                    .toLowerCase();
                const finalName = uniqueFileName(uploadDir, safeName);
                fs.renameSync(file.filepath, path.join(uploadDir, finalName));

                uploadedFiles.push({
                    field: fieldName,
                    url: `/images/${folder}/${finalName}`,
                });
            }
        }

        return NextResponse.json({ 
            success: true, 
            message: "Image uploaded successfully",
            uploaded: uploadedFiles 
        }, { status: 200 });
    } catch (err) {
        return NextResponse.json(
            { 
                success: false, 
                message: err.message 
            },
            { status: 500 },
        );
    }
}
