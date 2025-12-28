import mongoose, { Schema, Document, InferSchemaType, Model } from "mongoose"

interface Questions extends Document {
    questionText: string;
    feedbackAnswers: [mongoose.Types.ObjectId];
    userId: mongoose.Types.ObjectId;
    isActive: boolean
    createdAt: string
}

const QuestionsSchema: Schema<Questions> = new Schema({
    questionText: {
        type: String,
        required: true,
    },
    feedbackAnswers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Replies"
    }],
    isActive: {
        type: Boolean,
        default: true
    },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    createdAt: { type: String, default: new Date().toISOString() }
})

export type QuestionType = InferSchemaType<typeof QuestionsSchema>;

const Questions = mongoose.models.Questions as Model<QuestionType> || mongoose.model<Questions>("Questions", QuestionsSchema)

export default Questions