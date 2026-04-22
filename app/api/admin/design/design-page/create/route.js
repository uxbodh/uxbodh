// app/api/admin/design-page/create/route.js
import { dbConnect } from "@/app/lib/dbConnect"; // your MongoDB connection helper
import DesignPage from "@/app/models/DesignPage";
import slugify from "slugify";

export async function POST(req) {
  await dbConnect();

  try {
    const body = await req.json();
    const { heading, subHeading, mainImage } = body;

    if (!heading || !subHeading || !mainImage) {
      return Response.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    const slug = slugify(heading, {
      lower: true,
      strict: true,
    });

    const exists = await DesignPage.findOne({ slug });
    if (exists) {
      return Response.json(
        { message: "Page already exists" },
        { status: 409 }
      );
    }

    const page = await DesignPage.create({
      heading,
      subHeading,
      mainImage,
      slug,
    });

    return Response.json(
      {
        success: true,
        message: "Design page created",
        data: page,
      },
      { status: 201 }
    );
  } catch (err) {
    return Response.json(
      { message: "Server error", error: err.message },
      { status: 500 }
    );
  }
}