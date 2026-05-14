import mongoose from "mongoose";

const BlogSchema = new mongoose.Schema(
    {
        seoTitle: {
            type: String,
            required: true,
            trim: true,
        },

        seoDescription: {
            type: String,
            trim: true,
        },

        seoKeywords: {
            type: String,
            trim: true,
        },

        blogTitle: {
            type: String,
            required: true,
            trim: true,
        },

        blogSlug: {
            type: String,
            required: true,
            unique: true, // slug should be unique for URLs
            trim: true,
        },

        blogContent: {
            type: String, // HTML content allowed
            required: true,
        },

        blogImage: {
            type: String, // image URL (Vercel Blob / CDN)
        },

        isPublished: {
            type: Boolean,
            default: false,
        },
        
    },
    {
        timestamps: true, // createdAt & updatedAt auto
    },
);

export default mongoose.models.Blog || mongoose.model("Blog", BlogSchema);
