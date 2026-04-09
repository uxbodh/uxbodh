import mongoose from "mongoose";

const SampleUploadSchema = new mongoose.Schema(
    {
        thumbnail: {
            type: String,
            required: true,
        },
        image: { 
            type: String, 
            required: true 
        },
        contentHeading: { 
            type: String, 
            required: true 
        },
        content: { 
            type: String, 
            required: true 
        },
        markerPostion: [
            {
                topOffset: { 
                    type: String,
                },
                leftOffset: { 
                    type: String, 
                },
            }
        ],
        status: {
            type: Boolean,
            default: true,
        },
    },
    { timestamps: true },
);

export default mongoose.models.SampleUpload ||
    mongoose.model("SampleUpload", SampleUploadSchema);
