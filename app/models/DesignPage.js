// models/DesignPage.js
import mongoose from "mongoose";

const DesignPageSchema = new mongoose.Schema(
    {
        heading: {
            type: String,
            required: true,
            trim: true,
        },

        subHeading: {
            type: String,
            required: true,
            trim: true,
        },

        // Store BLOB PATH (recommended)
        mainImage: {
            type: String,
            required: true,
        },

        // Used for routing like /design/campus-commerce
        slug: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            index: true,
        },

        status: {
            type: Boolean,
            default: true,
        },
    },
    { timestamps: true },
);

export default mongoose.models.DesignPage ||
    mongoose.model("DesignPage", DesignPageSchema);
