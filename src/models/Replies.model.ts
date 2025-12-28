import mongoose, { Schema, Document, InferSchemaType, Model } from "mongoose"

interface IReplies extends Document {
    content: string;
    questionId: mongoose.Types.ObjectId;
    userId: mongoose.Types.ObjectId;
    isDirectReply: boolean
}

const RepliesSchema: Schema<IReplies> = new Schema({
    content: {
        type: String,
        required: true,
    },
    questionId: { type: Schema.Types.ObjectId, ref: "Questions" },
    isDirectReply: {
        type: Boolean,
        default: false
    },
    userId: { type: Schema.Types.ObjectId, ref: "User" },
})

export type Repliestype = InferSchemaType<typeof RepliesSchema>;

const Replies = mongoose.models.Replies as Model<Repliestype> || mongoose.model<IReplies>("Replies", RepliesSchema)

export default Replies