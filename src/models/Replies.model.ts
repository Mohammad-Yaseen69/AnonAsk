import mongoose, { Schema, Document } from "mongoose"

interface Replies extends Document {
    content: string;
    questionId: mongoose.Types.ObjectId;
    userId: mongoose.Types.ObjectId;
}

const RepliesSchema: Schema<Replies> = new Schema({
    content: {
        type: String,
        required: true,
    },
    questionId: { type: Schema.Types.ObjectId, ref: "Questions" },
    userId: { type: Schema.Types.ObjectId, ref: "User" },
})

const Replies = mongoose.models.Replies || mongoose.model<Replies>("Replies", RepliesSchema)

export default Replies