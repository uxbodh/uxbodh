// models/DesignPageDetail.js
import mongoose from "mongoose";

const SectionSchema = new mongoose.Schema(
    {
        heading: {
            type: String,
            required: true,
        },
        subheading: {
            type: String,
            required: true,
        },
        content: {
            type: String, // TinyMCE HTML
            required: true,
        },
    },
    { _id: false },
);

const DesignDetailPageSchema = new mongoose.Schema(
    {
        designPageId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "DesignPage",
            required: true,
            unique: true, // 1-to-1 relation
        },

        sections: {
            type: [SectionSchema],
            required: true,
        },

        // Store only blob paths
        imageList: {
            type: [String],
            default: [],
        },
    },
    { timestamps: true },
);

export default mongoose.models.DesignDetailPage ||
    mongoose.model("DesignDetailPage", DesignDetailPageSchema);
