import mongoose, { Schema, Document, InferSchemaType, Model } from "mongoose"

interface User extends Document {
    username: string,
    email: string,
    password: string,
    fullName: string;
    isReceivingFeedback: boolean;
    isVerified: boolean;

}

const UserSchema: Schema<User> = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    fullName: {
        type: String,
        required: true
    },
    isReceivingFeedback: {
        type: Boolean,
        default: true
    },
    isVerified: {
        type: Boolean,
        default: false
    }
})


export type UserType = InferSchemaType<typeof UserSchema>;

const User = mongoose.models.User as Model<UserType> || mongoose.model<UserType>("User", UserSchema)

export default User