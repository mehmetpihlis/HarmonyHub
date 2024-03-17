import mongoose from "mongoose";

const tokenSchema = mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    refreshToken: {
        type: String,
    }
});

export default mongoose.model("token", tokenSchema);