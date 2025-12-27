import mongoose, { Schema, Document, InferSchemaType, Model } from "mongoose"

interface VerifyToken extends Document {
    email: string,
    otp: number,
    createdAt: Date
}

const VerifyTokenSchema: Schema<VerifyToken> = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    otp: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: '1h'
    }
}, { timestamps: true })


export type VerifyTokenType = InferSchemaType<typeof VerifyTokenSchema>;

const VerifyToken = mongoose.models.VerifyToken as Model<VerifyTokenType> || mongoose.model<VerifyTokenType>("VerifyToken", VerifyTokenSchema)

export default VerifyToken