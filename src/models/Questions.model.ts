import mongoose, { Schema, Document } from "mongoose"

interface Questions extends Document {
    questionText: string;
    feedbackAnswers: [mongoose.Types.ObjectId];
    userId: mongoose.Types.ObjectId;
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
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    createdAt: { type: String, default: new Date().toISOString() }
})

const Questions = mongoose.models.Questions || mongoose.model<Questions>("Questions", QuestionsSchema)

export default Questions