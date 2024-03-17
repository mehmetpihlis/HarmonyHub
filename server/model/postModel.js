import mongoose from "mongoose";

const postSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: new Date()
    },
    image: {
        type: String,
        required: true
    },
    creatorId: {
        type: String
    },
    creatorName: {
        type: String,
        required: true
    }
});

export default mongoose.model("post", postSchema);